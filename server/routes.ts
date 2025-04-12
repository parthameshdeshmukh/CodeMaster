import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { executeCode } from "./judge";
import { executeCodeSchema, Language, TestCase, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";
import { formatCertificateDate, generateCertificateId } from "../client/src/lib/utils";
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Authentication setup
export function setupAuth(app: Express) {
  // Configure passport with local strategy
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: 'Invalid username or password' });
        }
        
        // Simple password check (in a real app, use proper hashing)
        if (user.password !== password) {
          return done(null, false, { message: 'Invalid username or password' });
        }
        
        // Remove password before returning the user
        const { password: _, ...userWithoutPassword } = user;
        return done(null, userWithoutPassword);
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  // Serialize and deserialize user
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        return done(null, false);
      }
      // Remove password before returning the user
      const { password: _, ...userWithoutPassword } = user;
      done(null, userWithoutPassword);
    } catch (error) {
      done(error);
    }
  });
  
  // Add session and passport middleware
  app.use(session({
    secret: 'css-visualizer-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production with HTTPS
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
}

// Authentication middleware
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized - Please log in' });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // PUT APPLICATION ROUTES HERE
  // PREFIX ALL ROUTES WITH /api
  
  // ===== Authentication Routes =====
  
  // Login
  app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: { message?: string }) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: info.message || 'Login failed' });
      }
      req.logIn(user, (err: any) => {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  });
  
  // Register
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      
      // Create new user
      const newUser = await storage.createUser({ username, password });
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Auto login the user
      req.logIn(userWithoutPassword, (err: any) => {
        if (err) {
          return res.status(500).json({ error: 'Error logging in after registration' });
        }
        return res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Error registering user' });
    }
  });
  
  // Logout
  app.post('/api/auth/logout', (req, res) => {
    req.logout((err: any) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging out' });
      }
      res.json({ success: true });
    });
  });
  
  // ===== User Routes =====
  
  // Get current user
  app.get('/api/user/current', async (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      // For demo purposes, we'll use a mock user if not authenticated
      const user = await storage.getCurrentUser();
      res.json(user);
    }
  });
  
  // Get user stats
  app.get('/api/user/stats', async (req, res) => {
    const stats = await storage.getUserStats();
    res.json(stats);
  });
  
  // Get user activities
  app.get('/api/user/activity', async (req, res) => {
    const activities = await storage.getUserActivities();
    res.json(activities);
  });
  
  // Get user progress for a challenge
  app.get('/api/user/progress/:challengeId', async (req, res) => {
    const challengeId = parseInt(req.params.challengeId);
    if (isNaN(challengeId)) {
      return res.status(400).json({ error: 'Invalid challenge ID' });
    }
    
    const progress = await storage.getUserProgressForChallenge(challengeId);
    res.json(progress);
  });
  
  // Save user progress
  app.post('/api/user/progress/:challengeId', async (req, res) => {
    const challengeId = parseInt(req.params.challengeId);
    if (isNaN(challengeId)) {
      return res.status(400).json({ error: 'Invalid challenge ID' });
    }
    
    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }
    
    const progress = await storage.saveUserProgress(challengeId, code, language);
    res.json(progress);
  });
  
  // Get user certificates
  app.get('/api/user/certificates', async (req, res) => {
    const certificates = await storage.getUserCertificates();
    res.json(certificates);
  });
  
  // ===== Challenge Routes =====
  
  // Get all challenges with optional filters
  app.get('/api/challenges', async (req, res) => {
    const difficulty = req.query.difficulty as string;
    const language = req.query.language as string;
    
    const challenges = await storage.getChallenges(difficulty, language);
    res.json(challenges);
  });
  
  // Get recommended challenges
  app.get('/api/challenges/recommended', async (req, res) => {
    const challenges = await storage.getRecommendedChallenges();
    res.json(challenges);
  });
  
  // Get a specific challenge
  app.get('/api/challenges/:id', async (req, res) => {
    const challengeId = parseInt(req.params.id);
    if (isNaN(challengeId)) {
      return res.status(400).json({ error: 'Invalid challenge ID' });
    }
    
    const challenge = await storage.getChallenge(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    
    res.json(challenge);
  });
  
  // Submit a solution
  app.post('/api/challenges/:id/submit', async (req, res) => {
    const challengeId = parseInt(req.params.id);
    if (isNaN(challengeId)) {
      return res.status(400).json({ error: 'Invalid challenge ID' });
    }
    
    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }
    
    // Get the challenge to access test cases
    const challenge = await storage.getChallenge(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    
    // Execute code against test cases
    const testCases = challenge.testCases as unknown as TestCase[];
    const result = await executeCode(code, language as Language, testCases);
    
    // If all tests passed, mark the challenge as completed
    if (result.passed) {
      await storage.completeChallenge(challengeId, code, language as Language);
      
      // Check if the user has completed all challenges in a language
      const completedAllInLanguage = await storage.hasCompletedAllChallengesInLanguage(language as Language);
      
      // If all challenges completed, generate a certificate
      if (completedAllInLanguage) {
        const user = await storage.getCurrentUser();
        if (user) {
          const certificateId = generateCertificateId(language, user.username);
          await storage.createCertificate({
            userId: user.id,
            title: `${language.charAt(0).toUpperCase() + language.slice(1)} Mastery`,
            language: language,
            certificateId: certificateId
          });
        }
      }
    }
    
    res.json(result);
  });
  
  // ===== Code Execution Routes =====
  
  // Run code (without submitting)
  app.post('/api/code/run', async (req, res) => {
    try {
      const { code, language, challengeId } = executeCodeSchema.parse(req.body);
      
      let testCases: TestCase[] | undefined;
      
      // If a challenge ID is provided, get its test cases
      if (challengeId) {
        const challenge = await storage.getChallenge(challengeId);
        if (challenge) {
          testCases = challenge.testCases as unknown as TestCase[];
        }
      }
      
      const result = await executeCode(code, language, testCases);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Error executing code' });
    }
  });
  
  // ===== Leaderboard Routes =====
  
  // Get leaderboard
  app.get('/api/leaderboard', async (req, res) => {
    const leaderboard = await storage.getLeaderboard();
    res.json(leaderboard);
  });

  const httpServer = createServer(app);
  return httpServer;
}

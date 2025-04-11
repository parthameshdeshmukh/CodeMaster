import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { executeCode } from "./judge";
import { executeCodeSchema, Language, TestCase } from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";
import { formatCertificateDate, generateCertificateId } from "../client/src/lib/utils";

export async function registerRoutes(app: Express): Promise<Server> {
  // PUT APPLICATION ROUTES HERE
  // PREFIX ALL ROUTES WITH /api
  
  // ===== User Routes =====
  
  // Get current user
  app.get('/api/user/current', async (req, res) => {
    // In a real application, this would be fetched from a session or JWT
    // For demo purposes, we'll use a mock user
    const user = await storage.getCurrentUser();
    res.json(user);
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
  
  // ===== Certificate Routes =====
  
  // Check certificate eligibility
  app.post('/api/certificates/check-eligibility', async (req, res) => {
    try {
      const { language } = req.body;
      
      if (!language) {
        return res.status(400).json({ error: 'Language is required' });
      }
      
      // Check if user has completed all challenges in this language
      const completedAllInLanguage = await storage.hasCompletedAllChallengesInLanguage(language as Language);
      
      if (completedAllInLanguage) {
        const user = await storage.getCurrentUser();
        if (user) {
          const certificateId = generateCertificateId(language, user.username);
          
          // Create the certificate
          const certificate = await storage.createCertificate({
            userId: user.id,
            title: `${language.charAt(0).toUpperCase() + language.slice(1)} Mastery`,
            language: language,
            certificateId: certificateId
          });
          
          return res.json({
            eligible: true,
            certificate,
            username: user.username
          });
        }
      }
      
      // If not eligible
      res.json({ eligible: false });
    } catch (error) {
      console.error('Error checking certificate eligibility:', error);
      res.status(500).json({ error: 'Error checking certificate eligibility' });
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

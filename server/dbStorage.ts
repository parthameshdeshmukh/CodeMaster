import { 
  User, InsertUser, Challenge, InsertChallenge, 
  UserProgress, InsertUserProgress, Certificate, 
  InsertCertificate, UserActivity, InsertUserActivity,
  ChallengeWithProgress, Difficulty, Language,
  users, challenges, userProgress, certificates, userActivity
} from "@shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";
import { db } from "./db";
import { formatRelativeTime } from "../client/src/lib/utils";
import { IStorage } from "./storage";

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // Current user ID (for demonstration - in a real app, this would come from authentication)
  private currentUserId = 1;

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    // In a real app, this would come from the session
    const user = await this.getUser(this.currentUserId);
    return user || null;
  }

  async getUserStats(): Promise<{
    completedChallenges: number;
    totalChallenges: number;
    streak: number;
    bestStreak: number;
    lastActivity: string;
    certificatesCount: number;
  }> {
    // Get the current user
    const user = await this.getCurrentUser();
    if (!user) {
      return {
        completedChallenges: 0,
        totalChallenges: 0,
        streak: 0,
        bestStreak: 0,
        lastActivity: '',
        certificatesCount: 0
      };
    }

    // Count completed challenges
    const completedChallengesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, user.id),
          eq(userProgress.status, 'completed')
        )
      );
    
    const completedChallenges = completedChallengesResult[0]?.count || 0;

    // Count total challenges
    const totalChallengesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(challenges);
    
    const totalChallenges = totalChallengesResult[0]?.count || 0;

    // Count certificates
    const certificatesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(certificates)
      .where(eq(certificates.userId, user.id));
    
    const certificatesCount = certificatesResult[0]?.count || 0;

    // Get streak and last activity from user
    const streak = user.streak || 0;
    const bestStreak = user.bestStreak || 0;
    const lastActivity = user.lastActivity ? formatRelativeTime(user.lastActivity) : 'Never';

    return {
      completedChallenges,
      totalChallenges,
      streak,
      bestStreak,
      lastActivity,
      certificatesCount
    };
  }

  async getUserActivities(): Promise<UserActivity[]> {
    const user = await this.getCurrentUser();
    if (!user) return [];

    // Get activities with related challenge or certificate data
    const activities = await db
      .select()
      .from(userActivity)
      .where(eq(userActivity.userId, user.id))
      .orderBy(desc(userActivity.createdAt))
      .limit(10);

    // Enrich activities with related data
    const enrichedActivities = await Promise.all(
      activities.map(async (activity) => {
        // Create a base activity object
        const baseActivity = { ...activity };
        
        // This is a type assertion to add the challenge and certificate properties
        // that can be added later
        const enrichedActivity = baseActivity as UserActivity & { 
          challenge?: { id: number; title: string; difficulty: string; language: string };
          certificate?: { id: number; title: string; language: string };
        };

        if (activity.activityType === 'started_challenge' || activity.activityType === 'completed_challenge') {
          const [challenge] = await db
            .select({
              id: challenges.id,
              title: challenges.title,
              difficulty: challenges.difficulty,
              language: challenges.language
            })
            .from(challenges)
            .where(eq(challenges.id, activity.entityId));
          
          if (challenge) {
            enrichedActivity.challenge = challenge;
          }
        }

        if (activity.activityType === 'earned_certificate') {
          const [certificate] = await db
            .select({
              id: certificates.id,
              title: certificates.title,
              language: certificates.language
            })
            .from(certificates)
            .where(eq(certificates.id, activity.entityId));
          
          if (certificate) {
            enrichedActivity.certificate = certificate;
          }
        }

        return enrichedActivity as UserActivity;
      })
    );

    return enrichedActivities;
  }

  // Challenge operations
  async getChallenge(id: number): Promise<Challenge | undefined> {
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id));
    return challenge;
  }

  async getChallenges(difficulty?: string, language?: string): Promise<ChallengeWithProgress[]> {
    const user = await this.getCurrentUser();
    
    // Get all challenges matching the filters
    let query = db.select().from(challenges);
    
    if (difficulty) {
      query = query.where(eq(challenges.difficulty, difficulty));
    }
    
    if (language) {
      query = query.where(eq(challenges.language, language));
    }
    
    const allChallenges = await query;
    
    // If no user, return challenges without progress
    if (!user) {
      return allChallenges.map(challenge => ({
        ...challenge
      }));
    }
    
    // Get user progress for all challenges
    const userProgressEntries = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, user.id));
    
    // Map progress to challenges
    const progressMap = new Map(
      userProgressEntries.map(progress => [progress.challengeId, progress])
    );
    
    // Merge challenges with progress
    return allChallenges.map(challenge => {
      const progress = progressMap.get(challenge.id);
      return {
        ...challenge,
        userStatus: progress?.status,
        userCode: progress?.code
      };
    });
  }

  async getRecommendedChallenges(): Promise<Challenge[]> {
    const user = await this.getCurrentUser();
    if (!user) {
      // Return some default challenges if no user
      return db.select().from(challenges).limit(3);
    }
    
    // Get completed challenge IDs for this user
    const completedChallengeIds = (await db
      .select({ challengeId: userProgress.challengeId })
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, user.id),
          eq(userProgress.status, 'completed')
        )
      )).map(row => row.challengeId);
    
    // Find challenges the user hasn't completed yet
    // In a real app, you might want to recommend based on the user's skill level
    // or previous challenge performance
    const recommendedChallenges = await db
      .select()
      .from(challenges)
      .where(
        sql`${challenges.id} NOT IN (${completedChallengeIds.length > 0 ? completedChallengeIds : [-1]})`
      )
      .limit(3);
    
    return recommendedChallenges;
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const [newChallenge] = await db.insert(challenges).values(challenge).returning();
    return newChallenge;
  }

  // User progress operations
  async getUserProgressForChallenge(challengeId: number): Promise<{ status: string; code: string } | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;
    
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, user.id),
          eq(userProgress.challengeId, challengeId)
        )
      );
    
    if (!progress) return null;
    
    return {
      status: progress.status,
      code: progress.code || ''
    };
  }

  async saveUserProgress(challengeId: number, code: string, language: string): Promise<UserProgress> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    // Check if progress already exists
    const existingProgress = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, user.id),
          eq(userProgress.challengeId, challengeId)
        )
      );
    
    let progress: UserProgress;
    
    if (existingProgress.length > 0) {
      // Update existing progress
      const [updatedProgress] = await db
        .update(userProgress)
        .set({
          code,
          status: existingProgress[0].status === 'completed' ? 'completed' : 'started'
        })
        .where(
          and(
            eq(userProgress.userId, user.id),
            eq(userProgress.challengeId, challengeId)
          )
        )
        .returning();
      
      progress = updatedProgress;
    } else {
      // Create new progress entry
      const [newProgress] = await db
        .insert(userProgress)
        .values({
          userId: user.id,
          challengeId,
          status: 'started',
          code
        })
        .returning();
      
      progress = newProgress;

      // Record activity for starting a new challenge
      await this.recordActivity({
        userId: user.id,
        activityType: 'started_challenge',
        entityId: challengeId
      });

      // Update user's last activity
      await db
        .update(users)
        .set({ lastActivity: new Date() })
        .where(eq(users.id, user.id));
    }
    
    return progress;
  }

  async completeChallenge(challengeId: number, code: string, language: Language): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    // Update progress to completed
    await db
      .update(userProgress)
      .set({
        status: 'completed',
        code,
        completedAt: new Date()
      })
      .where(
        and(
          eq(userProgress.userId, user.id),
          eq(userProgress.challengeId, challengeId)
        )
      );
    
    // Record activity
    await this.recordActivity({
      userId: user.id,
      activityType: 'completed_challenge',
      entityId: challengeId
    });
    
    // Update user streak
    // In a real app, you would have more complex streak logic
    // checking if the user completed a challenge every day
    await db
      .update(users)
      .set({
        streak: sql`${users.streak} + 1`,
        bestStreak: sql`GREATEST(${users.bestStreak}, ${users.streak} + 1)`,
        lastActivity: new Date()
      })
      .where(eq(users.id, user.id));
  }

  async hasCompletedAllChallengesInLanguage(language: Language): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;
    
    // Count total challenges in the language
    const totalChallengesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(challenges)
      .where(eq(challenges.language, language));
    
    const totalChallenges = totalChallengesResult[0]?.count || 0;
    
    if (totalChallenges === 0) return false;
    
    // Count completed challenges in the language
    const completedChallengesResult = await db
      .select({ count: sql<number>`count(DISTINCT ${challenges.id})` })
      .from(challenges)
      .innerJoin(
        userProgress,
        and(
          eq(userProgress.challengeId, challenges.id),
          eq(userProgress.userId, user.id),
          eq(userProgress.status, 'completed')
        )
      )
      .where(eq(challenges.language, language));
    
    const completedChallenges = completedChallengesResult[0]?.count || 0;
    
    // Check if the user already has a certificate for this language
    const existingCertificate = await db
      .select()
      .from(certificates)
      .where(
        and(
          eq(certificates.userId, user.id),
          eq(certificates.language, language)
        )
      );
    
    // Return true if user has completed all challenges and doesn't have a certificate yet
    return completedChallenges === totalChallenges && existingCertificate.length === 0;
  }

  // Certificate operations
  async getUserCertificates(): Promise<Certificate[]> {
    const user = await this.getCurrentUser();
    if (!user) return [];
    
    return db
      .select()
      .from(certificates)
      .where(eq(certificates.userId, user.id))
      .orderBy(desc(certificates.issueDate));
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const [newCertificate] = await db
      .insert(certificates)
      .values(certificate)
      .returning();
    
    // Record activity
    await this.recordActivity({
      userId: certificate.userId,
      activityType: 'earned_certificate',
      entityId: newCertificate.id
    });
    
    return newCertificate;
  }

  // Activity operations
  async recordActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const [newActivity] = await db
      .insert(userActivity)
      .values(activity)
      .returning();
    
    // In a real app, you would enrich the activity with related data
    // Here we'll just return the new activity
    let enrichedActivity: UserActivity = newActivity;

    return enrichedActivity;
  }

  // Leaderboard
  async getLeaderboard(): Promise<{
    id: number;
    username: string;
    points: number;
    completedChallenges: number;
    certificates: number;
    rank: number;
  }[]> {
    // This is a more complex query to build the leaderboard
    // In a real app, you might want to store points directly in the user table
    
    // Get users with counts of completed challenges and certificates
    const leaderboardData = await db.transaction(async (tx) => {
      // Get users with counts
      const usersWithCounts = await tx
        .select({
          id: users.id,
          username: users.username,
          // For simplicity, we'll calculate points based on completed challenges
          // In a real app, you would have a more sophisticated points system
        })
        .from(users);
        
      // For each user, get their stats
      const enrichedUsers = await Promise.all(usersWithCounts.map(async (user) => {
        // Count completed challenges
        const completedChallengesResult = await tx
          .select({ count: sql<number>`count(*)` })
          .from(userProgress)
          .where(
            and(
              eq(userProgress.userId, user.id),
              eq(userProgress.status, 'completed')
            )
          );
          
        const completedChallenges = completedChallengesResult[0]?.count || 0;
        
        // Sum points from completed challenges
        const pointsResult = await tx
          .select({ sum: sql<number>`COALESCE(SUM(${challenges.points}), 0)` })
          .from(challenges)
          .innerJoin(
            userProgress,
            and(
              eq(userProgress.challengeId, challenges.id),
              eq(userProgress.userId, user.id),
              eq(userProgress.status, 'completed')
            )
          );
          
        const points = pointsResult[0]?.sum || 0;
        
        // Count certificates
        const certificatesResult = await tx
          .select({ count: sql<number>`count(*)` })
          .from(certificates)
          .where(eq(certificates.userId, user.id));
          
        const certificates = certificatesResult[0]?.count || 0;
        
        return {
          ...user,
          points,
          completedChallenges,
          certificates,
        };
      }));
      
      return enrichedUsers;
    });
    
    // Sort by points (descending) and assign ranks
    const sortedLeaderboard = leaderboardData
      .sort((a, b) => b.points - a.points || a.username.localeCompare(b.username))
      .map((user, index) => ({
        ...user,
        rank: index + 1
      }));
    
    return sortedLeaderboard;
  }
}
import { pgTable, text, serial, integer, boolean, timestamp, json, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  streak: integer("streak").default(0),
  bestStreak: integer("best_streak").default(0),
  lastActivity: timestamp("last_activity"),
  joinedDate: timestamp("joined_date").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userProgress: many(userProgress),
  certificates: many(certificates),
  activities: many(userActivity),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Difficulty enum for challenges
export const difficultyEnum = z.enum(["easy", "medium", "hard"]);
export type Difficulty = z.infer<typeof difficultyEnum>;

// Programming languages supported
export const languageEnum = z.enum(["javascript", "python", "java", "cpp", "rust", "go"]);
export type Language = z.infer<typeof languageEnum>;

// Challenges table
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  language: text("language").notNull(), // javascript, python, etc.
  starterCode: text("starter_code").notNull(),
  solutionCode: text("solution_code").notNull(),
  testCases: json("test_cases").notNull(), // [{input, expectedOutput}, ...]
  points: integer("points").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const challengesRelations = relations(challenges, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const insertChallengeSchema = createInsertSchema(challenges).pick({
  title: true,
  description: true,
  difficulty: true,
  language: true,
  starterCode: true,
  solutionCode: true,
  testCases: true,
  points: true,
});

// User Progress table
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  challengeId: integer("challenge_id").notNull().references(() => challenges.id, { onDelete: 'cascade' }),
  status: text("status").notNull(), // "started", "completed", "failed"
  code: text("code"),
  completedAt: timestamp("completed_at"),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  challenge: one(challenges, {
    fields: [userProgress.challengeId],
    references: [challenges.id],
  }),
}));

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  challengeId: true,
  status: true,
  code: true,
});

// Certificates table
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text("title").notNull(),
  language: text("language").notNull(),
  issueDate: timestamp("issue_date").defaultNow(),
  certificateId: text("certificate_id").notNull().unique(),
});

export const certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, {
    fields: [certificates.userId],
    references: [users.id],
  }),
}));

export const insertCertificateSchema = createInsertSchema(certificates).pick({
  userId: true,
  title: true,
  language: true,
  certificateId: true,
});

// Activity types
export const activityTypeEnum = z.enum(["started_challenge", "completed_challenge", "earned_certificate"]);
export type ActivityType = z.infer<typeof activityTypeEnum>;

// User Activity table to track actions
export const userActivity = pgTable("user_activity", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  activityType: text("activity_type").notNull(), // started_challenge, completed_challenge, earned_certificate
  entityId: integer("entity_id").notNull(), // challenge_id or certificate_id
  createdAt: timestamp("created_at").defaultNow(),
});

export const userActivityRelations = relations(userActivity, ({ one }) => ({
  user: one(users, {
    fields: [userActivity.userId],
    references: [users.id],
  }),
}));

export const insertUserActivitySchema = createInsertSchema(userActivity).pick({
  userId: true,
  activityType: true,
  entityId: true,
});

// Types for frontend and backend
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export type UserActivity = typeof userActivity.$inferSelect;
export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;

// Schema for code execution request
export const executeCodeSchema = z.object({
  code: z.string(),
  language: languageEnum,
  challengeId: z.number().optional(),
});

// Schema for test case
export const testCaseSchema = z.object({
  input: z.string(),
  expectedOutput: z.string(),
});

export type TestCase = z.infer<typeof testCaseSchema>;

// Challenge with additional fields for the frontend
export type ChallengeWithProgress = Challenge & {
  userStatus?: string;
  userCode?: string;
};

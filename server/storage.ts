import { 
  User, InsertUser, Challenge, InsertChallenge, 
  UserProgress, InsertUserProgress, Certificate, 
  InsertCertificate, UserActivity, InsertUserActivity,
  ChallengeWithProgress, Difficulty, Language,
  users, challenges, userProgress, certificates, userActivity
} from "@shared/schema";
import { DEFAULT_STARTER_CODES } from "../client/src/lib/constants";
import { formatRelativeTime } from "../client/src/lib/utils";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  getUserStats(): Promise<{
    completedChallenges: number;
    totalChallenges: number;
    streak: number;
    bestStreak: number;
    lastActivity: string;
    certificatesCount: number;
  }>;
  getUserActivities(): Promise<UserActivity[]>;
  
  // Challenge operations
  getChallenge(id: number): Promise<Challenge | undefined>;
  getChallenges(difficulty?: string, language?: string): Promise<ChallengeWithProgress[]>;
  getRecommendedChallenges(): Promise<Challenge[]>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  
  // User progress operations
  getUserProgressForChallenge(challengeId: number): Promise<{ status: string; code: string } | null>;
  saveUserProgress(challengeId: number, code: string, language: string): Promise<UserProgress>;
  completeChallenge(challengeId: number, code: string, language: Language): Promise<void>;
  hasCompletedAllChallengesInLanguage(language: Language): Promise<boolean>;
  
  // Certificate operations
  getUserCertificates(): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  
  // Activity operations
  recordActivity(activity: InsertUserActivity): Promise<UserActivity>;
  
  // Leaderboard
  getLeaderboard(): Promise<{
    id: number;
    username: string;
    points: number;
    completedChallenges: number;
    certificates: number;
    rank: number;
  }[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private challengesMap: Map<number, Challenge>;
  private userProgressMap: Map<string, UserProgress>; // key: userId-challengeId
  private certificatesMap: Map<number, Certificate>;
  private userActivitiesMap: Map<number, UserActivity>;
  private currentUserId: number;
  private currentChallengeId: number;
  private currentProgressId: number;
  private currentCertificateId: number;
  private currentActivityId: number;

  constructor() {
    this.usersMap = new Map();
    this.challengesMap = new Map();
    this.userProgressMap = new Map();
    this.certificatesMap = new Map();
    this.userActivitiesMap = new Map();
    this.currentUserId = 1;
    this.currentChallengeId = 1;
    this.currentProgressId = 1;
    this.currentCertificateId = 1;
    this.currentActivityId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create a sample user
    const user: User = {
      id: 1,
      username: "codeMaster",
      password: "hashed_password", // In a real app, this would be properly hashed
      streak: 5,
      bestStreak: 12,
      lastActivity: new Date().toISOString(),
      joinedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    };
    this.usersMap.set(user.id, user);
    this.currentUserId++;

    // Create sample challenges
    const sampleChallenges: Partial<Challenge>[] = [
      {
        title: "String Manipulation",
        description: "Create a function that reverses a string and checks if it's a palindrome.",
        difficulty: "medium",
        language: "javascript",
        starterCode: DEFAULT_STARTER_CODES.javascript,
        solutionCode: `function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  // Check if the string is equal to its reverse
  return cleanStr === cleanStr.split("").reverse().join("");
}`,
        testCases: [
          { input: "racecar", expectedOutput: "true" },
          { input: "hello", expectedOutput: "false" },
          { input: "A man a plan a canal Panama", expectedOutput: "true" }
        ],
        points: 15,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Array Methods",
        description: "Implement a function that flattens a nested array.",
        difficulty: "medium",
        language: "javascript",
        starterCode: `/**
 * @param {Array} arr - The nested array to flatten
 * @return {Array} - Returns a flattened array
 */
function flattenArray(arr) {
  // Your code here
}

// Test cases
console.log(flattenArray([1, [2, [3, 4], 5]])); // Should return [1, 2, 3, 4, 5]
console.log(flattenArray([1, 2, 3])); // Should return [1, 2, 3]`,
        solutionCode: `function flattenArray(arr) {
  return arr.flat(Infinity);
}`,
        testCases: [
          { input: "[1, [2, [3, 4], 5]]", expectedOutput: "[1,2,3,4,5]" },
          { input: "[1, 2, 3]", expectedOutput: "[1,2,3]" },
          { input: "[[1, 2], [3, 4], [5]]", expectedOutput: "[1,2,3,4,5]" }
        ],
        points: 20,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Build a REST API",
        description: "Create a RESTful API with Express that handles CRUD operations for a simple resource.",
        difficulty: "hard",
        language: "javascript",
        starterCode: `/**
 * Your task is to implement a RESTful API with Express for a 'products' resource
 * 
 * Requirements:
 * 1. GET /api/products - Return all products
 * 2. GET /api/products/:id - Return a specific product by id
 * 3. POST /api/products - Create a new product
 * 4. PUT /api/products/:id - Update a product by id
 * 5. DELETE /api/products/:id - Delete a product by id
 * 
 * Sample product object: { id: 1, name: 'Product 1', price: 100 }
 * 
 * NOTE: This function must return the Express 'app' instance
 */

function createProductsAPI() {
  const express = require('express');
  const app = express();
  
  // Enable JSON body parsing middleware
  app.use(express.json());
  
  // Initial product data
  let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ];
  
  // TODO: Implement the routes for products resource
  // 1. GET /api/products - Return all products
  
  
  // 2. GET /api/products/:id - Return a specific product by id
  
  
  // 3. POST /api/products - Create a new product
  
  
  // 4. PUT /api/products/:id - Update a product by id
  
  
  // 5. DELETE /api/products/:id - Delete a product by id
  
  
  // Return the app instance
  return app;
}

module.exports = createProductsAPI;
`,
        solutionCode: `function createProductsAPI() {
  const express = require('express');
  const app = express();
  
  // Enable JSON body parsing
  app.use(express.json());
  
  // Initial product data
  let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ];
  
  // Get all products
  app.get('/api/products', (req, res) => {
    res.json(products);
  });
  
  // Get product by id
  app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  });
  
  // Create new product
  app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, name, price };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
  });
  
  // Update product
  app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const { name, price } = req.body;
    products[index] = { 
      ...products[index], 
      ...(name !== undefined && { name }), 
      ...(price !== undefined && { price }) 
    };
    
    res.json(products[index]);
  });
  
  // Delete product
  app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    products.splice(index, 1);
    res.status(204).end();
  });
  
  // Return the app instance
  return app;
}

module.exports = createProductsAPI;`,
        testCases: [
          { 
            input: "GET /api/products", 
            expectedOutput: "[{\"id\":1,\"name\":\"Product 1\",\"price\":100},{\"id\":2,\"name\":\"Product 2\",\"price\":200}]" 
          },
          { 
            input: "GET /api/products/1", 
            expectedOutput: "{\"id\":1,\"name\":\"Product 1\",\"price\":100}" 
          },
          { 
            input: "POST /api/products {\"name\":\"New Product\",\"price\":300}", 
            expectedOutput: "{\"id\":3,\"name\":\"New Product\",\"price\":300}" 
          },
          { 
            input: "PUT /api/products/2 {\"name\":\"Updated Product\"}", 
            expectedOutput: "{\"id\":2,\"name\":\"Updated Product\",\"price\":200}" 
          },
          { 
            input: "DELETE /api/products/1", 
            expectedOutput: "" 
          }
        ],
        points: 25,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Data Visualization",
        description: "Build a chart to visualize a dataset using D3.js or any other visualization library.",
        difficulty: "medium",
        language: "javascript",
        starterCode: `/**
 * Your task is to create a bar chart that visualizes the following data:
 * 
 * const data = [
 *   { category: 'A', value: 30 },
 *   { category: 'B', value: 45 },
 *   { category: 'C', value: 25 },
 *   { category: 'D', value: 60 },
 *   { category: 'E', value: 15 }
 * ];
 * 
 * Requirements:
 * 1. Create a bar chart with D3.js or any other library
 * 2. Display the categories on the x-axis
 * 3. Display the values on the y-axis
 * 4. Add proper labels and a title
 */

// Your code here
`,
        solutionCode: `const data = [
  { category: 'A', value: 30 },
  { category: 'B', value: 45 },
  { category: 'C', value: 25 },
  { category: 'D', value: 60 },
  { category: 'E', value: 15 }
];

// Set up dimensions
const width = 600;
const height = 400;
const margin = { top: 50, right: 30, bottom: 50, left: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Create SVG
const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Create container group with margin
const g = svg.append('g')
  .attr('transform', \`translate(\${margin.left}, \${margin.top})\`);

// Create scales
const xScale = d3.scaleBand()
  .domain(data.map(d => d.category))
  .range([0, innerWidth])
  .padding(0.2);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([innerHeight, 0]);

// Create and append axes
const xAxis = d3.axisBottom(xScale);
g.append('g')
  .attr('transform', \`translate(0, \${innerHeight})\`)
  .call(xAxis)
  .append('text')
  .attr('fill', 'black')
  .attr('x', innerWidth / 2)
  .attr('y', 40)
  .text('Categories');

const yAxis = d3.axisLeft(yScale);
g.append('g')
  .call(yAxis)
  .append('text')
  .attr('fill', 'black')
  .attr('transform', 'rotate(-90)')
  .attr('x', -innerHeight / 2)
  .attr('y', -40)
  .attr('text-anchor', 'middle')
  .text('Values');

// Add title
svg.append('text')
  .attr('x', width / 2)
  .attr('y', 25)
  .attr('text-anchor', 'middle')
  .attr('font-size', '18px')
  .attr('font-weight', 'bold')
  .text('Data Visualization Chart');

// Create bars
g.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', d => xScale(d.category))
  .attr('y', d => yScale(d.value))
  .attr('width', xScale.bandwidth())
  .attr('height', d => innerHeight - yScale(d.value))
  .attr('fill', 'steelblue');`,
        testCases: [
          { input: "Check if chart contains 5 bars", expectedOutput: "true" },
          { input: "Check if chart has x and y axes", expectedOutput: "true" },
          { input: "Check if chart has a title", expectedOutput: "true" }
        ],
        points: 15,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Recursion Problems",
        description: "Solve a set of problems that demonstrate the power and elegance of recursive solutions.",
        difficulty: "easy",
        language: "python",
        starterCode: `def factorial(n: int) -> int:
    """
    Calculate the factorial of n using recursion.
    
    Args:
        n: A non-negative integer
        
    Returns:
        The factorial of n
    """
    # Your code here
    pass

def fibonacci(n: int) -> int:
    """
    Find the nth number in the Fibonacci sequence using recursion.
    
    Args:
        n: A non-negative integer
        
    Returns:
        The nth Fibonacci number
    """
    # Your code here
    pass

# Test your functions
print(factorial(5))  # Should return 120
print(fibonacci(6))  # Should return 8`,
        solutionCode: `def factorial(n: int) -> int:
    """
    Calculate the factorial of n using recursion.
    
    Args:
        n: A non-negative integer
        
    Returns:
        The factorial of n
    """
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n: int) -> int:
    """
    Find the nth number in the Fibonacci sequence using recursion.
    
    Args:
        n: A non-negative integer
        
    Returns:
        The nth Fibonacci number
    """
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

# Test your functions
print(factorial(5))  # Should return 120
print(fibonacci(6))  # Should return 8`,
        testCases: [
          { input: "factorial(5)", expectedOutput: "120" },
          { input: "factorial(0)", expectedOutput: "1" },
          { input: "fibonacci(6)", expectedOutput: "8" },
          { input: "fibonacci(0)", expectedOutput: "0" }
        ],
        points: 10,
        createdAt: new Date().toISOString(),
      }
    ];

    // Add sample challenges to the map
    sampleChallenges.forEach(challenge => {
      const id = this.currentChallengeId++;
      const fullChallenge = { ...challenge, id } as Challenge;
      this.challengesMap.set(id, fullChallenge);
    });

    // Create sample user progress
    const userProgressItems: Partial<UserProgress>[] = [
      {
        userId: 1,
        challengeId: 1,
        status: "completed",
        code: `function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  // Check if the string is equal to its reverse
  return cleanStr === cleanStr.split("").reverse().join("");
}`,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      },
      {
        userId: 1,
        challengeId: 2,
        status: "started",
        code: `function flattenArray(arr) {
  // Still working on this solution
  let result = [];
  // TODO: Implement flattening logic
  return result;
}`,
      }
    ];

    // Add sample user progress to the map
    userProgressItems.forEach(progress => {
      const id = this.currentProgressId++;
      const userId = progress.userId!;
      const challengeId = progress.challengeId!;
      const key = `${userId}-${challengeId}`;
      const fullProgress = { ...progress, id } as UserProgress;
      this.userProgressMap.set(key, fullProgress);
    });

    // Create sample certificate
    const certificate: Partial<Certificate> = {
      userId: 1,
      title: "Python Basics",
      language: "python",
      issueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      certificateId: "PYB-2023-AJ78541",
    };

    // Add sample certificate to the map
    const certId = this.currentCertificateId++;
    const fullCertificate = { ...certificate, id: certId } as Certificate;
    this.certificatesMap.set(certId, fullCertificate);

    // Create sample activities
    const activities: Partial<UserActivity>[] = [
      {
        userId: 1,
        activityType: "completed_challenge",
        entityId: 1, // challenge_id
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        challenge: {
          id: 1,
          title: "String Manipulation",
          difficulty: "medium",
          language: "javascript"
        }
      },
      {
        userId: 1,
        activityType: "started_challenge",
        entityId: 2, // challenge_id
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        challenge: {
          id: 2,
          title: "Array Methods",
          difficulty: "medium",
          language: "javascript"
        }
      },
      {
        userId: 1,
        activityType: "earned_certificate",
        entityId: certId, // certificate_id
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        certificate: {
          id: certId,
          title: "Python Basics",
          language: "python"
        }
      }
    ];

    // Add sample activities to the map
    activities.forEach(activity => {
      const id = this.currentActivityId++;
      const fullActivity = { ...activity, id } as UserActivity;
      this.userActivitiesMap.set(id, fullActivity);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      user => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date().toISOString();
    const newUser: User = { 
      ...user, 
      id, 
      streak: 0, 
      bestStreak: 0, 
      lastActivity: now,
      joinedDate: now 
    };
    this.usersMap.set(id, newUser);
    return newUser;
  }

  async getCurrentUser(): Promise<User | null> {
    // In a real application, this would check the session or token
    // For demo purposes, return the first user
    return this.usersMap.get(1) || null;
  }

  async getUserStats(): Promise<{
    completedChallenges: number;
    totalChallenges: number;
    streak: number;
    bestStreak: number;
    lastActivity: string;
    certificatesCount: number;
  }> {
    const user = await this.getCurrentUser();
    if (!user) {
      return {
        completedChallenges: 0,
        totalChallenges: 0,
        streak: 0,
        bestStreak: 0,
        lastActivity: new Date().toISOString(),
        certificatesCount: 0
      };
    }

    // Count completed challenges
    const completedChallenges = Array.from(this.userProgressMap.values())
      .filter(progress => progress.userId === user.id && progress.status === "completed")
      .length;

    // Total number of challenges
    const totalChallenges = this.challengesMap.size;

    // Get certificates count
    const certificatesCount = Array.from(this.certificatesMap.values())
      .filter(cert => cert.userId === user.id)
      .length;

    return {
      completedChallenges,
      totalChallenges,
      streak: user.streak || 0,
      bestStreak: user.bestStreak || 0,
      lastActivity: user.lastActivity || new Date().toISOString(),
      certificatesCount
    };
  }

  async getUserActivities(): Promise<UserActivity[]> {
    const user = await this.getCurrentUser();
    if (!user) return [];

    // Get activities for the current user, sorted by date (newest first)
    return Array.from(this.userActivitiesMap.values())
      .filter(activity => activity.userId === user.id)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || "").getTime();
        const dateB = new Date(b.createdAt || "").getTime();
        return dateB - dateA;
      });
  }

  // Challenge methods
  async getChallenge(id: number): Promise<Challenge | undefined> {
    return this.challengesMap.get(id);
  }

  async getChallenges(difficulty?: string, language?: string): Promise<ChallengeWithProgress[]> {
    const user = await this.getCurrentUser();
    const userId = user?.id;

    // Get all challenges and add user progress status
    return Array.from(this.challengesMap.values())
      .filter(challenge => {
        // Apply filters if provided
        if (difficulty && difficulty !== 'all' && challenge.difficulty !== difficulty) return false;
        if (language && language !== 'all' && challenge.language !== language) return false;
        return true;
      })
      .map(challenge => {
        // If user is logged in, add progress info
        if (userId) {
          const progressKey = `${userId}-${challenge.id}`;
          const progress = this.userProgressMap.get(progressKey);
          
          if (progress) {
            return {
              ...challenge,
              userStatus: progress.status,
              userCode: progress.code
            };
          }
        }
        
        // If no progress found, mark as new
        return {
          ...challenge,
          userStatus: 'new'
        };
      });
  }

  async getRecommendedChallenges(): Promise<Challenge[]> {
    const user = await this.getCurrentUser();
    if (!user) return Array.from(this.challengesMap.values()).slice(0, 3);

    // In a real app, this would use a recommendation algorithm
    // For demo, just return challenges that aren't completed
    const completedChallengeIds = new Set(
      Array.from(this.userProgressMap.values())
        .filter(progress => progress.userId === user.id && progress.status === "completed")
        .map(progress => progress.challengeId)
    );

    return Array.from(this.challengesMap.values())
      .filter(challenge => !completedChallengeIds.has(challenge.id))
      .slice(0, 3);
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const id = this.currentChallengeId++;
    const now = new Date().toISOString();
    const newChallenge: Challenge = { ...challenge, id, createdAt: now };
    this.challengesMap.set(id, newChallenge);
    return newChallenge;
  }

  // User progress methods
  async getUserProgressForChallenge(challengeId: number): Promise<{ status: string; code: string } | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;

    const progressKey = `${user.id}-${challengeId}`;
    const progress = this.userProgressMap.get(progressKey);
    
    if (progress) {
      return {
        status: progress.status,
        code: progress.code || ""
      };
    }
    
    return null;
  }

  async saveUserProgress(challengeId: number, code: string, language: string): Promise<UserProgress> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const challenge = await this.getChallenge(challengeId);
    if (!challenge) throw new Error("Challenge not found");

    const progressKey = `${user.id}-${challengeId}`;
    let progress = this.userProgressMap.get(progressKey);
    
    if (progress) {
      // Update existing progress
      progress.code = code;
      this.userProgressMap.set(progressKey, progress);
    } else {
      // Create new progress
      const id = this.currentProgressId++;
      progress = {
        id,
        userId: user.id,
        challengeId,
        status: "started",
        code
      };
      this.userProgressMap.set(progressKey, progress);
      
      // Record activity
      await this.recordActivity({
        userId: user.id,
        activityType: "started_challenge",
        entityId: challengeId
      });

      // Update user's last activity
      user.lastActivity = new Date().toISOString();
      this.usersMap.set(user.id, user);
    }
    
    return progress;
  }

  async completeChallenge(challengeId: number, code: string, language: Language): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const challenge = await this.getChallenge(challengeId);
    if (!challenge) throw new Error("Challenge not found");

    const progressKey = `${user.id}-${challengeId}`;
    let progress = this.userProgressMap.get(progressKey);
    
    if (progress && progress.status === "completed") {
      // Already completed, just update the code
      progress.code = code;
      this.userProgressMap.set(progressKey, progress);
    } else {
      // Mark as completed
      const now = new Date().toISOString();
      const id = progress ? progress.id : this.currentProgressId++;
      
      progress = {
        id,
        userId: user.id,
        challengeId,
        status: "completed",
        code,
        completedAt: now
      };
      
      this.userProgressMap.set(progressKey, progress);
      
      // Record activity
      await this.recordActivity({
        userId: user.id,
        activityType: "completed_challenge",
        entityId: challengeId
      });

      // Update user's streak and last activity
      const lastActivityDate = new Date(user.lastActivity || 0);
      const today = new Date();
      const isConsecutiveDay = 
        today.getDate() !== lastActivityDate.getDate() ||
        today.getMonth() !== lastActivityDate.getMonth() ||
        today.getFullYear() !== lastActivityDate.getFullYear();
      
      if (isConsecutiveDay) {
        user.streak = (user.streak || 0) + 1;
        if ((user.streak || 0) > (user.bestStreak || 0)) {
          user.bestStreak = user.streak;
        }
      }
      
      user.lastActivity = now;
      this.usersMap.set(user.id, user);
    }
  }

  async hasCompletedAllChallengesInLanguage(language: Language): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;

    // Get all challenges in the language
    const challengesInLanguage = Array.from(this.challengesMap.values())
      .filter(challenge => challenge.language === language);
    
    if (challengesInLanguage.length === 0) return false;

    // Check if all challenges are completed
    const completedChallengeIds = new Set(
      Array.from(this.userProgressMap.values())
        .filter(progress => 
          progress.userId === user.id && 
          progress.status === "completed"
        )
        .map(progress => progress.challengeId)
    );

    return challengesInLanguage.every(challenge => 
      completedChallengeIds.has(challenge.id)
    );
  }

  // Certificate methods
  async getUserCertificates(): Promise<Certificate[]> {
    const user = await this.getCurrentUser();
    if (!user) return [];

    return Array.from(this.certificatesMap.values())
      .filter(cert => cert.userId === user.id)
      .sort((a, b) => {
        const dateA = new Date(a.issueDate || "").getTime();
        const dateB = new Date(b.issueDate || "").getTime();
        return dateB - dateA;
      });
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const id = this.currentCertificateId++;
    const now = new Date().toISOString();
    const newCertificate: Certificate = { 
      ...certificate, 
      id, 
      issueDate: now 
    };
    
    this.certificatesMap.set(id, newCertificate);
    
    // Record activity
    await this.recordActivity({
      userId: certificate.userId,
      activityType: "earned_certificate",
      entityId: id
    });
    
    return newCertificate;
  }

  // Activity methods
  async recordActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const id = this.currentActivityId++;
    const now = new Date().toISOString();
    
    // Enrich activity with challenge or certificate data
    let enrichedActivity: UserActivity = { 
      ...activity, 
      id, 
      createdAt: now 
    };
    
    if (activity.activityType === "started_challenge" || 
        activity.activityType === "completed_challenge") {
      const challenge = await this.getChallenge(activity.entityId);
      if (challenge) {
        enrichedActivity.challenge = {
          id: challenge.id,
          title: challenge.title,
          difficulty: challenge.difficulty as Difficulty,
          language: challenge.language as Language
        };
      }
    } else if (activity.activityType === "earned_certificate") {
      const certificate = this.certificatesMap.get(activity.entityId);
      if (certificate) {
        enrichedActivity.certificate = {
          id: certificate.id,
          title: certificate.title,
          language: certificate.language
        };
      }
    }
    
    this.userActivitiesMap.set(id, enrichedActivity);
    return enrichedActivity;
  }

  // Leaderboard methods
  async getLeaderboard(): Promise<{
    id: number;
    username: string;
    points: number;
    completedChallenges: number;
    certificates: number;
    rank: number;
  }[]> {
    // Calculate scores for all users
    const usersWithScores = await Promise.all(
      Array.from(this.usersMap.values()).map(async user => {
        // Count completed challenges
        const completedChallenges = Array.from(this.userProgressMap.values())
          .filter(progress => progress.userId === user.id && progress.status === "completed");
        
        // Calculate total points from completed challenges
        const points = completedChallenges.reduce((total, progress) => {
          const challenge = this.challengesMap.get(progress.challengeId);
          return total + (challenge?.points || 0);
        }, 0);
        
        // Count certificates
        const certificates = Array.from(this.certificatesMap.values())
          .filter(cert => cert.userId === user.id)
          .length;
        
        return {
          id: user.id,
          username: user.username,
          points,
          completedChallenges: completedChallenges.length,
          certificates,
          rank: 0 // Will be set after sorting
        };
      })
    );
    
    // Sort by points (descending)
    const sortedUsers = usersWithScores.sort((a, b) => b.points - a.points);
    
    // Assign ranks
    sortedUsers.forEach((user, index) => {
      user.rank = index + 1;
    });
    
    return sortedUsers;
  }
}

export const storage = new MemStorage();

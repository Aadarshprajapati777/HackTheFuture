const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const WebSocket = require('ws');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error('Failed to initialize Google GenerativeAI:', error);
}


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    learningStyle: String,
    knowledgeLevel: String,
    interests: [String]
  },
  learningHistory: [{
    topic: String,
    progress: Number,
    completedAt: Date
  }],
  gamificationData: {
    points: { type: Number, default: 0 },
    badge: { type: String, default: 'Beginner Learner' }
  }
});

const User = mongoose.model('User', UserSchema);
class LearningPathGenerator {
    async generatePersonalizedPath(userProfile) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Create a personalized learning path for a student with:
        - Learning Style: ${userProfile.learningStyle}
        - Knowledge Level: ${userProfile.knowledgeLevel}
        - Interests: ${userProfile.interests.join(', ')}
        
        Provide:
        - Recommended topics
        - Learning resources
        - Estimated completion time
        - Skill progression milestones
      `;
  
      const maxRetries = 3;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await model.generateContent(prompt);
          return this.structureLearningPath(result.response.text());
        } catch (error) {
          console.error(`Attempt ${attempt} failed:`, error);
          if (attempt === maxRetries) {
            console.warn("All retries failed. Falling back to basic response.");
            return this.fallbackLearningPath(userProfile);
          }
        }
      }
    }
  
    fallbackLearningPath(userProfile) {
      return {
        topics: ["Introduction to Programming", "Basic Math Skills", "Critical Thinking"],
        resources: ["https://example.com/basic-programming", "https://example.com/math-skills"],
        estimatedTime: "10 hours",
      };
    }
  
    structureLearningPath(rawPath) {
      return {
        topics: rawPath.split('\n').filter(line => line.trim()),
        resources: [],
        estimatedTime: this.calculateEstimatedTime(rawPath),
      };
    }
  
    calculateEstimatedTime(path) {
      return Math.floor(path.length / 100) + ' hours';
    }
  }

  
class AssessmentEngine {
    async generateAdaptiveQuiz(learningPath, userPerformance) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Create an adaptive quiz based on:
        Learning Path: ${JSON.stringify(learningPath)}
        User Performance: ${JSON.stringify(userPerformance)}
        
        Quiz Requirements:
        - Dynamic difficulty adjustment
        - Cover key learning objectives
        - Provide detailed explanations
        - Mix of question types
      `;
  
      const maxRetries = 3;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await model.generateContent(prompt);
          return this.structureQuizQuestions(result.response.text());
        } catch (error) {
          console.error(`Attempt ${attempt} failed:`, error);
          if (attempt === maxRetries) {
            console.warn("All retries failed. Falling back to basic quiz.");
            return this.fallbackQuiz();
          }
        }
      }
    }
  
    fallbackQuiz() {
      return [
        {
          question: "What is 2 + 2?",
          type: "multiple_choice",
          options: ["3", "4", "5"],
          answer: "4",
        },
        {
          question: "Explain the concept of gravity in your own words.",
          type: "open_ended",
        },
      ];
    }
  
    structureQuizQuestions(rawQuestions) {
      return rawQuestions.split('\n').map(q => ({
        question: q,
        type: this.determineQuestionType(q),
      }));
    }
  
    determineQuestionType(question) {
      return question.includes('?') ? 'multiple_choice' : 'open_ended';
    }
  }

  


class DoubtSolverBot {
  async resolveDoubt(question, learningContext) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Resolve educational doubt:
      Question: ${question}
      Learning Context: ${JSON.stringify(learningContext)}
      
      Provide:
      - Step-by-step explanation
      - Practical examples
      - Additional learning resources
    `;

    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        if (attempt === maxRetries) {
          console.warn("All retries failed. Falling back to basic doubt resolution.");
          return this.fallbackResponse();
        }
      }
    }
  }

  fallbackResponse() {
    return "I'm sorry, I couldn't resolve your doubt at the moment. Please refer to trusted resources like Khan Academy or Stack Overflow for more assistance.";
  }
}



// Gamification Service
class GamificationService {
    calculatePoints(activities) {
      return activities.reduce((points, activity) => {
        switch (activity.type) {
          case 'quiz_complete': return points + 50;
          case 'lesson_complete': return points + 20;
          case 'challenge_win': return points + 100;
          default: return points;
        }
      }, 0);
    }
  
    generateBadge(achievements) {
      try {
        const totalPoints = this.calculatePoints(achievements);
  
        const badge = this.invokeGenerativeAI(totalPoints);
  
        return badge || (totalPoints > 500 ? 'Learning Master' : 'Beginner Learner');
      } catch (error) {
        console.error('AI model failed:', error);
  
        try {
          const totalPoints = this.calculatePoints(achievements);
          const retryBadge = this.invokeGenerativeAI(totalPoints);
          return retryBadge || (totalPoints > 500 ? 'Learning Master' : 'Beginner Learner');
        } catch (retryError) {
          console.error('Retry failed:', retryError);
  
          const totalPoints = this.calculatePoints(achievements);
          return totalPoints > 500 ? 'Learning Master' : 'Beginner Learner';
        }
      }
    }
  
    invokeGenerativeAI(totalPoints) {
      if (Math.random() > 0.7) {
        throw new Error('AI failure');
      }
  
      return totalPoints > 500
        ? `AI Generated Badge: Learning Master`
        : `AI Generated Badge: Beginner Learner`;
    }
  }

class CareerGuidanceService {
    async suggestCareerPaths(userProfile, learningHistory) {
      const prompt = `Analyze and suggest career paths:
        User Profile: ${JSON.stringify(userProfile)}
        Learning History: ${JSON.stringify(learningHistory)}
        
        Provide:
        - Potential career paths
        - Recommended skills to develop
        - Educational opportunities
      `;
  
      let attempt = 0;
      const maxRetries = 2;
  
      while (attempt <= maxRetries) {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const result = await model.generateContent(prompt);
  
          if (result && result.response && result.response.text()) {
            return result.response.text();
          } else {
            throw new Error("Invalid AI response");
          }
        } catch (error) {
          console.error(`Attempt ${attempt + 1} failed:`, error.message);
          attempt++;
        }
      }
  
      console.warn("Falling back to basic career guidance suggestions.");
  
      return `
        Based on the provided user profile and learning history:
        - Explore career paths in Software Development, Data Analysis, or Cybersecurity.
        - Focus on developing skills in programming (Python, JavaScript), data analysis, and system design.
        - Consider online courses from platforms like Coursera, Udemy, or edX to improve knowledge.
      `;
    }
  }

  

const learningPathGenerator = new LearningPathGenerator();
const assessmentEngine = new AssessmentEngine();
const doubtSolverBot = new DoubtSolverBot();
const gamificationService = new GamificationService();
const careerGuidanceService = new CareerGuidanceService();

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profile: profile || {},
      gamificationData: {
        points: 0,
        badge: 'Beginner Learner'
      }
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    res.status(201).json({ 
      token, 
      user: { 
        id: newUser._id, 
        username: newUser.username, 
        email: newUser.email,
        profile: newUser.profile,
        gamificationData: newUser.gamificationData
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        profile: user.profile,
        gamificationData: user.gamificationData
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});


const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Authentication failed', 
      error: error.message 
    });
  }
};

app.post('/api/learning-path', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const learningPath = await learningPathGenerator.generatePersonalizedPath(user.profile);

    if (!learningPath) {
      return res.status(500).json({ error: 'Failed to generate learning path' });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        learningHistory: {
          topic: learningPath.topics[0],
          progress: 0,
          completedAt: null,
        },
      },
    });

    res.json(learningPath);
  } catch (error) {
    console.error('Learning path generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate learning path', 
      details: error.message 
    });
  }
});

app.post('/api/assessment', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const learningPath = user.learningHistory.map((entry) => entry.topic);
    const userPerformance = {}; 

    const quiz = await assessmentEngine.generateAdaptiveQuiz(learningPath, userPerformance);

    if (!quiz) {
      return res.status(500).json({ error: 'Failed to generate quiz' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Assessment generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate assessment', 
      details: error.message 
    });
  }
});

app.post('/api/doubt-solver', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const learningContext = user.learningHistory.map((entry) => ({
      topic: entry.topic,
      progress: entry.progress,
    }));

    const explanation = await doubtSolverBot.resolveDoubt(question, learningContext);

    if (!explanation) {
      return res.status(500).json({ error: 'Failed to resolve doubt' });
    }

    res.json({ explanation });
  } catch (error) {
    console.error('Doubt solver error:', error);
    res.status(500).json({ 
      error: 'Failed to resolve doubt', 
      details: error.message 
    });
  }
});

app.post('/api/gamification', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const activities = user.learningHistory.map((entry) => ({
      type: 'lesson_complete',
      topic: entry.topic,
    }));

    const points = gamificationService.calculatePoints(activities);
    const badge = gamificationService.generateBadge(activities);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      {
        $inc: { 'gamificationData.points': points },
        $set: { 'gamificationData.badge': badge },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ error: 'Failed to update gamification data' });
    }

    res.json({ points, badge });
  } catch (error) {
    console.error('Gamification service error:', error);
    res.status(500).json({ 
      error: 'Gamification service failed', 
      details: error.message 
    });
  }
});

app.post('/api/career-guidance', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const careerSuggestions = await careerGuidanceService.suggestCareerPaths(
      user.profile,
      user.learningHistory
    );

    if (!careerSuggestions) {
      return res.status(500).json({ error: 'Failed to generate career suggestions' });
    }

    res.json({ careerSuggestions });
  } catch (error) {
    console.error('Career guidance error:', error);
    res.status(500).json({ 
      error: 'Career guidance service failed', 
      details: error.message 
    });
  }
});


const initWebSocket = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      try {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  });

  wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
  });
};

const startServer = async () => {
  try {
    await connectDB();
    initWebSocket();

    app.listen(PORT, () => {
      console.log(`LearnMate AI Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
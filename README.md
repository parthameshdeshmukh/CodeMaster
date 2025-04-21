
# 🚀 CodeMaster Learning Platform

<div align="center">
  <img src="generated-icon.png" alt="CodeMaster Logo" width="120"/>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
</div>

## 🌟 Features

- **Interactive Learning Environment**
  - Real-time code execution
  - Instant feedback on challenges
  - Multi-language support

- **Progress Tracking**
  - Personal dashboard
  - Achievement system
  - Learning analytics

- **Social Features**
  - Global leaderboard
  - Achievement certificates
  - Community challenges

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS
- Monaco Editor
- Shadcn/UI Components
- React Query

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL with Drizzle ORM
- WebSocket for real-time features

## 📂 Project Structure

```bash
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/          # Utilities and constants
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Main app component
├── server/                 # Backend Express server
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Database operations
│   └── judge.ts          # Code execution engine
└── shared/                # Shared TypeScript types
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd codemaster
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Access the application**
Open [http://localhost:5000](http://localhost:5000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run check` - TypeScript type checking

## 🔑 Environment Variables

```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret
NODE_ENV=development
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New user registration
- `POST /api/auth/logout` - User logout

### Challenges
- `GET /api/challenges` - List all challenges
- `GET /api/challenges/:id` - Get specific challenge
- `POST /api/challenges/:id/submit` - Submit solution

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Replit](https://replit.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Code editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)

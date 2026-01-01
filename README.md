# 🎯 Habit Tracker App

A modern, feature-rich habit tracking application built with React, Material-UI, and Firebase. Track your daily habits, log memories, and visualize your progress with beautiful, real-time graphs.

## ✨ Features

### 🎨 Modern UI/UX
- **Material-UI Components**: Sleek, professional design with Material-UI
- **Smooth Animations**: Engaging interactions using Framer Motion
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Purple Gradient Theme**: Beautiful gradient color scheme

### 📊 Real-Time Progress Tracking
- **Dynamic Charts**: Visualize your progress with Chart.js (Line, Bar, and Doughnut charts)
- **7-Day History**: Track your habit completion over the past week
- **Score Analytics**: View average, best day, and total days tracked

### 📝 Daily Features
- **Greeting Component**: Personalized greetings based on time of day with motivational quotes
- **Memory Logger**: Write and save daily reflections and memories
- **Yes/No Questionnaire**: 8 habit-tracking questions across Health, Wellness, Learning, Productivity, and Social categories

### ☁️ Firebase Integration
- **Real-Time Sync**: Data syncs across devices in real-time
- **Offline Support**: Fallback to local storage when Firebase is unavailable
- **Easy Setup**: Simple configuration with environment variables

### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support for all interactions
- **ARIA Labels**: Proper labeling for screen readers
- **Semantic HTML**: Accessible markup structure

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arshithinjaaz/habit-tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase (Optional)**
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration:
     ```bash
     cp .env.example .env
     ```
   - Update the values in `.env` with your Firebase project details
   - The app works with local storage if Firebase is not configured

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - UI library
- **Vite** - Build tool
- **Material-UI (MUI)** - Component library
- **Framer Motion** - Animation library
- **Chart.js** & **react-chartjs-2** - Data visualization
- **Firebase** - Real-time database and authentication
- **Emotion** - CSS-in-JS styling

## 📁 Project Structure

```
habit-tracker/
├── src/
│   ├── components/
│   │   ├── Greeting.jsx          # Welcome message with animations
│   │   ├── MemoryLogger.jsx      # Daily memory logging
│   │   ├── Questionnaire.jsx     # Daily habit questionnaire
│   │   └── ProgressGraph.jsx     # Progress visualization
│   ├── config/
│   │   └── firebase.js           # Firebase configuration
│   ├── utils/
│   │   └── useHabits.js          # Custom hook for habit management
│   ├── App.jsx                   # Main application component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── .env.example                  # Environment variables template
├── package.json                  # Project dependencies
└── README.md                     # Documentation
```

## 🎮 Usage

### Daily Questionnaire
Answer 8 yes/no questions about your daily habits:
- Exercise
- Water intake
- Reading
- Meditation
- Task completion
- Social connection
- Gratitude practice
- Sleep quality

### Memory Logger
- Write daily reflections and memories
- View timestamped entries
- Delete old memories

### Progress Graphs
- Switch between Line, Bar, and Doughnut chart views
- Track your daily habit completion percentage
- View 7-day average and best day statistics

## 🔐 Firebase Setup (Optional)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database
3. (Optional) Enable Authentication for user accounts
4. Copy your configuration to `.env`

The app works perfectly with local storage if you skip Firebase setup!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Roadmap

- [ ] User authentication with Firebase
- [ ] Custom habit creation
- [ ] Habit streaks and achievements
- [ ] Export data to CSV
- [ ] Dark mode toggle
- [ ] Reminder notifications
- [ ] Social sharing features

## 💡 Acknowledgments

- Material-UI for the beautiful component library
- Framer Motion for smooth animations
- Chart.js for powerful data visualization
- Firebase for real-time data sync

---

**Aiming to release on Dec 26, 2025! 🚀**

Built with ❤️ for better habits

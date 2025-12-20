import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, Link, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import MemoryLogger from './components/MemoryLogger';
import ProgressGraph from './components/ProgressGraph';
import HollaCharacter from './components/HollaCharacter';
import HabitCheckbox from './components/HabitCheckbox';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginMode, setLoginMode] = useState('initial');
  const [habitProgress, setHabitProgress] = useState(0);
  const [hollaMood, setHollaMood] = useState('happy');
  const [hollaMessage, setHollaMessage] = useState("Let's build great habits together!");

  // Check for existing user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('habitTracker_currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
      // User exists but not authenticated yet - require PIN login
      setIsAuthenticated(false);
      setLoginMode('login');
    }
  }, []);

  // Handle successful login
  const handleLoginSuccess = (name) => {
    setCurrentUser(name);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginMode('login');
  };

  // Update Holla's mood and message based on habit progress
  useEffect(() => {
    if (habitProgress === 100) {
      setHollaMood('excited');
      setHollaMessage("🎉 WOW! You completed everything! You're amazing!");
    } else if (habitProgress >= 70) {
      setHollaMood('proud');
      setHollaMessage("You're doing fantastic! Keep up the great work!");
    } else if (habitProgress >= 40) {
      setHollaMood('encouraging');
      setHollaMessage("Great progress! You're on the right track!");
    } else if (habitProgress > 0) {
      setHollaMood('happy');
      setHollaMessage("Every step counts! Let's keep going together!");
    } else {
      setHollaMood('encouraging');
      setHollaMessage("Ready to start today's journey? I'm here with you!");
    }
  }, [habitProgress]);

  const handleProgressUpdate = (progress) => {
    setHabitProgress(progress);
  };

  // Show welcome screen if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WelcomeScreen onLoginSuccess={handleLoginSuccess} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background circles */}
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              top: `${-50 + i * 30}%`,
              right: `${-10 + i * 20}%`,
              pointerEvents: 'none',
            }}
          />
        ))}

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Box 
            sx={{ 
              mb: 4, 
              textAlign: 'center', 
              position: 'relative',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <HollaCharacter mood={hollaMood} />
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#333',
                mb: 1,
              }}
            >
              Welcome back, {currentUser}! 👋
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#667eea',
                fontWeight: 500,
                mb: 2,
              }}
            >
              {hollaMessage}
            </Typography>
            
            {/* Logout Button */}
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                borderRadius: 3,
                textTransform: 'none',
                borderColor: '#667eea',
                color: '#667eea',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#764ba2',
                  background: 'rgba(102,126,234,0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Logout
            </Button>
          </Box>
          
          {/* Main Content Grid */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Habit Checkbox */}
            <HabitCheckbox onProgressUpdate={handleProgressUpdate} userName={currentUser} />
            
            {/* Daily Memories */}
            <MemoryLogger userName={currentUser} />
            
            {/* Progress Graph */}
            <ProgressGraph userName={currentUser} />
          </Box>

          {/* Footer */}
          <Box 
            sx={{ 
              mt: 4, 
              textAlign: 'center',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Built with ❤️ for better habits |{' '}
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener"
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  color: '#667eea',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <GitHubIcon fontSize="small" />
                View on GitHub
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

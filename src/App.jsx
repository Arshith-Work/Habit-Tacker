import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import Greeting from './components/Greeting';
import MemoryLogger from './components/MemoryLogger';
import Questionnaire from './components/Questionnaire';
import ProgressGraph from './components/ProgressGraph';
import HollaCharacter from './components/HollaCharacter';
import HabitCheckbox from './components/HabitCheckbox';
import GitHubIcon from '@mui/icons-material/GitHub';

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
  const [habitProgress, setHabitProgress] = useState(0);
  const [hollaMood, setHollaMood] = useState('happy');
  const [hollaMessage, setHollaMessage] = useState("Let's build great habits together!");

  useEffect(() => {
    // Update Holla's mood and message based on habit progress
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

  const handleQuestionnaireComplete = (answers) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="xl">
          <Greeting />
          
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '300px 1fr' }, mb: 3 }}>
            {/* Holla Character - Left Side */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <HollaCharacter mood={hollaMood} message={hollaMessage} />
            </Box>

            {/* Main Content - Right Side */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Habit Checkbox */}
              <HabitCheckbox onProgressUpdate={handleProgressUpdate} />
              
              {/* Daily Memories */}
              <MemoryLogger />
            </Box>
          </Box>

          {/* Progress Graph - Full Width */}
          <Box sx={{ mb: 3 }}>
            <ProgressGraph />
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Built with ❤️ for better habits |{' '}
              <Link
                href="https://github.com/arshithinjaaz/habit-tracker"
                target="_blank"
                rel="noopener"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
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

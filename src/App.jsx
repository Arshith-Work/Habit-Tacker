import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, Link } from '@mui/material';
import Greeting from './components/Greeting';
import MemoryLogger from './components/MemoryLogger';
import Questionnaire from './components/Questionnaire';
import ProgressGraph from './components/ProgressGraph';
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
  const handleQuestionnaireComplete = (answers) => {
    console.log('Questionnaire completed:', answers);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Greeting />
          
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box>
              <Questionnaire onComplete={handleQuestionnaireComplete} />
              <MemoryLogger />
            </Box>
            <Box>
              <ProgressGraph />
            </Box>
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

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  Avatar,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TodayIcon from '@mui/icons-material/Today';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const MemoryLogger = () => {
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('memories');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMemory, setNewMemory] = useState('');

  const MotionDiv = motion.div;

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleAddMemory = () => {
    if (newMemory.trim()) {
      const memory = {
        id: Date.now(),
        text: newMemory,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toLocaleTimeString(),
      };
      const updatedMemories = [memory, ...memories];
      setMemories(updatedMemories);
      localStorage.setItem('memories', JSON.stringify(updatedMemories));
      setNewMemory('');

      // Show success animation
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 2000);

      // Reset today's habits after adding memory
      const today = new Date().toDateString();
      localStorage.removeItem(`habits_${today}`);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('habitsReset'));
    }
  };

  const handleDeleteMemory = (id) => {
    const updatedMemories = memories.filter((m) => m.id !== id);
    setMemories(updatedMemories);
    localStorage.setItem('memories', JSON.stringify(updatedMemories));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddMemory();
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Success Animation */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
          >
            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center',
                minWidth: 300,
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Typography variant="h3" sx={{ mb: 1 }}>
                  ✨📝✨
                </Typography>
              </motion.div>
              <Typography variant="h6" fontWeight="bold">
                Memory Saved!
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                Habits reset for a fresh start
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <NoteAddIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">
            Daily Memories
          </Typography>
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="What's on your mind today?"
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write about your day, feelings, or achievements..."
            sx={{ mb: 2 }}
            inputProps={{
              'aria-label': 'Memory text input',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddMemory}
            disabled={!newMemory.trim()}
            startIcon={<NoteAddIcon />}
            aria-label="Add memory"
          >
            Add Memory
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AutoAwesomeIcon color="primary" />
          Recent Memories ({memories.length})
        </Typography>

        <List sx={{ maxHeight: 450, overflow: 'auto', pr: 1 }}>
          <AnimatePresence>
            {memories.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  📝
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  No memories yet. Start capturing your precious moments!
                </Typography>
              </Paper>
            ) : (
              memories.map((memory, index) => (
                <MotionDiv
                  key={memory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '2px solid',
                      borderColor: 'primary.light',
                      borderLeftWidth: 6,
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box flex={1}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: 'primary.main',
                              fontSize: '1rem',
                            }}
                          >
                            📖
                          </Avatar>
                          <Box>
                            <Box display="flex" gap={1} alignItems="center">
                              <Chip
                                icon={<TodayIcon />}
                                label={memory.date}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                              />
                              <Chip
                                label={memory.timestamp}
                                size="small"
                                sx={{
                                  bgcolor: '#e3f2fd',
                                  color: '#1976d2',
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#333',
                            lineHeight: 1.6,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {memory.text}
                        </Typography>
                      </Box>
                      <IconButton
                        aria-label="delete memory"
                        onClick={() => handleDeleteMemory(memory.id)}
                        sx={{
                          color: 'error.main',
                          '&:hover': {
                            bgcolor: 'error.light',
                            color: 'white',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        opacity: 0.3,
                      }}
                    >
                      <FavoriteIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                    </Box>
                  </Paper>
                </MotionDiv>
              ))
            )}
          </AnimatePresence>
        </List>
      </Paper>
    </MotionDiv>
  );
};

export default MemoryLogger;

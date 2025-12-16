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
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TodayIcon from '@mui/icons-material/Today';

const MemoryLogger = () => {
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('memories');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMemory, setNewMemory] = useState('');

  const MotionDiv = motion.div;

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

        <Typography variant="h6" gutterBottom>
          Recent Memories
        </Typography>

        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          <AnimatePresence>
            {memories.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                No memories yet. Start writing about your day!
              </Typography>
            ) : (
              memories.map((memory) => (
                <MotionDiv
                  key={memory.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListItem
                    sx={{
                      mb: 1,
                      bgcolor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete memory"
                        onClick={() => handleDeleteMemory(memory.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={memory.text}
                      secondary={
                        <Box display="flex" gap={1} mt={1}>
                          <Chip
                            icon={<TodayIcon />}
                            label={memory.date}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={memory.timestamp}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
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

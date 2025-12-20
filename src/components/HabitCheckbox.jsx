import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const HabitCheckbox = ({ onProgressUpdate, userName }) => {
  const defaultHabits = [
    { id: 'exercise', label: '🏃‍♀️ Exercise (30 min)', category: 'Health' },
    { id: 'water', label: '💧 Drink 8 glasses of water', category: 'Health' },
    { id: 'reading', label: '📚 Read for 20 minutes', category: 'Learning' },
    { id: 'meditation', label: '🧘‍♀️ Meditate (10 min)', category: 'Wellness' },
    { id: 'sleep', label: '😴 Sleep 7-8 hours', category: 'Health' },
    { id: 'gratitude', label: '🙏 Practice gratitude', category: 'Wellness' },
    { id: 'healthy-meal', label: '🥗 Eat healthy meals', category: 'Health' },
    { id: 'social', label: '👥 Connect with loved ones', category: 'Social' },
    { id: 'learn', label: '💡 Learn something new', category: 'Learning' },
    { id: 'organize', label: '📝 Organize workspace', category: 'Productivity' },
  ];

  const [habits, setHabits] = useState(() => {
    try {
      const today = new Date().toDateString();
      const saved = localStorage.getItem(`habits_${userName}_${today}`);
      if (saved) {
        return JSON.parse(saved);
      }
      return defaultHabits.map(h => ({ ...h, completed: false }));
    } catch (error) {
      console.error('Error loading habits:', error);
      return defaultHabits.map(h => ({ ...h, completed: false }));
    }
  });

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  // Listen for habits reset event
  useEffect(() => {
    const handleReset = () => {
      const today = new Date().toDateString();
      const saved = localStorage.getItem(`habits_${userName}_${today}`);
      if (!saved) {
        setHabits(defaultHabits.map(h => ({ ...h, completed: false })));
      }
    };

    window.addEventListener('habitsReset', handleReset);
    return () => window.removeEventListener('habitsReset', handleReset);
  }, [defaultHabits, userName]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`habits_${userName}_${today}`, JSON.stringify(habits));
    
    if (onProgressUpdate) {
      onProgressUpdate(completionPercentage);
    }
  }, [habits, completionPercentage, onProgressUpdate, userName]);

  const handleToggle = (habitId) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === habitId ? { ...h, completed: !h.completed } : h
      )
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      Health: '#4CAF50',
      Wellness: '#9C27B0',
      Learning: '#2196F3',
      Social: '#FF9800',
      Productivity: '#F44336',
    };
    return colors[category] || '#757575';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <EmojiEventsIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">
              Daily Habits
            </Typography>
          </Box>
          {completedCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Chip
                icon={<LocalFireDepartmentIcon />}
                label={`${completedCount}/${totalCount}`}
                color="primary"
                sx={{ fontWeight: 'bold' }}
              />
            </motion.div>
          )}
        </Box>

        {/* Progress Bar */}
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Today's Progress
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="primary">
              {completionPercentage}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              },
            }}
          />
        </Box>

        {/* Habits List */}
        <List sx={{ width: '100%' }}>
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListItem
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  background: habit.completed ? '#f1f8f4' : '#fff',
                  border: habit.completed ? '2px solid #4CAF50' : '2px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: habit.completed ? '#e8f5e9' : '#fafafa',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={habit.completed}
                    onChange={() => handleToggle(habit.id)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    sx={{
                      color: '#bdbdbd',
                      '&.Mui-checked': {
                        color: '#4CAF50',
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: habit.completed ? 'line-through' : 'none',
                        color: habit.completed ? '#757575' : '#333',
                        fontWeight: habit.completed ? 400 : 500,
                      }}
                    >
                      {habit.label}
                    </Typography>
                  }
                />
                <Chip
                  label={habit.category}
                  size="small"
                  sx={{
                    backgroundColor: `${getCategoryColor(habit.category)}20`,
                    color: getCategoryColor(habit.category),
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 2,
                mt: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                🎉 Amazing! All habits completed today! 🎉
              </Typography>
            </Paper>
          </motion.div>
        )}
      </Paper>
    </motion.div>
  );
};

export default HabitCheckbox;

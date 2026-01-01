import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const HollaCharacter = ({ mood = 'happy', message = '' }) => {
  // Get emoji based on mood
  const getEmoji = () => {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'excited':
        return '🤩';
      case 'proud':
        return '🥳';
      case 'encouraging':
        return '💪';
      default:
        return '😊';
    }
  };

  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        fontSize: '80px',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
        position: 'relative',
      }}
    >
      {getEmoji()}
      {message && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            fontSize: '24px',
          }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default HollaCharacter;


import { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const HollaCharacter = ({ mood = 'happy', message = "Let's build great habits together!" }) => {
  // Determine Holla's expression based on mood
  const expressions = useMemo(() => ({
    happy: {
      face: '😊',
      color1: '#87CEEB',
      color2: '#B0E0E6',
      sparkles: true,
    },
    excited: {
      face: '🤩',
      color1: '#FFD700',
      color2: '#FFA500',
      sparkles: true,
    },
    proud: {
      face: '😌',
      color1: '#98FB98',
      color2: '#90EE90',
      sparkles: false,
    },
    encouraging: {
      face: '🥰',
      color1: '#DDA0DD',
      color2: '#E6A8D7',
      sparkles: false,
    },
    neutral: {
      face: '🙂',
      color1: '#B0E0E6',
      color2: '#ADD8E6',
      sparkles: false,
    },
    worried: {
      face: '😟',
      color1: '#F0E68C',
      color2: '#EEE8AA',
      sparkles: false,
    },
  }), []);

  const currentExpression = expressions[mood] || expressions.happy;

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #E8F4F8 0%, #F0F8FF 100%)',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Sparkles Background */}
      {currentExpression.sparkles && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -12, 0],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                position: 'absolute',
                fontSize: '22px',
                left: `${15 + i * 16}%`,
                top: `${10 + i * 5}%`,
                zIndex: 10,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </>
      )}

      <Box display="flex" flexDirection="column" alignItems="center" gap={2} position="relative">
        {/* Character Container */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Simple cute cloud-like character */}
            
            {/* Main Head/Body - Cloud Shape */}
            <Box
              sx={{
                width: 160,
                height: 140,
                background: `linear-gradient(135deg, ${currentExpression.color1} 0%, ${currentExpression.color2} 100%)`,
                borderRadius: '50% 50% 45% 45%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                border: '4px solid white',
                zIndex: 1,
              }}
            >
              {/* Top cloud bumps */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    background: `linear-gradient(135deg, ${currentExpression.color1} 0%, ${currentExpression.color2} 100%)`,
                    borderRadius: '50%',
                    border: '4px solid white',
                  }}
                />
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${currentExpression.color1} 0%, ${currentExpression.color2} 100%)`,
                    borderRadius: '50%',
                    border: '4px solid white',
                    mt: -1,
                  }}
                />
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    background: `linear-gradient(135deg, ${currentExpression.color1} 0%, ${currentExpression.color2} 100%)`,
                    borderRadius: '50%',
                    border: '4px solid white',
                  }}
                />
              </Box>

              {/* Face */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: '70px',
                  marginTop: '10px',
                }}
              >
                {currentExpression.face}
              </motion.div>

              {/* Bottom cloud bumps */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 35,
                    height: 35,
                    background: `linear-gradient(135deg, ${currentExpression.color1} 0%, ${currentExpression.color2} 100%)`,
                    borderRadius: '50%',
                    border: '4px solid white',
                  }}
                />
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    background: `linear-gradient(135deg, ${currentExpression.color1} 0%, ${currentExpression.color2} 100%)`,
                    borderRadius: '50%',
                    border: '4px solid white',
                    mt: 0.5,
                  }}
                />
                <Box
                  sx={{
                    width: 35,
                    height: 35,
                    background: `linear-gradient(135deg, ${currentExpression.color1} 0%, ${currentExpression.color2} 100%)`,
                    borderRadius: '50%',
                    border: '4px solid white',
                  }}
                />
              </Box>

              {/* Floating decorative elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 0.9, 0.5],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                  style={{
                    position: 'absolute',
                    fontSize: '24px',
                    left: `${15 + i * 35}%`,
                    bottom: -50,
                  }}
                >
                  {i === 0 ? '💫' : i === 1 ? '✨' : '⭐'}
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Character Name & Message */}
        <Box textAlign="center" mt={5}>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1.5,
              }}
            >
              Holla
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2.5,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 100%)',
                borderRadius: 3,
                maxWidth: 280,
                border: '3px solid #667eea',
                position: 'relative',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#4A5568',
                  fontWeight: 500,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                {message}
              </Typography>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </Paper>
  );
};

export default HollaCharacter;

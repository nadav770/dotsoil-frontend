import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';

const Hero: React.FC = () => {
  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#000'
    }}>
      {/* Beautiful Background Image - Premium Field */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
        zIndex: 1
      }} />
      
      {/* Gradient Overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(76,175,80,0.2) 50%, rgba(0,0,0,0.3) 100%)',
        zIndex: 2
      }} />

      {/* Premium Logo */}
      <Box sx={{
        position: 'absolute',
        top: 30,
        left: 40,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Box sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
        }}>
          <Typography sx={{ 
            color: 'white', 
            fontWeight: 900, 
            fontSize: '1.2rem',
            fontFamily: '"Roboto", sans-serif'
          }}>
            D
          </Typography>
        </Box>
        <Typography sx={{ 
          color: '#4CAF50', 
          fontWeight: 700, 
          fontSize: '1.8rem',
          fontFamily: '"Roboto", sans-serif',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          dots
        </Typography>
      </Box>

      {/* Premium Action Button */}
      <Box sx={{
        position: 'absolute',
        top: 30,
        right: 40,
        zIndex: 10
      }}>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            px: 4,
            py: 1.5,
            borderRadius: 25,
            textTransform: 'none',
            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #45A049 0%, #4CAF50 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 35px rgba(76, 175, 80, 0.5)',
            }
          }}
        >
          Let's Talk
        </Button>
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 10 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '80vh',
          maxWidth: 1000,
          mx: 'auto'
        }}>
          {/* Main Headline */}
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem', lg: '8rem' },
            fontWeight: 800,
            lineHeight: 0.9,
            mb: 3,
            color: 'white',
            textShadow: '0 10px 50px rgba(0,0,0,0.8), 0 5px 25px rgba(0,0,0,0.6)',
            fontFamily: '"Roboto", "Arial", sans-serif',
            letterSpacing: '-0.03em',
            textAlign: 'center'
          }}>
            Get the ground truth
          </Typography>
          
          {/* Subtitle */}
          <Typography variant="h3" sx={{ 
            color: 'rgba(255, 255, 255, 0.95)',
            fontWeight: 400,
            mb: 8,
            lineHeight: 1.3,
            textShadow: '0 6px 30px rgba(0,0,0,0.7), 0 3px 15px rgba(0,0,0,0.5)',
            fontFamily: '"Roboto", "Arial", sans-serif',
            letterSpacing: '0.01em',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textAlign: 'center'
          }}>
            Continuous affordable soil nitrate data
          </Typography>
          
          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            gap: 4, 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => window.location.href = '/dashboard'}
              sx={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                boxShadow: '0 12px 35px rgba(76, 175, 80, 0.5)',
                borderRadius: 50,
                px: 8,
                py: 3,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1.4rem',
                minWidth: 220,
                '&:hover': {
                  background: 'linear-gradient(135deg, #45A049 0%, #4CAF50 100%)',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 18px 45px rgba(76, 175, 80, 0.6)',
                }
              }}
            >
              Get Started
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.9)',
                color: 'white',
                borderRadius: 50,
                px: 8,
                py: 3,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1.4rem',
                borderWidth: 3,
                minWidth: 220,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 35px rgba(255, 255, 255, 0.2)',
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;

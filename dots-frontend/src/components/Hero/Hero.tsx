import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  paddingTop: `calc(${theme.spacing(2)} + env(safe-area-inset-top))`,
}));

const BackgroundVideo = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 1,
});

const BackgroundImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: 1,
});

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 100%)`,
  zIndex: 2,
}));

const GlowLines = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 3,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '20%',
    right: '15%',
    width: '2px',
    height: '60px',
    background: 'linear-gradient(180deg, transparent, #00D9FF, transparent)',
    boxShadow: '0 0 20px #00D9FF, 0 0 40px #00D9FF',
    animation: 'glow 3s ease-in-out infinite alternate',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '30%',
    left: '20%',
    width: '1px',
    height: '40px',
    background: 'linear-gradient(180deg, transparent, #00D9FF, transparent)',
    boxShadow: '0 0 15px #00D9FF, 0 0 30px #00D9FF',
    animation: 'glow 2.5s ease-in-out infinite alternate-reverse',
  },
  '@keyframes glow': {
    '0%': {
      opacity: 0.3,
      transform: 'scaleY(0.8)',
    },
    '100%': {
      opacity: 1,
      transform: 'scaleY(1.2)',
    },
  },
}));

const Header = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 4,
  padding: theme.spacing(2, 3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  color: '#16B34F',
  fontWeight: 700,
  fontSize: '2rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 4,
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#16B34F',
  color: 'white',
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 20px rgba(22, 179, 79, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#14A043',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 25px rgba(22, 179, 79, 0.4)',
  },
  '&:focus': {
    boxShadow: '0 0 0 3px rgba(22, 179, 79, 0.3)',
  },
}));

interface HeroProps {
  videoSrc?: string;
}

const Hero: React.FC<HeroProps> = ({ videoSrc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [videoError, setVideoError] = React.useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <HeroContainer>
      {/* Background */}
      {videoSrc && !videoError ? (
        <BackgroundVideo
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </BackgroundVideo>
      ) : (
        <BackgroundImage />
      )}

      {/* Overlay */}
      <Overlay />
      
      {/* Glow Lines */}
      <GlowLines />

      {/* Header */}
      <Header>
        <Logo variant="h4">dots</Logo>
        <HeroButton
          variant="contained"
          aria-label="בואו נדבר על הפרויקט שלך"
        >
          Let's Talk
        </HeroButton>
      </Header>

      {/* Content */}
      <ContentContainer maxWidth="lg">
        <Typography
          variant={isMobile ? "h3" : "h1"}
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 3,
            fontSize: isMobile ? '2.5rem' : '4rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            maxWidth: isMobile ? '100%' : '70%',
          }}
        >
          Get the ground truth
        </Typography>
        
        <Typography
          variant={isMobile ? "h6" : "h4"}
          component="p"
          sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400,
            lineHeight: 1.5,
            mb: 4,
            fontSize: isMobile ? '1.25rem' : '1.75rem',
            textShadow: '0 1px 5px rgba(0,0,0,0.5)',
            maxWidth: isMobile ? '100%' : '60%',
          }}
        >
          Continuous affordable soil nitrate data
        </Typography>
      </ContentContainer>
    </HeroContainer>
  );
};

export default Hero;

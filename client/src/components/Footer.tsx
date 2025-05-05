import React from 'react';
import { motion } from 'framer-motion';
import { Box, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LinkedIn, Instagram, Facebook, Code, Favorite } from '@mui/icons-material';
import { SiTypescript, SiReact, SiExpress } from 'react-icons/si';

// Stylying the footer dipesh
const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
}));

// making a footer animated
const AnimatedSection = motion(Box);

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// adding my all of the icons
const SocialIcon = motion(styled(Link)(({ theme }) => ({
  color: 'inherit',
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}))
)

const Footer: React.FC = () => (
  <StyledFooter>
    <Grid container spacing={4} justifyContent="space-between">
      {/* About Section */}
      <Grid item xs={12} md={4}>
        <AnimatedSection
          variants={footerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            About College Creations
          </Typography>
          <Typography variant="body2">
            A innovative college project dedicated to helping job seekers optimize 
            their resumes through AI-powered analysis and personalized suggestions.
          </Typography>
        </AnimatedSection>
      </Grid>

      {/* Quick Links */}
      <Grid item xs={6} md={2}>
        <AnimatedSection variants={footerVariants} initial="hidden" animate="visible">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Quick Links
          </Typography>
          {/* All of the footers list */}
          <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
            {[
              { text: 'Home', href: '/' },
              { text: 'Upload Resume', href: '/upload' },
              { text: 'Contact Us', href: '/contact' },
              { text: 'Privacy Policy', href: '/privacy' },
            ].map((link) => (
              <li key={link.text}>
                <Link 
                  href={link.href} 
                  color="inherit"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': { color: 'secondary.main' }
                  }}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </Box>
        </AnimatedSection>
      </Grid>


      <Grid item xs={6} md={3}>
        <AnimatedSection variants={footerVariants} initial="hidden" animate="visible">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
          <Typography variant="body2" paragraph>
            📧 dipeshgautambusiness@gmail.com<br />
            📱 +91-9745400194 <br />
            📍 Cu Students
          </Typography>
          {/* framer aniimation */}
          <Box sx={{ mt: 2 }}>
            <SocialIcon whileHover={{ scale: 1.2 }} href="#">
              <Instagram fontSize="large" />
            </SocialIcon>
            <SocialIcon whileHover={{ scale: 1.2 }} href="#">
              <LinkedIn fontSize="large" />
            </SocialIcon>
            <SocialIcon whileHover={{ scale: 1.2 }} href="#">
              <Facebook fontSize="large" />
            </SocialIcon>
          </Box>
        </AnimatedSection>
      </Grid>

{/* all of my tech stacks */}
      <Grid item xs={12} md={3}>
        <AnimatedSection variants={footerVariants} initial="hidden" animate="visible">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Built With
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <SiTypescript size={24} />
            <SiReact size={24} />
            <SiExpress size={24} />
            <Code fontSize="large" />
          </Box>
        </AnimatedSection>
      </Grid>
    </Grid>

{/* My legality info */}
    <Box sx={{ 
      mt: 4, 
      pt: 4, 
      borderTop: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center'
    }}>
      <Typography variant="body2">
        © 2025 College Creations. All Rights Reserved.<br />
        Made with <Favorite sx={{ color: 'error.main', fontSize: 16 }} /> 
        by Dipesh, Robin, Mohit, Krisy
      </Typography>
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Link href="/privacy" color="inherit" variant="body2">
          Privacy Policy
        </Link>
        <Link href="/terms" color="inherit" variant="body2">
          Terms of Use
        </Link>
      </Box>
    </Box>
  </StyledFooter>
);

export default Footer;
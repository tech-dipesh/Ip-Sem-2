import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, Typography, Grid, Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TimelineDot } from '@mui/lab';
import { RocketLaunch, AutoAwesome, Psychology, School } from '@mui/icons-material';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const SectionWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
  },
}));

const AnimatedText = motion(Typography);

const storyContent = [
  {
    icon: <School fontSize="large" />,
    title: "The Frustration",
    text: "I visited countless resume review websites hoping for honest feedback, only to hit paywalls. Most platforms either charged money or focused more on creating resumes than actually improving existing ones.",
  },
  {
    icon: <RocketLaunch fontSize="large" />,
    title: "The Spark",
    text: "That gap sparked an idea — why not create a platform that helps people fix their resumes, clearly and freely? I wanted to change this for every job seeker deserving real, accessible feedback.",
  },
  {
    icon: <Psychology fontSize="large" />,
    title: "The Build",
    text: "What started as a college project grew into something bigger. I built the first version from scratch — a basic but functional page. With a small team's support, I led development through backend and AI challenges.",
  },
  {
    icon: <AutoAwesome fontSize="large" />,
    title: "The Solution",
    text: "Today, our AI analyzes resumes for improvements — formatting, keywords, structure. Upload your resume and get practical feedback. Whether student or professional, get clear guidance at no cost.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const theme = useTheme();
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <SectionWrapper ref={ref}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 900 }}>
            Our Story
          </Typography>
          <Typography variant="h5" color="textSecondary">
            From Frustration to Innovation
          </Typography>
        </motion.div>
      </Box>

      {/* Timeline Story */}
      <Grid container spacing={6}>
        {storyContent.map((item, index) => (
          <Grid item xs={12} md={6} key={item.title}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Box sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: theme.palette.background.paper,
                boxShadow: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimelineDot color="primary" sx={{ mr: 2 }}>
                    {item.icon}
                  </TimelineDot>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="textSecondary">
                  {item.text}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Mission Statement */}
      <Box sx={{ mt: 12, textAlign: 'center' }}>
        <motion.div
          style={{ scale, opacity }}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 900 }}>
            Our Mission
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 800, margin: 'auto' }}>
            "This isn't about perfection — it's about potential. We built this platform for passionate,
            ambitious individuals ready to grow. Let's refine your resume and showcase your true capability."
          </Typography>
          <Button
            component={Link}
            to="/upload"
            variant="contained"
            size="large"
            sx={{ mt: 4, px: 6, py: 2, fontSize: '1.2rem' }}
          >
            Start Your Journey
          </Button>
        </motion.div>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={4} sx={{ mt: 8 }}>
        {[
          { number: 'Better', label: 'Resumes Improved' },
          { number: 'Higher', label: 'Satisfaction Rate' },
          { number: '24/7', label: 'Free Access' },
          { number: 'AI', label: 'Powered Analysis' },
        ].map((stat, index) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 900, mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {stat.label}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default HowItWorks;
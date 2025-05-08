import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Typography, Grid, Button, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TimelineDot } from "@mui/lab";
import {
  RocketLaunch,
  AutoAwesome,
  Psychology,
  School,} from "@mui/icons-material";
import { useRef } from "react";
import { Link } from "react-router-dom";

const SectionWrapper = styled(Box)(({ theme }) => ({
  // raw css not need this
  minHeight: "100vh",
  padding: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
  },
}));

// const AnimatedText = motion(Typography);
// Add on the array all of the problem statement
const storyContent = [
  {
    icon: <RocketLaunch fontSize="large" />,
    title: "The Idea",
    text: "The idea came from a simple question—can we build a helpful tool that reviews resumes using external resources? I wanted to explore whether it's possible to create something useful and specific that fills a gap many job seekers face when trying to improve their resumes.",
  },
  {
    icon: <School fontSize="large" />,
    title: "Market",
    text: "I reviewed many resume feedback platforms, and most of them looked polished in terms of speed and overall performance. But when I tried using their features, many required payment even for the most basic functions. This common paywall approach makes it difficult for users to get value upfront and can be quite discouraging.",
  },
  {
    icon: <Psychology fontSize="large" />,
    title: "The Build",
    text: "As a developer, I started by building a basic prototype. In the beginning, I faced some challenges, especially while planning the overall structure. But over time, I managed to set up all the backend routes. I chose to use TypeScript instead of JavaScript, which I’m currently focusing on to write more reliable and maintainable code.",
  },
  {
    icon: <AutoAwesome fontSize="large" />,
    title: "The Solution",
    text: "As of now, we haven't encountered any API issues, so the website is running smoothly. It's designed to help users improve their resume style by suggesting cleaner layouts and better structure. Additionally, it provides honest, balanced feedback—highlighting both the strong points and areas that need improvement.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const theme = useTheme();

  // This is animation which i add from the framer-motion.
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <SectionWrapper ref={ref}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 900 }}
          >
            Our Story
          </Typography>
          <Typography variant="h5" color="textSecondary">
            From html to react
          </Typography>
        </motion.div>
      </Box>

      {/* timeline in the form of the aniimation */}
      <Grid container spacing={6}>
        {storyContent.map((item, index) => (
          <Grid item xs={12} md={6} key={item.title}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TimelineDot color="primary" sx={{ mr: 2 }}>
                    {item.icon}
                  </TimelineDot>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700 }}
                  >
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

      {/* mission components, which specifically use a framer-motion, i can remove later. */}
      <Box sx={{ mt: 12, textAlign: "center" }}>
        <motion.div
          style={{ scale, opacity }}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 900 }}
          >
            Our Objective:
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ maxWidth: 800, margin: "auto" }}
          >
            "While this app isn’t fully production-ready, it performs close to
            that level. I’ve built it using everything I’ve learned up to April
            2025. Through this project, I'm showcasing my current skills and
            applying them to real-world use cases."
          </Typography>
          <Button
            component={Link}
            to="/upload"
            variant="contained"
            size="large"
            sx={{ mt: 4, px: 6, py: 2, fontSize: "1.2rem" }}
          >
            Start Your Journey
          </Button>
        </motion.div>
      </Box>

      {/* all stats with the animation */}
      <Grid container spacing={4} sx={{ mt: 8 }}>
        {[
          { number: "Better", label: "Resumes Improved" },
          { number: "Higher", label: "Satisfaction Rate" },
          { number: "24/7", label: "Free Access" },
          { number: "AI", label: "Powered Analysis" },
        ].map((stat, index) => (
          <Grid item xs={6} md={3} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: "center", p: 3 }}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: 900, mb: 1 }}
                >
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

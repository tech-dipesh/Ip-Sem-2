import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Typography, Box, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  RocketLaunch,
  CloudUpload,
  ContactSupport,
  Analytics,
} from "@mui/icons-material";
import CountUp from "react-countup";
// I can convert this into the tailwind in future
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
  color: "white",
  padding: theme.spacing(8),
  position: "relative",
  overflow: "hidden",
}));

const FloatingCard = styled(motion.div)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "2rem",
  margin: "2rem",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
});

// Too much stylying of raw animation need to convert on the tailwind, i will nnot use the bootstrap.
const GradientButton = styled(Button)({
  background: "linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)",
  color: "black",
  padding: "1rem 2rem",
  borderRadius: "30px",
  fontWeight: "bold",
  fontSize: "1.2rem",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,...")',
          // My homepage animation, i think quite clutter the framer animation
        }}
      />

      <Grid container spacing={6} justifyContent="center">
        {/* Not necessery content but i can change this content later. */}
        <Grid size={6}>
        
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Transform Your Career with
              <motion.span
                style={{ color: "#00C9FF", marginLeft: "1rem" }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AI-Powered Resume Analysis
              </motion.span>
            </Typography>
          </motion.div>
        </Grid>

        {/* this is the feature text */}
        <Grid size={6}>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <RocketLaunch />,
                title: "Instant Analysis",
                count: 10,
              },
              { icon: <CloudUpload />, title: "Resume Uploads", count: 8 },
              { icon: <Analytics />, title: "Loved By", count: 12 },
              { icon: <ContactSupport />, title: "24/7 Support", count: 4 },
            ].map((item, index) => (
              <Grid size={6} key={item.title}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <FloatingCard whileHover={{ y: -10 }}>
                    <Box sx={{ fontSize: "3rem", mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h5" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="h4" color="primary">
                      +<CountUp end={item.count} duration={3} />
                    </Typography>
                  </FloatingCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
{/* Grid is showwing error due to new material ui update */}
        {/* <Grid  xs={12} sx={{ textAlign: "center", mt: 8 }}> */}
        <Grid  size={6}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <GradientButton
              onClick={() => navigate("/upload")}
              startIcon={<CloudUpload />}
              size="large"
              // className="margin-top:20px"
            >
              Analyze Your Resume Now
            </GradientButton>
          </motion.div>
        </Grid>

 
      </Grid>
    </HeroSection>
  );
};

export default Home;

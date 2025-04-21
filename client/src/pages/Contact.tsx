import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CssBaseline,
  GlobalStyles
} from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)(({ }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 25,
  color: 'white',
  padding: '15px 30px',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(254,107,139,0.4)',
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)'
  }
}));

const AnimatedTextField = motion(TextField);

export default function Contact() {
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <GlobalStyles styles={{
        body: { background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }
      }} />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 4,
          p: 6,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <form action="https://formsubmit.cogs8828256+form@gmail.com" method='post'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography component="h1" variant="h3" sx={{ mb: 4, fontWeight: 700, color: '#2A2A2A' }}>
            Get in Touch
          </Typography>
        </motion.div>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <AnimatedTextField
                {...field}
                margin="normal"
                fullWidth
                label="Full Name"
                variant="outlined"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ddd'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FE6B8B'
                    }
                  }
                }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <AnimatedTextField
                {...field}
                margin="normal"
                fullWidth
                label="Email"
                variant="outlined"
                error={!!error}
                helperText={error?.message}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ddd'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FE6B8B'
                    }
                  }
                }}
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            rules={{ required: 'Message is required' }}
            render={({ field, fieldState: { error } }) => (
              <AnimatedTextField
                {...field}
                margin="normal"
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
                error={!!error}
                helperText={error?.message}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ddd'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FE6B8B'
                    }
                  }
                }}
              />
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            style={{ marginTop: 32 }}
          >
            <GradientButton
              type="submit"
              fullWidth
              disabled={!formState.isValid}
              sx={{ fontWeight: 700 }}
            >
              Send Message
            </GradientButton>
          </motion.div>
        </Box>
        </form>
      </Box>
    </Container>
  );
}
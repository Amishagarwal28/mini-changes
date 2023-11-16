import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Link,
} from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    address: '',
    phoneNo: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate email
    if (name === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailRegex.test(value) ? '' : 'Invalid email address',
      }));
    }

    // Validate password length
    if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.length >= 6 ? '' : 'Password must be at least 6 characters',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isFormValid = Object.values(errors).every((error) => error === '');

    if (!isFormValid) {
      console.error('Form validation failed');
      return;
    }

    try {
      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await axios.post(
        'http://localhost:8070/auth/signup',
        formData
      );

      // Handle success
      console.log('Registration successful', response.data);

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      // Handle errors
      console.error('Registration failed', error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          gutterBottom
        >
          Register
          </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* ... (unchanged fields) ... */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="dob"
                label="Date of Birth"
                type="date"
                id="dob"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneNo"
                label="Phone Number"
                id="phoneNo"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="nickname"
                label="Nickname"
                id="nickname"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            disabled={Object.values(errors).some((error) => error !== '')}
          >
            Register
          </Button>
          <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
            <Grid item>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
              >
                Back to Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;

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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const ForgetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation for non-empty fields
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '' ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : '',
    }));

    // Validation for email format
    if (name === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailRegex.test(value) ? '' : 'Invalid email address',
      }));
    }

    // Validation for password length
    if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.length >= 6 ? '' : 'Password must be at least 6 characters',
      }));
    }

    // Validation for matching passwords
    if (name === 'confirmPassword') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: value === formData.password ? '' : 'Passwords do not match',
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
      const response = await axios.post(
        'http://localhost:8070/auth/forgot-password',
        formData
      );

      // Handle success
      console.log('Registration successful', response);

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      // Handle errors
      console.error('Registration failed', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <div className={classes.formContainer}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Forget Password
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
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
                id="nickname"
                label="Nickname"
                name="nickname"
                autoComplete="nickname"
                onChange={handleChange}
                error={Boolean(errors.nickname)}
                helperText={errors.nickname}
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
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
          <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Back to Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ForgetPassword;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  form: {
    width: '300px',
    marginTop: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  error: {
    color: 'red',
    marginTop: theme.spacing(2),
  },
}));


const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate username and password not empty
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '' ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : '',
    }));
  };

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate username and password not empty
    const areFieldsEmpty = Object.values(formData).some((value) => value.trim() === '');

    if (areFieldsEmpty) {
      setErrors({
        username: formData.username.trim() === '' ? 'Username is required' : '',
        password: formData.password.trim() === '' ? 'Password is required' : '',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8070/auth/token', formData);

      const { jwt, userId, username, email: userEmail, userRole } = response.data;

      // Store the JWT token in local storage
      localStorage.setItem('token', jwt);

      // Store user information in local storage or global state
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('userRole', userRole);

      // Redirect to another page after successful login
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data.message || 'Login failed');
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">Login</Typography>
      {error && <Typography className={classes.error}>{error}</Typography>}
      <form className={classes.form} onSubmit={handleLogin}>
        <TextField
          className={classes.input}
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          value={formData.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        <TextField
          className={classes.input}
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" className={classes.link}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
      <Typography variant="body2" className={classes.link}>
        <Link to="/forget-password">Forget Password?</Link>
      </Typography>
    </div>
  );
};

export default Login;

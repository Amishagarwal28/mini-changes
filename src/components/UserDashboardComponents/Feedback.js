import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  form: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
}));

const FeedbackForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    userName: '',
    comment: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
let uopId=1;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8060/feedback/add/${uopId}`, formData);
      console.log('Server response:', response.data);
      // You can handle the response from the server here
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can handle errors here
    }
    setFormData((prevData)=>(
      {
        userName: '',
        comment: '',
      }

    ))
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Name"
          variant="outlined"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <TextField
          className={classes.textField}
          label="Comments"
          variant="outlined"
          name="comment"
          multiline
          rows={4}
          value={formData.comment}
          onChange={handleChange}
          required
        />
        <Button
          className={classes.submitButton}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;

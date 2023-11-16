import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  textField: {
    margin: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
}));

const PolicyForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    policy_name: '',
    policy_description: '',
    standardPremium:'',
    coverageAmount:'',
    term: '',
    // insuranceType:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
//let uopId=1;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8882/policies/add`, formData);
      console.log('Server response:', response.data);
      // You can handle the response from the server here
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can handle errors here
    }
    setFormData((prevData)=>(
      {
        policy_name: '',
        policy_description: '',
        standardPremium:'',
        coverageAmount:'',
        term:'',
        // insuranceType:''

      }

    ))
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="policy_name"
          variant="outlined"
          name="policy_name"
          value={formData.policy_name}
          onChange={handleChange}
          required
        />
        <TextField
          className={classes.textField}
          label="policy_description"
          variant="outlined"
          name="policy_description"
          multiline
          rows={4}
          value={formData.policy_description}
          onChange={handleChange}
          required
        />
        <TextField
          className={classes.textField}
          label="standardPremium"
          variant="outlined"
          name="standardPremium"
          multiline
          rows={4}
          value={formData.standardPremium}
          onChange={handleChange}
          required
        />
        <TextField
          className={classes.textField}
          label="coverageAmount"
          variant="outlined"
          name="coverageAmount"
          multiline
          rows={4}
          value={formData.coverageAmount}
          onChange={handleChange}
          required
        />
         <TextField
          className={classes.textField}
          label="term"
          variant="outlined"
          name="term"
          multiline
          rows={4}
          value={formData.term}
          onChange={handleChange}
          required
        />
    {/* <FormControl className={classes.formControl}>
      <InputLabel id="dropdown-label">Select Insurance Type</InputLabel>
        <Select
        labelId="dropdown-label"
        id="dropdown"
        label="insuranceType"
        value={formData.insuranceType}
        onChange={handleChange}
      >
        
        <MenuItem value="HEALTH">HEALTH </MenuItem>
        <MenuItem value="LIFE">LIFE </MenuItem>
        <MenuItem value="VEHICLE">VEHICLE </MenuItem>
        
      </Select>
    </FormControl> */}
       

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

export default PolicyForm;

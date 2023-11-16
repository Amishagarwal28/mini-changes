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

const AddDiscount = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    policyId: '',
    code:'',
    discountPercentage:'',
    description:'',
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
      const response = await axios.post(`http://localhost:8880/discounts/addDiscount`, formData);
      console.log('Server response:', response.data);
      // You can handle the response from the server here
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can handle errors here
    }
    setFormData((prevData)=>(
      {
       
        policyId: '',
        code:'',
        discountPercentage:'',
        description:'',
        // insuranceType:''

      }

    ))
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="policyId"
          variant="outlined"
          name="policyId"
          value={formData.policyId}
          onChange={handleChange}
          required
        />
        <TextField
          className={classes.textField}
          label="code"
          variant="outlined"
          name="code"
          multiline
          rows={4}
          value={formData.code}
          onChange={handleChange}
          required
        />
        <TextField
          className={classes.textField}
          label="discountPercentage"
          variant="outlined"
          name="discountPercentage"
          multiline
          rows={4}
          value={formData.discountPercentage}
          onChange={handleChange}
          required
        />
        <TextField
          className={classes.textField}
          label="description"
          variant="outlined"
          name="description"
          multiline
          rows={4}
          value={formData.description}
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

export default AddDiscount;

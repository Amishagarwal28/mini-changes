import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  welcomeCard: {
    marginBottom: theme.spacing(2),
  },
  welcomeImage: {
    height: 150,
    backgroundSize: 'contain',
  },
  tableContainer: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  leftColumn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginRight: theme.spacing(2),
    marginLeft: -theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(0),
  },
  rightColumn: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 40,
    marginRight: theme.spacing(1),
  },
  logoutContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    textDecoration: 'none',
    color: 'inherit',
  },
  logoutButton: {
    color: theme.palette.secondary.main,
  },
}));

const Discount = () => {
  const classes = useStyles();

 

  
    
    const [feedbackData, setFeedbackData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFeedbackData = async () => {
        try {
          const response = await fetch('http://localhost:8880/discounts/loadAll');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setFeedbackData(data);
        } catch (error) {
          console.error('Error fetching feedback data:', error);
          setError(error.message);
        }
      };
      
  
      fetchFeedbackData();
    }, []);
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <div >
        <Typography variant="h6" align="center">Discounts</Typography>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} aria-label="Discounts Table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Policy ID</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Discount Percentage</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell> {/* New column for "Good" button */}
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackData.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell>{discount.id}</TableCell>
                  <TableCell>{discount.policyId}</TableCell>
                  <TableCell>{discount.code}</TableCell>
                  <TableCell>{discount.discountPercentage}</TableCell>
                  <TableCell>{discount.description}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Good
                    </Button>
                  </TableCell>
                  {/* Add more cells for additional columns */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  

 


export default Discount;

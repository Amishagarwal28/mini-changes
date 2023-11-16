import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PolicyIcon from '@material-ui/icons/Policy';
import FeedbackIcon from '@material-ui/icons/Feedback';
import DiscountIcon from '@mui/icons-material/Discount';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { useState, useEffect } from 'react';
import FeedbackForm from './UserDashboardComponents/Feedback';
import Discount from './UserDashboardComponents/Discounts';
import Feedbacks from './UserDashboardComponents/Feedbacks';

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

function ApplicationOwnerDashboard() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Dashboard'); 
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch('http://localhost:8882/policies/loadPolicies');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);
  const classes = useStyles();
  const handleLogout = () => {
    // Karthikey Logout logic needs to be written here
    console.log('Logout clicked');
  };
  const handleCategoryClick = (category) => {
    // Update the selected category when a category is clicked
    setSelectedCategory(category);
  };
  return (
    <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            Insurance Management
          </Typography>
          <div className={classes.logoutContainer}>
            <Button className={classes.logoutButton} onClick={handleLogout}>
              <ExitToAppIcon />
              <Typography variant="h6" color="inherit">
                Logout
              </Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <div className={classes.leftColumn}>
         <div className={classes.text} onClick={() => handleCategoryClick('Dashboard')}>
         <Typography variant="h6" className={classes.text}>
              <DashboardIcon className={classes.icon} />
              Dashboard
            </Typography>
         </div>
        
         <div className={classes.text} onClick={() => handleCategoryClick('Feedback')}>
         <Typography variant="h6" className={classes.text}>
              <FeedbackIcon className={classes.icon} />
              Feedback
            </Typography>
         </div>
        </div>

        <div className={classes.rightColumn}>
          
          {selectedCategory === 'Dashboard' && (
            <Card className={classes.welcomeCard}>
            <CardMedia
              className={classes.welcomeImage}
              image="https://aryasamaj.com/wp-content/uploads/2021/04/namaste.png" 
              title="Welcome Image"
            />
            <CardContent>
              <Typography variant="h6" align="center">Welcome to Insurance Management</Typography>
              <Typography variant="body2" align="center">
              An Insurance Management System (IMS) is a sophisticated software solution designed to revolutionize 
              and streamline the complex operations within the insurance industry. Serving as the backbone of insurance
               companies, the IMS consolidates and automates key processes, ranging from policy creation and issuance 
               to claims processing and customer management. This comprehensive system facilitates the seamless 
               administration of insurance policies, allowing companies to efficiently assess risks, generate quotes, 
               and manage premium calculations. With features like underwriting support and agent performance 
               monitoring, the IMS empowers insurance providers to make informed decisions and enhance overall 
               operational efficiency. Robust billing and premium management capabilities, coupled with secure 
               document storage and compliance reporting, ensure financial accuracy, regulatory adherence, and 
               data security. By integrating seamlessly with external systems and offering robust reporting and 
               analytics tools, the IMS becomes a pivotal tool for insurance companies to adapt to evolving 
               market demands, provide superior customer service, and maintain a competitive edge in the dynamic 
               landscape of the insurance sector
              </Typography>
            </CardContent>
          </Card>
          )}
         
          {selectedCategory === 'Feedback' && (
           <Feedbacks/>
          )}
          
        </div>
      </div>

      
      <AppBar position="fixed" className={classes.bottomAppBar}>
        <Toolbar className={classes.toolbar}>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ApplicationOwnerDashboard;

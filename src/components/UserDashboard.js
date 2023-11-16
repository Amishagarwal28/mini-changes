import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PolicyIcon from '@material-ui/icons/Policy';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { useState, useEffect } from 'react';
import FeedbackForm from './UserDashboardComponents/Feedback';
import Discount from './UserDashboardComponents/Discounts';
import DiscountIcon from '@mui/icons-material/Discount';
import Policies from './UserDashboardComponents/AvailablePolicy';
import AppliedPolicy from './UserDashboardComponents/AppliedPolicy';





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

const UserDashboard = () => {
  const classes = useStyles();
  const [login, setLogin] = useState(true);
  const [userPolicies, setUserPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Dashboard'); 
  const userId=1;
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch(`http://localhost:8090/user-dashboard/loadUserPolicies/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserPolicies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user-related information from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');

    // Redirect to the login page or another destination
    navigate('/login'); // Ensure 'navigate' is declared using 'useNavigate'

    // Additional logout-related actions can be performed here
    console.log('Logout successful');
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
            

          
          <div className={classes.text} onClick={() => handleCategoryClick('AvailablePolicy')}>
         <Typography variant="h6" className={classes.text}>
              <PolicyIcon className={classes.icon} />
              Available Policy
            </Typography>
         </div>
          

         <div className={classes.text} onClick={() => handleCategoryClick('AppliedPolicy')}>
         <Typography variant="h6" className={classes.text}>
              <PolicyIcon className={classes.icon} />
              Applied Policy
            </Typography>
         </div>

         <div className={classes.text} onClick={() => handleCategoryClick('ApplyPolicy')}>
         <Typography variant="h6" className={classes.text}>
              <PolicyIcon className={classes.icon} />
              Apply Policy
            </Typography>
         </div>
         <div className={classes.text} onClick={() => handleCategoryClick('Discount')}>
         <Typography variant="h6" className={classes.text}>
              <DiscountIcon className={classes.icon} />
              Available Discount
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
          {selectedCategory === 'AvailablePolicy' && (
           <Policies/>
          )}
          {selectedCategory === 'AppliedPolicy' && (
            <AppliedPolicy/>
          )}
          {selectedCategory === 'ApplyPolicy' && (
            <Card className={classes.welcomeCard}>
            <CardMedia
              className={classes.welcomeImage}
              image="https://aryasamaj.com/wp-content/uploads/2021/04/namaste.png" 
              title="Welcome Image"
            />
            <CardContent>
              <Typography variant="h6" align="center">Welcome to Insurance Management</Typography>
              <Typography variant="body2" align="center">
              Apply Policies
              </Typography>
            </CardContent>
          </Card>
          )}
          {selectedCategory === 'Feedback' && (
            <FeedbackForm/>
          )}
          {selectedCategory === 'Discount' && (
           <Discount/>
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

export default UserDashboard;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import PolicyIcon from '@material-ui/icons/Policy';
// import FeedbackIcon from '@material-ui/icons/Feedback';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Card from '@material-ui/core/Card';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//   },
//   appBar: {
//     backgroundColor: theme.palette.primary.main,
//   },
//   welcomeCard: {
//     marginBottom: theme.spacing(2),
//   },
//   welcomeImage: {
//     height: 150,
//     backgroundSize: 'contain',
//   },
//   bottomAppBar: {
//     top: 'auto',
//     bottom: 0,
//     backgroundColor: theme.palette.primary.main,
//     marginTop: theme.spacing(2),
//   },
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   content: {
//     display: 'flex',
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   leftColumn: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     marginRight: theme.spacing(2),
//     marginLeft: -theme.spacing(2),
//     padding: theme.spacing(2),
//     paddingBottom: theme.spacing(0),
//     paddingTop: theme.spacing(5),
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: theme.spacing(8),
//     marginTop: theme.spacing(0),
//   },
//   rightColumn: {
//     flex: 5,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center', 
//     justifyContent: 'center', 
//   },
//   icon: {
//     fontSize: 40,
//     marginRight: theme.spacing(1),
//   },
//   logoutContainer: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: theme.spacing(4),
//     textDecoration: 'none',
//     color: 'inherit',
//   },
//   logoutButton: {
//     color: theme.palette.secondary.main,
//   },
// }));

// const UserDashboard = () => {
//   const classes = useStyles();

//   const handleLogout = () => {
//     // Karthikey Logout logic needs to be written here
//     console.log('Logout clicked');
//   };

//   return (
//     <div className={classes.root}>
//         <AppBar position="static" className={classes.appBar}>
//         <Toolbar className={classes.toolbar}>
//           <Typography variant="h6" color="inherit">
//             Insurance Management
//           </Typography>
//           <div className={classes.logoutContainer}>
//             <Button className={classes.logoutButton} onClick={handleLogout}>
//               <ExitToAppIcon />
//               <Typography variant="h6" color="inherit">
//                 Logout
//               </Typography>
//             </Button>
//           </div>
//         </Toolbar>
//       </AppBar>

//       <div className={classes.content}>
//         <div className={classes.leftColumn}>
//           <Link to="/user-dashboard" className={classes.text}>
//             <Typography variant="h6" className={classes.text}>
//               <DashboardIcon className={classes.icon} />
//               Dashboard
//             </Typography>
//           </Link>

//           <Link to="/policy-available" className={classes.text}>
//             <Typography variant="h6" className={classes.text}>
//               <PolicyIcon className={classes.icon} />
//               Available Policy
//             </Typography>
//           </Link>

//           <Link to="/policy-apply" className={classes.text}>
//             <Typography variant="h6" className={classes.text}>
//               <PolicyIcon className={classes.icon} />
//               Apply Policy
//             </Typography>
//           </Link>

//           <Link to="/policy-applied" className={classes.text}>
//             <Typography variant="h6" className={classes.text}>
//               <PolicyIcon className={classes.icon} />
//               Applied Policy
//             </Typography>
//           </Link>

//           <Link to="/discounts" className={classes.text}>
//             <Typography variant="h6" className={classes.text}>
//               <PolicyIcon className={classes.icon} />
//               Discounts
//             </Typography>
//           </Link>

//           <Link to="/feedback" className={classes.text}>
//             <Typography variant="h6" className={classes.text}>
//               <FeedbackIcon className={classes.icon} />
//               Feedback
//             </Typography>
//           </Link>
//         </div>

//         <div className={classes.rightColumn}>
//           <Card className={classes.welcomeCard}>
//             <CardMedia
//               className={classes.welcomeImage}
//               image="https://aryasamaj.com/wp-content/uploads/2021/04/namaste.png" 
//               title="Welcome Image"
//             />
//             <CardContent>
//               <Typography variant="h6" align="center">Welcome to Insurance Management</Typography>
//               <Typography variant="body2" align="center">
//               An Insurance Management System (IMS) is a sophisticated software solution designed to revolutionize 
//               and streamline the complex operations within the insurance industry. Serving as the backbone of insurance
//                companies, the IMS consolidates and automates key processes, ranging from policy creation and issuance 
//                to claims processing and customer management. This comprehensive system facilitates the seamless 
//                administration of insurance policies, allowing companies to efficiently assess risks, generate quotes, 
//                and manage premium calculations. With features like underwriting support and agent performance 
//                monitoring, the IMS empowers insurance providers to make informed decisions and enhance overall 
//                operational efficiency. Robust billing and premium management capabilities, coupled with secure 
//                document storage and compliance reporting, ensure financial accuracy, regulatory adherence, and 
//                data security. By integrating seamlessly with external systems and offering robust reporting and 
//                analytics tools, the IMS becomes a pivotal tool for insurance companies to adapt to evolving 
//                market demands, provide superior customer service, and maintain a competitive edge in the dynamic 
//                landscape of the insurance sector
//               </Typography>
//             </CardContent>
//           </Card>

          
//         </div>
//       </div>

      
//       <AppBar position="fixed" className={classes.bottomAppBar}>
//         <Toolbar className={classes.toolbar}>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

// export default UserDashboard;
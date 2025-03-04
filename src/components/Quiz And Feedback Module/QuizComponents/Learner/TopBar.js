import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import logo from '..//../../../assets/logo.png';
import '..//../../../Styles/Learner/LearnerNavbar.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect, } from 'react';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { FetchuserDataRequest } from '../../../../actions/LearnerAction/FetchRegisterAction';

const learnerId = sessionStorage.getItem('UserSessionID')
console.log('learnerid', learnerId);



function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const name = useSelector((state) => state.fetchlearner)
  console.log("name", name)
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const firstname = useSelector((state) => state.fetchlearner.userData.firstName);
  console.log("firstname", firstname);

  const lastname = useSelector((state) => state.fetchlearner.userData.lastName);
  console.log("lastname", lastname);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    fetchData((learnerId));

  }, [dispatch]);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);

  };

  const fetchData = async (learnerId) => {
    try {

      dispatch(FetchuserDataRequest(learnerId));



    } catch (error) {
      console.error("Error fetching data", error);
    }
  };


  const Logout = () => {
    handleMenuClose();
    navigate('/')
    sessionStorage.removeItem("UserSessionID")

  }


  return (

    <Box sx={{ display: 'flex' }} className='bar'>
      <CssBaseline />
      <AppBar position="fixed" open={open} className='bar'>
        <div style={{ backgroundColor: '#27235C' }}>
          <Toolbar>
            <a className="navbar-brand_learner" href="Relevantz"><img src={logo} alt="Relevantz Logo" className='navbar-imaged' /></a>
            <div className='navbar-name_learner'><h5>Learning Experience Platform</h5></div>
            <Typography variant="h6" noWrap component="div">
              <Stack direction="row" alignItems="center" className='avatar' spacing={2}>
                <Avatar {...stringAvatar(`${firstname} ${lastname}`)}
                  sx={{ cursor: 'pointer' }}
                  onMouseEnter={handleMenuOpen}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {/* <MenuItem onClick={handleMenuClose} > <link to='/updateuserprofile'>Edit Profile</link></MenuItem> */}
                  <MenuItem onClick={handleMenuClose}> <Link to='/updateuserprofile' style={{ color: 'inherit', textDecoration: 'inherit' }}>    Edit Profile  </Link></MenuItem>
                  <MenuItem onClick={handleMenuClose} ><Link to='/passwordchange' style={{ color: 'inherit', textDecoration: "inherit" }}>Password Update</Link> </MenuItem>
                  <MenuItem onClick={Logout}>Log Out</MenuItem>
                </Menu>
              </Stack>
            </Typography>

          </Toolbar>
        </div>
      </AppBar>
      <Box component="main-learner" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
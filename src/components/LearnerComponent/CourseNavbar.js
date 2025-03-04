import React, { useState, useRef ,useEffect} from "react";
import "../../Styles/Learner/CourseNavbar.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import logo from "..//../assets/logo.png";
import LearnerCourse from "../LearnerComponent/LearnerCourse";
import { useSelector,useDispatch } from "react-redux";
//import { fetchCourses } from '../../middleware/CourseApi';
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link, useNavigate } from "react-router-dom";
import { FetchuserDataRequest } from "../../actions/LearnerAction/FetchRegisterAction";
import '../../Styles/Learner/LearnerNavbar.css';

const learnerId = sessionStorage.getItem("UserSessionID");


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
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  marginLeft: "200%",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",

  [theme.breakpoints.up("md")]: {
    width: "50ch",
  },
}));

export default function MiniDrawer() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // State for search query
  // const [courses, setCourses] = useState([]);
  const courses = useSelector((state) => state.fetchcourse.courses);
  const searchedItemRef = useRef();


  const firstname = useSelector((state) => state.fetchlearner.userData.firstName);
  const lastname = useSelector((state) => state.fetchlearner.userData.lastName);
  console.log("firstname", firstname);
  console.log("lastname", lastname);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // const handleSearchFocus=()=>{
  //   searchedItemRef.current.display="block"
  // }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    fetchData((learnerId));
   
  }, [dispatch]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.length > 0) {
      const filteredSuggestions = courses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const fetchData = async (learnerId) => {
    try {
     
        dispatch(FetchuserDataRequest(learnerId));
    
      
     
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.title);
    setSuggestions([]);
  };

  const Logout = () => {
    handleMenuClose();
    navigate('/')
    sessionStorage.removeItem("UserSessionID")
    sessionStorage.removeItem("userData")
    sessionStorage.removeItem("LearnerId");
 
    window.location.reload();

  }


  return (
    <Box sx={{ display: "flex" }} className="bar">
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bar">
        <div style={{ backgroundColor: "#27235C" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <a className="navbar-brand_learner" href="Relevantz">
              <img src={logo} alt="Relevantz Logo" className="navbar-imaged" />
            </a>
            <div className="navbar-name_learner">
              <h5>Learning Experience Platform</h5>
            </div>
            {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Learning Experience Platform
          </Typography> */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <SearchBar className="search-bar_learner">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <SearchInput
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={handleFocus} // Add onFocus event handler
                  onBlur={handleBlur} // Add onBlur event handler
                />
                {isFocused==true && suggestions && suggestions.length > 0 ? (
                  <ul className="suggestions-dropdown">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.courseId}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.title}
                      </li>
                    ))}
                  </ul>
                ) : 
                  <>{isFocused==true && (<ul className="suggestions-dropdown">
                  <li>No results found</li>
                </ul>)}</>
                  
                }
              </SearchBar>
                 <Avatar {...stringAvatar(`${firstname} ${lastname}`)}
                  sx={{ cursor: 'pointer' }}
                  onMouseEnter={handleMenuOpen}
                  style={{marginLeft:500}}
                />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                 <MenuItem onClick={handleMenuClose}> <Link to='/updateuserprofile' style={{ color: 'inherit', textDecoration: 'inherit' }}>    Edit Profile  </Link></MenuItem>
                  <MenuItem onClick={handleMenuClose} >     <Link to='/passwordchange' style={{ color: 'inherit', textDecoration: "inherit" }}>Password Update</Link> </MenuItem>
                  <MenuItem onClick={Logout}>Log Out</MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </div>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
        <Link to='/LearnerDashboard'>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeOutlinedIcon />
                </ListItemIcon>
             
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to='/LearnerPage'>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
             
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MenuBookIcon />
                </ListItemIcon>
           
              <ListItemText primary="Courses" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to='/LearnerenrolledCourse'>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
             
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SchoolOutlinedIcon />
                </ListItemIcon>
            
              <ListItemText
                primary="My Course"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to='/ViewScore'>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
             
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <EmojiEventsOutlinedIcon />
                </ListItemIcon>
            
              <ListItemText primary="Scores" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>

      <LearnerCourse search={search} />
    </Box>
  );
}

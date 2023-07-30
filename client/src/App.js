import Login from "./pages/Login/Login";
import UsersView from "./pages/Users/UsersView";
// import UserAdd from "./pages/Users/UserAdd";

import { UserContext } from "./context/UserContext";

import { Routes, Route, Link } from "react-router-dom";

import { useContext, useState } from "react";

import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Title
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" variant="text" disableElevation>
              Home
            </Button>
            <Button
              component={Link}
              to="/users"
              variant="text"
              disableElevation
            >
              Users
            </Button>
            {/* Selectively render login or profile dashboard */}
            {user ? (
              <Button
                id="profile-button"
                onClick={handleProfileMenuClick}
                aria-controls={open ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                Hey {user.email}
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="text"
                disableElevation
              >
                Login
              </Button>
            )}
          </Stack>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleProfileMenuClose}
            aria-labelledby="profile-buttin"
          >
            <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
            <MenuItem
              onClick={handleProfileMenuClose}
              component={Link}
              to="/login"
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<h1>{"Home"}</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersView />} />
      </Routes>
    </div>
  );
}

export default App;

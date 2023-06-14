import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loading";

const Header = () => {
  const { storageData, loading, userLogout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    userLogout();
  };

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Button color="inherit" component={NavLink} to="/">
            Innoscripta
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          {storageData ? (
            <>
              <Button color="inherit" component={NavLink} to="/">
                <HomeIcon /> Home
              </Button>
              <Button color="inherit" component={NavLink} to="/feed">
                <RssFeedIcon /> Feed
              </Button>
              <Box>
                <Button color="inherit" onClick={handleClick}>
                  <AccountCircleIcon />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{ mt: 3 }}
                >
                  <MenuItem component={NavLink} to="/setting">
                    <SettingsIcon /> Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon /> Log out
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

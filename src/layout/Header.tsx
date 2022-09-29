import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FlexBox } from "../commonStyle/CommonStyle";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import { IS_MOBILE } from "../actions/actionType";
import { useSelector } from "react-redux";

export default function Header() {
  let user = useSelector((state: any) => state.login.user);
  const [currentUser, setCurrentUser] = React.useState(user);
  React.useEffect(() => {
    if (Object.keys(user).length === 0) {
      const storageUser: any = localStorage.getItem('user')
      let check = JSON.parse(storageUser);
      setCurrentUser(check);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const pages = [{ name: 'Help', url: '/' }, { name: 'Blog', url: '/' }, { name: 'Contact us', url: '/contact' }, { name: 'About us', url: '/about' }]
  const navigate = useNavigate();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const settingsClick = () => {
    setAnchorEl(null);
    navigate('/settings/personal')
  }
  const submitClick = () => {
    setAnchorEl(null);
    navigate('/apply-freelancer');

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: '#757575' }} position="static">
        <Toolbar sx={{ backgroundColor: "#ffffff" }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, cursor: "pointer" }}>
            <img
              src="/rounx-logo.png"
              alt="Rounx admin"
              width="140px"
              height="40px"
              onClick={() => navigate("/")}
              style={{ marginRight: '10px' }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => { dispatch({ type: IS_MOBILE }); }}
            >
              <MenuIcon sx={{ color: "#757575" }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: "pointer" }}>
            <img
              src="/rounx-symbol.png"
              alt="Rounx admin"
              width="40px"
              height="40px"
              onClick={() => navigate("/")}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(`${page.url}`)}
                sx={{ my: 2, mr: 1, color: '#000000', display: 'block', textTransform: 'none' }}>
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <TextField sx={{ display: { xs: 'none', md: 'flex' } }} placeholder="Search freelancers"
              InputProps={{ sx: { height: 40, borderRadius: '20px' }, startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
            {!!currentUser && <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ width: "40px", height: "40px", color: '#757575' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuList
                  sx={{ width: "250px", maxWidth: "100%" }}
                >
                  <ListItemText
                    sx={{
                      flexGrow: 1,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {currentUser.name}
                    <br />
                    {currentUser.email}
                  </ListItemText>
                  <Divider />
                  <MenuItem style={{ padding: "15px" }} onClick={submitClick}>
                    Submit freelancer application
                  </MenuItem>
                  <MenuItem style={{ padding: "15px" }} onClick={handleClose}>
                    Profile
                  </MenuItem>
                  <MenuItem style={{ padding: "15px" }} onClick={settingsClick}>
                    Settings
                  </MenuItem>
                  <MenuItem style={{ padding: "15px" }} onClick={handleClose}>
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>}

          </Box>
        </Toolbar>
      </AppBar>
    </Box>


  );
}

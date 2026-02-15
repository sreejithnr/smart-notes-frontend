import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const AppTopBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" onClick={openMenu}>
          <MenuIcon />
        </IconButton>

        <Typography sx={{ flexGrow: 1, ml: 1 }}>Smart Notes</Typography>

        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
          <MenuItem onClick={() => navigate("/app")}>
            <HomeIcon sx={{ mr: 1 }} /> Home
          </MenuItem>
          <MenuItem onClick={logout}>
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;

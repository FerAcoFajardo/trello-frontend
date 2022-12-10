import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeskIcon from '@mui/icons-material/Desk';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";
import './SideBarList.css'
import UserService from '../services/user.service.js';


const userService = new UserService();


const handleLogOut = () => {
  userService.logout();
}


export const mainListItems = (
  <React.Fragment>
    {/* <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton> */}

    <Link className='side-bar-link' to="/workspaces" underline="none">
      <ListItemButton>
        <ListItemIcon>
          <DeskIcon />
        </ListItemIcon>
        <ListItemText className='side-bar-text' primary="Workspaces" />
      </ListItemButton>
    </Link>

      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>     
        <ListItemText 
        onClick={handleLogOut}
        className='side-bar-text' primary="Logout" />
      </ListItemButton>
  </React.Fragment>
);


export const secondaryListItems = (

  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
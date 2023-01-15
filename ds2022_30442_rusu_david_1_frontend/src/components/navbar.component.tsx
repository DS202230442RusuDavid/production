import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {logout} from '../services/auth.service';
import { getLoggedInUser } from '../services/user.service';
import Role from '../dtos/role.dto';

const handleLogout = async () => {
  await logout();
  window.location.href = "/login";
}

function NavBar() {
  const user =  getLoggedInUser();
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ECOGreen
        </Typography>
        {user.id?<Button color="inherit" href="/home" style={{paddingRight:"5px"}}>Home </Button>:''}
        {user.id?<Button color="inherit" href="/help" style={{paddingRight:"5px"}}>Help Chat </Button>:''}
        {user.role === Role.Admin && <Button color="inherit" href="/administration" style={{paddingRight:"10px"}}>Administration </Button>}
        {user.id?<Button color="inherit" onClick={handleLogout}>Logout</Button>:''}
      </Toolbar>
    </AppBar>
  </Box>
  );
}
export default NavBar;

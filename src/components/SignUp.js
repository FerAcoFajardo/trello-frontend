import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2'

import UserService from '../services/user.service.js';
import { writeError, clearError} from '../utils/errors.js';
const userService = new UserService();

const theme = createTheme();



export default function SignUp() {

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    secondLastName: "",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
  });
  

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try{
      const result = await userService.createUser(
        data.get("profilePicture"),
        data.get('firstName'), 
        data.get('lastName'), 
        data.get('secondLastName'),
        data.get('birthDate'),
        data.get('phone'),
        data.get('email'), 
        data.get('password')
      );
  
      if (result.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'User created sucessfully',
          icon: 'success',
          confirmButtonText: 'Cool'
          
        }).then(() => {
          window.location.href = "/signIn";
        });

      } else if (result.status === 409){
        Swal.fire({
          title: 'Error!',
          text: 'The email is already in use',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }else{
      // TODO: Change to something more specific
        Swal.fire({
          title: 'Error!',
          text: 'There was an error creating the user, please try again',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }

    }catch (e) {
      // TODO: Change to something more specific
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating the user, please try again',
        icon: 'error',
        confirmButtonText: 'Cool'
      });

    }





  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" encType='multipart/form-data' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>


            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  autoFocus
                  required
                  id='profilePicture'
                  name="profilePicture"
                  value={values.profilePicture}
                  onChange={handleChange('profilePicture')}
                  type="file"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange('lastName')}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="secondLastName"
                  label="Second last name"
                  name="secondLastName"
                  value={values.secondLastName}
                  onChange={handleChange('secondLastName')}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Telephone/cellphone"
                  value={values.phone}
                  onChange={handleChange('phone')}
                  name="phone"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="birthDate"
                  name="birthDate"
                  value={values.birthDate}
                  onChange={handleChange('birthDate')}
                  type="date"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={values.email}
                  onChange={handleChange('email')}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    name="password"
                    id="password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I accept all terms and conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

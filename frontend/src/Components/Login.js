import {Link} from "react-router-dom";
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useTheme,createTheme, ThemeProvider } from '@mui/material/styles';
import Input from "./Input";

const Login=()=> {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()
		setEmailError("")
		setPassError("")

		const response = await fetch(BACKEND_URL+'users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
        console.log(data.user)
		if (data.user) {
			
			localStorage.setItem('token', data.token)
			
            localStorage.setItem("user",JSON.stringify(data.user))
            localStorage.setItem("userId",JSON.stringify(data.user.userId))
			window.location.href = '/'
		} else {

			if (email==""){
			setEmailError("Email cannot be left empty")
			}


			if (password==""){
			setPassError("Password cannot be left empty")
			}
			if(password!="" && email!=""){
			setPassError("Invalid Email or Password")
			setEmailError(true)
			}
			//alert('Invalid Email or Password')
		}
	}
const theme=createTheme();

const [emailError,setEmailError]=useState("");
const [passwordError,setPassError]=useState("");
const [errorEP,setErrorEP] = useState("")


const validate=()=>{
	let temp={}
	temp.email= (/$|.+@.+..+/).test(email) ?"" : "Email is not valid"
	
	setEmailError(
	"Invalid email"		
	)
	return Object.values(temp).every(x => x == "")
	}
	return (/*
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
                <br />
                <Link to="/Register"> Don't have an account? Sign Up! </Link>
			</form>
		</div>
	*/
	// return (
         <ThemeProvider theme={theme}>
           <Grid container component="main" sx={{ height: '100vh' }}>
             <CssBaseline />
             <Grid
               item
               xs={false}
               sm={4}
               md={7}
               sx={{
                 backgroundImage: 'url(https://source.unsplash.com/random)',
                 backgroundRepeat: 'no-repeat',
                 backgroundColor: (t) =>
                   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}
             />
             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
               <Box
                 sx={{
                   my: 8,
                   mx: 4,
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                 }}
               >
                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                   <LockOutlinedIcon />
                 </Avatar>
                 <Typography component="h1" variant="h5">
                   Sign in
                 </Typography>
                 <Box component="form" noValidate onSubmit={loginUser} sx={{ mt: 1 }}>
                   <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     value={email}
	      			onChange={(e) => setEmail(e.target.value)}
	 				type="email"
	 				placeholder="Email"
                     autoFocus
				 	error={emailError !== ""}
					 helperText= {emailError}

					
					 />
                   
                   <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     value={password}
       				onChange={(e) => setPassword(e.target.value)}
	     			type="password"
	 				placeholder="Password"
			
					 error={passwordError !== ""}
					 helperText= {passwordError}

					 

					 
                   />
                   <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="Remember me"
                   />
                   <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                   >
                     Sign In
                   </Button>
                   <Grid container>
                     <Grid item xs>
                       <Link href="#" variant="body2">
                         Forgot password?
                       </Link>
                     </Grid>
                     <Grid item>
                       <Link to="/Register">
                         {"Don't have an account? Sign Up"}
                       </Link>
					   
                     </Grid>
                   </Grid>
                 </Box>
               </Box>
             </Grid>
           </Grid>
         </ThemeProvider>
       );
	
}

export default Login
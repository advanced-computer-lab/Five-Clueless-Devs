import {Link} from "react-router-dom";
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Login=()=> {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

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
			alert('Login successful')
            localStorage.setItem("user",JSON.stringify(data.user))
            localStorage.setItem("userId",JSON.stringify(data.user.userId))
			window.location.href = '/'
		} else {
			alert('Invalid Email or Password')
		}
	}

	return (
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
	)
}

export default Login
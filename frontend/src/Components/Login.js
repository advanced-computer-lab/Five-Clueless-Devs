import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Login = () => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch(BACKEND_URL + 'users/login', {
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

		if (data.user && data.token) {
			localStorage.setItem('token', data.token.split(' ')[1])
			localStorage.setItem('user', JSON.stringify(data.user))
			alert('Login successful')
			window.location.href = '/'
		} else {
			alert('Please check your username and password')
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
				</form>
			</div>

	);
}

export default Login;
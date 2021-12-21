import {Link} from "react-router-dom";
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'

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
        console.log(data.user.userId)
		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
            localStorage.setItem("user",data.user)
            localStorage.setItem("userId",data.user.userId)
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
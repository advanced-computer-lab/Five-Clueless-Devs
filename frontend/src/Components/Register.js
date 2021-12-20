import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';



const Register = () => {
	const history = useHistory()
	const [userId, setUserId] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [homeAddress, setHomeAddress] = useState('')
	const [countryCode, setcountryCode] = useState('')
	const [telephone, setTelephone] = useState('')
	const [passportNumber, setPassportNumber] = useState('')
	const [reservations, setReservations] = useState([])

	async function registerUser(event) {
		event.preventDefault()

		try {
			const response = await fetch(BACKEND_URL + 'users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					// userId: email,
					username,
					email,
					password,
					firstName,
					lastName,
					homeAddress,
					countryCode,
					telephone,
					passportNumber,
					reservations
				}),
			})

			const data = await response.json()
			console.log(data);
			if (data.status === 'ok') {
				history.push('/login')
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				{/* <TextField
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
					type="text"
					placeholder="UserID"
				/>
				<br /> */}
				<TextField
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="Username"
				/>

				<TextField
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<TextField
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<TextField

					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					type="text"
					placeholder="First Name"
				/>
				<TextField

					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					type="text"
					placeholder="Last Name"
				/>
				<TextField
					value={telephone}
					onChange={(e) => setTelephone(e.target.value)}
					placeholder="Telephone"
				/>
				<br />
				<TextField
					value={homeAddress}
					onChange={(e) => setHomeAddress(e.target.value)}
					placeholder="Home Address"
				/>
				<TextField
					value={countryCode}
					onChange={(e) => setcountryCode(e.target.value)}
					placeholder="Country Code"
				/>
				<br />
				<TextField
					value={passportNumber}
					onChange={(e) => setPassportNumber(e.target.value)}
					placeholder="Passport Number"
				/>
				<br />
				{/* <TextField
					value={reservations}
					onChange={(e) => setReservations(e.target.value)}
					placeholder="Reservations"
				/>
				<br /> */}
				<input type="submit" value="Register" />
			</form>
		</div>

	)
}

export default Register
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BACKEND_URL } from '../API/URLS'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button, Step, StepButton, Stepper } from '@mui/material';
import './Register.css';


const steps = ['Account Details', 'Personal Details', 'Travel Details'];
const Register = () => {


	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({});
	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				// find the first step that has been completed
				steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};


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

	if (activeStep == 0) {
		return (
			<div>
				<h1>Register</h1>

				<Stepper nonLinear alternativeLabel activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label} completed={completed[index]}>
							<StepButton color="inherit" onClick={handleStep(index)}>
								{label}
							</StepButton>
						</Step>
					))}
				</Stepper>

				<div className='register-box-container'>
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

					<TextField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<br />

					<Button onClick={handleNext} sx={{ mr: 1 }}>
						Next
					</Button>
				</div>
			</div>

		)
	} else if (activeStep == 1) {
		return (
			<div>
				<h1>Register</h1>

				<Stepper nonLinear alternativeLabel activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label} completed={completed[index]}>
							<StepButton color="inherit" onClick={handleStep(index)}>
								{label}
							</StepButton>
						</Step>
					))}
				</Stepper>


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

				<Button onClick={handleNext} sx={{ mr: 1 }}>
					Next
				</Button>
			</div>
		)
	} else {

		return (
			<div>
				<h1>Register</h1>

				<Stepper nonLinear alternativeLabel activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label} completed={completed[index]}>
							<StepButton color="inherit" onClick={handleStep(index)}>
								{label}
							</StepButton>
						</Step>
					))}
				</Stepper>
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

				<input type="submit" value="Register" />
			</div>
		)
	}
}

export default Register;
import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './SearchFlightCriteria.css';   // create one for users


const EditUser = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        userId: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        homeAddress: '',
        countryCode: '',
        telephone: '',
        email: '',
        passportNumber: '',
        isAdmin: '',
        reservations: ''
    });
    let { id } = useParams();


    const getUser = () => {
        console.log("Print id: " + { id });
        axios
            .get(BACKEND_URL + "users/search?userId=" + id)
            .then(res => {
                console.log(res.data);
                setUser(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .put(BACKEND_URL + 'users/update?userId=' + id, user)
            .then(res => {
                console.log(res.data);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        getUser();
    }, []);

    const [ sent, setSent ] = useState(false)
	const [ text, setText ] = useState("")
	const handleSend = async (e) => {
		setSent(true)
		try {
            console.log(user);
			await axios.post("http://localhost:8082/send_mail", {
				text
			})
		} catch (error) {
			console.error(error)
		}
	}


    return (
        <div className="Edit User">
            <div className="container">
                <div className="row">

                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center" style={{margin:"10px 0"}}>Edit User</h1>


                        <form noValidate onSubmit={onSubmit}>
                            <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        label="User ID"
                                        className='form-control'
                                        name="userId"
                                        value={user.userId}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>


                            <div className='form-group'>
                                <div>     
                                <TextField
                                            className='form-control'
                                            label='User Name'
                                            name="username"
                                            value={user.username}
                                            onChange={(e) => onChange(e)}
                                        />

                                   
                                       <TextField
                                            className='form-control'
                                            label='Password'
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={(e) => onChange(e)}
                                        />
                                   
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>     
                                <TextField
                                            className='form-control'
                                            label='First Name'
                                            name="firstName"
                                            value={user.firstName}
                                            onChange={(e) => onChange(e)}
                                        />

                                   
                                       <TextField
                                            className='form-control'
                                            label='Last Name'
                                            name="lastName"
                                            value={user.lastName}
                                            onChange={(e) => onChange(e)}
                                        />
                                   
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Home Address'
                                        name="homeAddress"
                                        value={user.homeAddress}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Country Code'
                                        name="countryCode"
                                        value={user.countryCode}
                                        onChange={(e) => onChange(e)}
                                    />

                                    
                                </div>
                            </div>
                            <div className='form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Telephone number(s)'
                                        name="telephone"
                                        value={user.telephone}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Email Address'
                                        name="email"
                                        value={user.email}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='Passport Number'
                                        name="passportNumber"
                                        value={user.passportNumber}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>



                            <div className='input-group-append'>
                                    <Button variant="outlined" type="submit">Edit User</Button>
                                </div>
                                <div className="App">
                                
                              
            
			{!sent ? (
				<form onSubmit={handleSend}>
					<input type="text" value={text} onChange={(e) => setText(e.target.value)} />

					<button type="submit">Send Email</button>
				</form>
			) : (
				<h1>Email Sent</h1>
			)}
		</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;

import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import TextField from '@mui/material/TextField';

import './SearchFlightCriteria.css';   // create one for users
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';

const SignUp=()=>{
    const[user,setUser]=useState({
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
});
const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
};
const [errorEmail, setErrorEmail] = useState("");
const [errorFName, setErrorFName] = useState("");
const [errorLName, setErrorLName] = useState("");
const [errorHome, setErrorHome] = useState("");
const [errorCountry, setErrorCountry] = useState("");
const [errorTel, setErrorTel] = useState("");
const[errorPassNum,setErrorPassNum]=useState("");
const submitAction = (e) => {
    e.preventDefault();
    var goAhead = true;
    if (user.email == '') {
        setErrorEmail("this field is required");
        goAhead = false;
    } else {
        setErrorEmail("");
    }
    if (user.firstName == '') {
        setErrorFName("this field is required");
        goAhead = false;
    } else {
        setErrorFName("");
    }
    if (user.lastName == '') {
        setErrorLName("this field is required");
        goAhead = false;
    } else {
        setErrorLName("");
    }
    if (user.homeAddress == '') {
        setErrorHome("this field is required");
        goAhead = false;
    } else {
        setErrorHome("");
    }
    if (user.countryCode == '') {
        setErrorCountry("this field is required");
        goAhead = false;
    } else {
        setErrorCountry("");
    }
    if (user.countryCode == '') {
        setErrorCountry("this field is required");
        goAhead = false;
    } else {
        setErrorCountry("");
    }
    if (user.telephone== '') {
        setErrorTel("this field is required");
        goAhead = false;
    } else {
        setErrorTel("");
    }
    if (user.passportNumber== '') {
        setErrorPassNum("this field is required");
        goAhead = false;
    } else {
        setErrorPassNum("");
    }
     
if(goAhead){

}
    
}
return(<div className="Edit User">
<div className="container">
    <div className="row">

        <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center" style={{ margin: "10px 0" }}>SignUp User</h1>


            <form noValidate onSubmit={onSubmit}>
                <div className='criteria-form-group'>
                    <div>
                        <TextField
                            disabled
                            id="outlined"
                            label="User ID"
                            className='form-control'
                            name="userId"
                            value={user?.userId}

                        />
                    </div>
                </div>


                <div className='form-group'>
                    <div>
                        <TextField
                            className='form-control'
                            label='User Name'
                            name="username"
                            value={user?.username}
                            onChange={(e) => onChange(e)}
                        />


                        {/* <TextField
                            className='form-control'
                            label='Password'
                            type="password"
                            name="password"
                            value={user?.password}
                            onChange={(e) => onChange(e)}
                        /> */}

                    </div>
                </div>
                <div className='form-group'>
                    <div>
                        <TextField
                            className='form-control'
                            label='First Name'
                            name="firstName"
                            value={user?.firstName}
                            onChange={(e) => onChange(e)}
                        />


                        <TextField
                            className='form-control'
                            label='Last Name'
                            name="lastName"
                            value={user?.lastName}
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
                            value={user?.homeAddress}
                            onChange={(e) => onChange(e)}
                        />

                        <TextField
                            id="outlined"
                            className='form-control'
                            label='Country Code'
                            name="countryCode"
                            value={user?.countryCode}
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
                            value={user?.telephone}
                            onChange={(e) => onChange(e)}
                        />

                        <TextField
                            id="outlined"
                            className='form-control'
                            label='Email Address'
                            name="email"
                            value={user?.email}
                            onChange={(e) => onChange(e)}
                        />

                        <TextField
                            id="outlined"
                            className='form-control'
                            label='Passport Number'
                            name="passportNumber"
                            value={user?.passportNumber}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                </div>



                <div className='input-group-append'>
                    <Button style={{ marginRight: "10px" }} onClick={() => history.push('/user-details/' + localStorage.getItem("userId"))} variant="outlined">Back</Button>
                    <Button onClick={toggleDialog} variant="outlined" >Edit User</Button>

                </div>
                {/* <div>

                    <Dialog
                        open={showConfirm}
                        onClose={toggleDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to edit this user?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={toggleDialog} variant="text">Cancel </Button>
                            <Button onClick={ onSubmit} variant="text" type="submit" color="success" >Confirm Edit</Button>
                        </DialogActions>
                    </Dialog>

                </div> */}

            </form>
        </div>
    </div>
</div>
</div>

);

}
import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import TextField from '@mui/material/TextField';

import './SearchFlightCriteria.css';   // create one for users
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';
import UIButton from './UIButton/UIButton';

const ChangePassword=()=>{
    // const[passwordS,setPassword]=useState({
    //     password:'',
    //     oldPassword: '',
    //     confirmPassword: '',
    // })
    let pass;
    let ready=false;
    const[oldpass,setOldpass]=useState({
        oldPassword: '',
    })
    const[newpass,setNewpass]=useState({
        Newpassword: '',
    })
    const[confirmpass,setConfpass]=useState({
        Confirmpassword: '',
    })
    let Uid = JSON.parse(localStorage.getItem('user'))?._id;
    const getOldPass=()=>{
        console.log("Print id: " + { id });
        axios
            .get(BACKEND_URL + "users/search?_id=" + Uid)
            .then(res => {
               // let temp=res.data[0].password;
                pass=res.data[0].password;
                console.log(pass);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const onChange = (e) =>{
        if(e.target.name=="oldpassword"){
            setOldpass(e.target.value);
            console.log(oldpass);
        }
        if(e.target.name=="newpassword"){
            setNewpass(e.target.value);
            console.log(newpass);
        }
        if(e.target.name=="confirmpass"){
            setConfpass(e.target.value)
        }
        if(oldpass!=''&&newpass!=''&&confirmpass!=''){
              check(oldpass,newpass,confirmpass);
        }
    }
    const check=(i,j,k)=>{
        
        let comp=await bcrypt.hash(i,10);
        if(comp==pass){
            if(j==k){
                ready=true;
            }
        }
    } 
    const onSubmit=()=>{
        if(ready){
            let newpassencry=await bcrypt.hash(j,10);
            axios
            .put(BACKEND_URL + "users/update?_id=" + Uid,newpassencry)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            
        }
    }
        

        
    
    return (
        <div className="update Flight">
            <div className="container">
                <div className="row">

                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center" style={{margin:"10px 0"}}>change Password</h1>


                        <form noValidate onSubmit={onSubmit}>
                            <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        label="oldpassword"
                                        className='form-control'
                                        name="oldpassword"
                                        value={oldpass}
                                        onChange={(e) =>onChange(e)}
                                    />
                                </div>
                            </div>


                            <div className='criteria-form-group'>
                                <div>
                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='newPassword'
                                        name="newpassword"
                                        value={newpass}
                                        onChange={(e) =>onChange(e)}
                                    />

                                    <TextField
                                        id="outlined"
                                        className='form-control'
                                        label='confirmPassword'
                                        name="confirmpass"
                                        value={confirmpass}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>

                            <div className='input-group-append'>
                                    <Button variant="outlined" type="submit">Update Password</Button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}
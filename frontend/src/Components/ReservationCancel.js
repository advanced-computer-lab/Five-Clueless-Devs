import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';


const ReservationCancel = () => {
    const history = useHistory();

    const [fromflight, setfromFlight] = useState({
        availableEconomy: '',
        availableBusiness: '',
        availableFirst: '',
        seatsBusiness:'',
        seatsEconomy:'',
        seatsFirst:''
    });
    const [toflight, settoFlight] = useState({
        availableEconomy: '',
        availableBusiness: '',
        availableFirst: '',
        seatsBusiness:'',
        seatsEconomy:'',
        seatsFirst:''
    });
const onDeleteConfirm = () => {
    let{id,from,to}=useParams();
    var tempFromEconomy=[];
    var tempFromFirst=[];
    var tempFromBusiness=[];
    var temptoEconomy=[];
    var temptoFirst=[];
    var temptoBusiness=[];
    
    axios
      .get(BACKEND_URL + "flights/search?flightId=" + from)
      .then(res => {
        //console.log(res.data[0]);
        tempFromEconomy=[...res.data[0].seatsEconomy];
        tempFromFirst=[...res.data[0].seatsFirst];
        tempFromBusiness=[...res.data[0].seatsBusiness];

         //console.log(tempFromEconomy);
        // console.log(tempFromFirst);
        // console.log(tempFromBusiness);
        setfromFlight(res.data[0] || {});
        axios
        .get(BACKEND_URL + "flights/search?flightId=" +to)
        .then(res => {
         // console.log(res.data[0]);
          temptoEconomy=[...res.data[0].seatsEconomy];
          temptoFirst=[...res.data[0].seatsFirst];
          temptoBusiness=[...res.data[0].seatsBusiness];
          settoFlight(res.data[0] || {});
        })
        .catch(err => {
          console.log(err);
        })
       // console.log(tempFromEconomy);
        axios.get(BACKEND_URL + "reservations/GetReservation?UserID="+id+"&from="+from+"&to="+to)
        .then(res => {
           setReservation(res.data[0]);
            var temp1=[];
            var temp2=[];
          console.log(res.data[0]._id);
          //temp=[...res.data];
          let cabinclass="";
          //console.log(tempFromEconomy);
          switch(res.data[0].cabin){
              case "Economy":
                  temp1=tempFromEconomy;
                  temp2=temptoEconomy;
                  cabinclass="Economy";
                  break;
              case "First":
                  temp1=tempFromFirst;
                  temp2=temptoFirst;
                  cabinclass="First";
                  break;
              case "Business":
                  temp1=tempFromBusiness;
                  temp2=temptoBusiness;
                  cabinclass="Business";
          }
          //console.log(temp1);
          //console.log(temp2);
          //let Uid="10";
          let SeatFrom=[];
          let SeatTo=[];
          let countFrom=0;
          let countTo=0;
          for(let i=0;i<temp1.length;i++){
              if(temp1[i]==id){
                  SeatFrom[i]=null;
                  countFrom++;
              }
          }
          setSeatsFrom(SeatFrom);
          //console.log(SeatFrom);
          for(let i=0;i<temp2.length;i++){
            if(temp2[i]==id){
                SeatTo[i]=null;
                countTo++;
            }
        }
        setSeatsTO(SeatTo);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
    axios
      .delete(BACKEND_URL + "reservations/cancelReservation?UserID=" + id+"&from"+from+"&to"+to)
      .then(res => {
        history.push("/Reserved-flights");
      })
      .catch(err => {
        console.log("Error form Cancel Resrevation");
        console.log(err);
      })
      

  };
}
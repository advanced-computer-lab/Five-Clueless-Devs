import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';


const ReservationCancel = (props) => {
    const history = useHistory();
    const from = props.from;
    const to = props.to;
    const userid=props.userid;
    const toSeats=props.toSeats;
    const fromSeats=props.fromSeats;
    const cabin=props.cabin;
    const reservationID=props.reservationId;
    //let{id,from,to}=useParams();
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
  const [showConfirm, setConfirm] = useState(false);

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }
    useEffect(() => {
        //OnCancel();
        console.log(props.toSeats)
        console.log(props.fromSeats)
    }, []);
const OnCancel = () => {
          let SeatFrom=[];
          let SeatTo=[];
          let countFrom=0;
          let countTo=0;
          for(let i=0;i<fromSeats.length;i++){
              if(fromSeats[i]==userid){
                  SeatFrom[i]=null;
                  countFrom++;
              }
              else
              SeatFrom[i]=fromSeats[i];
          }
          //setSeatsFrom(SeatFrom);
          //console.log(SeatFrom);
          for(let i=0;i<toSeats.length;i++){
            if(toSeats[i]==userid){
                SeatTo[i]=null;
                countTo++;}
            else{
                SeatTo[i]=toSeats[i];
            }
                
            }
        switch(cabin){
            case "Economy":
                setfromFlight({...fromflight,availableEconomy:fromflight.availableEconomy+countFrom,seatsEconomy:SeatFrom});
                settoFlight({...toflight,availableEconomy:toflight.availableEconomy+countTo,seatsEconomy:SeatTo});
                break;
            case "First":
                setfromFlight({...fromflight,availableFirst:fromflight.availableFirst+countFrom,seatsFirst:SeatFrom});
                settoFlight({...toflight,availableFirst:toflight.availableFirst+countTo,seatsFirst:SeatTo});
                 break;
            case "Business":
                setfromFlight({...fromflight,availableBusiness:fromflight.availableBusiness+countFrom,seatsBusiness:SeatFrom});
                settoFlight({...toflight,availableBusiness:toflight.availableBusiness+countTo,seatsBusiness:SeatTo});
                 break;
            default:
                console.log("Something went wrong");
        }
        //setSeatsTO(SeatTo);
        
      
      

  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
        .put(BACKEND_URL + 'flights/update?flightId=' +from, fromflight)
        .then(res => {
            console.log(res.data);
    axios
        .put(BACKEND_URL + 'flights/update?flightId=' + to, toflight)
        .then(res => {
            console.log(res.data);
    axios
        .delete(BACKEND_URL + "reservations/cancelReservation?_id.=" + reservationID)
        .then(res => {
        history.push("/Reserved-flights");
      })
      .catch(err => {
        console.log("Error form Cancel Resrevation");
        console.log(err);
      })
        })
        .catch(err => {
            console.log(err);
        })
        })
        .catch(err => {
            console.log(err);
        })
};
return(
    <div>
          <Button variant="outlined" onClick={onSubmit}>Cancel Reservation</Button>
        </div>
/* <div>
        <Dialog
          open={showConfirm}
          onClose={toggleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to cancel the reservation?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={toggleDialog} variant="text">back </Button>
            <Button onClick={onSubmit} variant="text" color="error">cancel Reservation</Button>
          </DialogActions>
        </Dialog>
      </div> */
)
}
export default ReservationCancel;
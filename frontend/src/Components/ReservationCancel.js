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
  const userid = props.userid;
  const toSeats = props.toSeats;
  const fromSeats = props.fromSeats;
  const cabin = props.cabin;
  const reservationID = props.reservationId;

  const fromObj = props.fromflight;
  const toObj = props.toflight;


  let f;
  let t;
  //let{id,from,to}=useParams();

  const [fromflight, setfromFlight] = useState({
    availableEconomy: '',
    availableBusiness: '',
    availableFirst: '',
    seatsBusiness: [],
    seatsEconomy: [],
    seatsFirst: []
  });

  const [toflight, settoFlight] = useState({
    availableEconomy: '',
    availableBusiness: '',
    availableFirst: '',
    seatsBusiness: [],
    seatsEconomy: [],
    seatsFirst: []
  });
  const [showConfirm, setConfirm] = useState(false);

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }

  useEffect(() => {
  }, []);



  const OnCancel = () => {
    let SeatFrom = [];
    let SeatTo = [];
    let countFrom = 0;
    let countTo = 0;

    for (let i = 0; i < fromSeats.length; i++) {
      if (fromSeats[i] == userid) {
        SeatFrom[i] = null;
        countFrom++;
      }
      else
        SeatFrom[i] = fromSeats[i];
    }

    console.log(SeatFrom);
    for (let i = 0; i < toSeats.length; i++) {
      if (toSeats[i] == userid) {
        SeatTo[i] = null;
        countTo++;
      }
      else {
        SeatTo[i] = toSeats[i];
      }
    }

    console.log(cabin);

    switch (cabin) {
      case "Economy":
        // setfromFlight({ ...fromObj, availableEconomy: fromObj?.availableEconomy + countFrom, seatsEconomy: SeatFrom });
        // settoFlight({ ...toObj, availableEconomy: toObj?.availableEconomy + countTo, seatsEconomy: SeatTo });

        f = { ...fromObj, availableEconomy: fromObj?.availableEconomy + countFrom, seatsEconomy: SeatFrom };
        t = { ...toObj, availableEconomy: toObj?.availableEconomy + countTo, seatsEconomy: SeatTo }
        break;
      case "First":
        // setfromFlight({ ...fromObj, availableFirst: fromObj?.availableFirst + countFrom, seatsFirst: SeatFrom });
        // settoFlight({ ...toObj, availableFirst: toObj?.availableFirst + countTo, seatsFirst: SeatTo });
        f = { ...fromObj, availableFirst: fromObj?.availableFirst + countFrom, seatsFirst: SeatFrom };
        t = { ...toObj, availableFirst: toObj?.availableFirst + countTo, seatsFirst: SeatTo };
        break;
      case "Business":
        // setfromFlight({ ...fromObj, availableBusiness: fromObj?.availableBusiness + countFrom, seatsBusiness: SeatFrom });
        // settoFlight({ ...toObj, availableBusiness: toObj?.availableBusiness + countTo, seatsBusiness: SeatTo });

        f = { ...fromObj, availableBusiness: fromObj?.availableBusiness + countFrom, seatsBusiness: SeatFrom };
        t = { ...toObj, availableBusiness: toObj?.availableBusiness + countTo, seatsBusiness: SeatTo };
        break;
      default:
        console.log("Something went wrong");
    }


    console.log(f);
    console.log(t);
  };


  const onSubmit = (e) => {
    OnCancel();
    props.handleSend(e);
    e.preventDefault();
    axios
      .put(BACKEND_URL + 'flights/update?flightId=' + from, f)
      .then(res => {
        console.log(res.data);
        axios
          .put(BACKEND_URL + 'flights/update?flightId=' + to, t)
          .then(res => {
            console.log(res.data);
            axios
              .delete(BACKEND_URL + "reservations/cancelReservation?_id=" + reservationID)
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
  return (
    <div>
      <Button variant="outlined" onClick={onSubmit}>Cancel Reservation</Button>
    </div>
  )
}
export default ReservationCancel;
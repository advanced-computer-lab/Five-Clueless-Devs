import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import FlightCard from './FlightCard';
import TextField from '@mui/material/TextField';
import './SearchFlightCriteria.css';
import { Button } from '@mui/material';

const ReservedFlight = () => {
    const [Reservation, setReservation] = useState();
    const [fromId, setfromId] = useState([]);
    useEffect(() => {
        getReservetion();
    }, []);
    //let { id } = useParams();


    const getReservetion = () => {
        //console.log("Print id: " + { id });
        axios.get(BACKEND_URL + "reservations/GetReservation?UserID=5")
            .then(res => {
                console.log(res.data);
                //temp=[...res.data];
                var from = [];
                res.data.map((reservation) => {
                    from.push(reservation.from);
                })
                console.log(from);
            })
            .catch(err => {
                console.log(err);
            })

            return(
                <div>
            <Button variant="outlined" onClick={getReservetion}>Search</Button>
        </div>
            )
    };
export default ReservedFlight;
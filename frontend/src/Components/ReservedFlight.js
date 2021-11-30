import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import FlightCard from './FlightCard';
import TextField from '@mui/material/TextField';
import './SearchFlightCriteria.css';
import { Button } from '@mui/material';
import ReservedFlightCard from './ReservedFlightCard';


const ReservedFlight = () => {
    const [Reservation, setReservation] = useState();
    const [fromId, setfromId] = useState([]);
    const [toId, settoId] = useState([]);
    useEffect(() => {
        getReservetion();
    }, []);
    //let { id } = useParams();

    const getReservetion = () => {
        let fromtemp = [];
        let totemp = [];

        axios.get(BACKEND_URL + "reservations/GetReservation?UserID=" + 5)
            .then(res => {
                var temp = [];
                //  console.log(res.data);
                temp = [...res.data];
                var from = [];
                res.data.map((reservation) => {
                    from.push(reservation.from);
                })
                var to = [];
                temp.map((reservation) => {
                    to.push(reservation.to);
                })
                //console.log(from);
                //console.log(to);
                for (let i = 0; i < from.length; i++) {
                    axios
                        .get(BACKEND_URL + "flights/search?flightId=" + from[i])
                        .then(res => {
                            //console.log(res.data[0]);
                            fromtemp[i] = (res.data[0]);
                           
                            let t = [...fromtemp];
                            t[i] = res.data[0]
                            setfromId(t);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    axios
                        .get(BACKEND_URL + "flights/search?flightId=" + to[i])
                        .then(res => {
                            //console.log(res.data);
                            totemp[i] = (res.data[0]);
                            let t = [...totemp];
                            t[i] = res.data[0]
                            settoId(t);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    useEffect(() => {
        // console.log(fromId.length);

    }, [fromId])


    return (
        <div>
            <div className="flight-schedule">
                <h2> Reserved Flight </h2>
                {
                    fromId.map((from, index) =>
                        <div key={index}>
                            <ReservedFlightCard from={from} to={toId[index]} />
                        </div>

                    )
                }
            </div>

        </div>
        //   <div>
        //   <Button variant="outlined" onClick={getReservetion}>Search</Button>
        // </div>
    )
};



export default ReservedFlight;
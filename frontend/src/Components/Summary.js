import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import "./Itinerary.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';

const Summary = (props) => {
    const flight = props.flight;

    // const history = useHistory();
    // const handleClick = () => {
    //     history.push(`/details/${flight.flightId}`)
    // }
    function createData(name, calories) {
        return { name, calories };
    }
    const rows = [
        createData('Flight Number', props.selectedDeptFlightId),
        createData('Departure Date and Time', props.deptFlightDeptTime + "   ,   " + props.deptFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.deptFlightArrivalTime + "  ,   " + props.deptFlightArrivalDate.substring(0, 10)),
        createData('Chosen Class', props.chosenClass),

        createData('Flight Price', props.deptFlightPrice),

    ];
    const rowsR = [
        createData('Flight Number', props.retFlightId),
        createData('Departure Date and Time', props.retFlightDeptTime + "   ,   " + props.retFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.retFlightArrivalTime + "  ,   " + props.retFlightArrivalDate.substring(0, 10)),
        createData('Chosen Class', props.chosenClass),

        createData('Flight Price', props.retFlightPrice),
    ];

    const onConfirm = (e) => {
        let numOfAdults = props.numOfAdults
        let numOfChildren = props.numOfChildren;
        let numOfSeats = numOfAdults + numOfChildren;
        let priceOfDept = props.deptFlightPrice;
        let priceOfRet  = props.retFlightPrice;
        console.log(props)
        let cabin = props.chosenClass;

        let deptFlight = props.deptFlight;
        let retFlight = props.retFlight;

        //-------------------------------
        let Uid = localStorage.getItem('userId') || 10;
        //-------------------------------

        switch (cabin) {
            case "Economy":
                deptFlight = { ...deptFlight, availableEconomy: deptFlight.availableEconomy - numOfSeats };
                retFlight = { ...retFlight, availableEconomy: retFlight.availableEconomy - numOfSeats };
                break;
            case "First":
                deptFlight = { ...deptFlight, availableFirst: deptFlight.availableEconomy - numOfSeats };
                retFlight = { ...retFlight, availableFirst: retFlight.availableEconomy - numOfSeats };
                break;
            case "Business":
                deptFlight = { ...deptFlight, availableBusiness: deptFlight.availableEconomy - numOfSeats };
                retFlight = { ...retFlight, availableBusiness: retFlight.availableEconomy - numOfSeats };
                break;
            default:
                console.log("Something went wrong");
        }


        axios
            .put(BACKEND_URL + 'flights/update?flightId=' + deptFlight?.flightId, deptFlight)
            .then(res => {
                console.log(res.data);

                axios
                    .put(BACKEND_URL + 'flights/update?flightId=' + retFlight?.flightId, retFlight)
                    .then(res => {
                        console.log(res.data);

                        const data = {
                            UserID: id,
                            from: deptFlight?.flightId,
                            to: retFlight?.flightId,
                            cabin: cabin,
                            price: priceOfDept + priceOfRet
                        }
                        axios
                            .post(BACKEND_URL + "reservations/createReservation", data)
                            .then(res => {
                                console.log("reservation")
                                console.log(res.data);
                                props.setBookingNum(res.data._id);
                                props.selectDept();
                            })
                            .catch(err => {
                                console.log("Error from Confirm Resrevation: " + err);
                            })


                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="itinerary-container">


            <div className="itinerary-card">
                <div className="head-itinerary-card">
                    <div className="icon">
                        <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                            alt="airplaneDepart"
                            width="25px"
                            height="25px" />
                    </div>
                    <div className="text-within">
                        <p>Onward trip from <span className="from-to-font">{props.deptFrom}</span> to <span className="from-to-font">{props.deptTo}</span></p>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">

                        <TableBody>

                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <span className="info-header-font"> {row.name} </span>
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* return flight UI */}
                </TableContainer>
                <div className="head-itinerary-card-return">
                    <div className="icon">
                        <div className="flip-image">
                            <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                alt="airplaneDepart"
                                width="25px"
                                height="25px" />
                        </div>
                    </div>
                    <div className="text-within">
                        <p>Return trip from <span className="from-to-font">{props.deptTo}</span> to <span className="from-to-font">{props.deptFrom}</span></p>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">

                        <TableBody>

                            {rowsR.map((rowsR) => (
                                <TableRow
                                    key={rowsR.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <span className="info-header-font"> {rowsR.name} </span>
                                    </TableCell>
                                    <TableCell align="right">{rowsR.calories}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div>Total cost: <p> <span><b>EGP</b>{props.deptFlightPrice + props.retFlightPrice}</span></p> </div>
                <p className="passenger-font">(for {props.numOfAdults + props.numOfChildren} passengers)</p>

                <button className="confirm-res" onClick={onConfirm}>Confirm Reservation</button>
            </div>

        </div>
    )
};

export default Summary;
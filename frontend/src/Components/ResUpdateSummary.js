import React, { useState, useEffect } from 'react';
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
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const ResUpdateSummary = (props) => {
    const flight = props.flight;


    useEffect(() => {
        console.log(props.retFlightOld);
        console.log(props.retFlight);
        console.log(props.deptFlight);
        console.log(props.numOfAdults);
        console.log(props.numOfChildren);
        console.log(props.reservationId);
    })

    const history = useHistory();
    // const handleClick = () => {
    //     history.push(`/details/${flight.flightId}`)
    // }
    function createData(name, calories) {
        return { name, calories };
    }

    const [showConfirm, setConfirm] = useState(false);

    const toggleDialog = () => {
        setConfirm(!showConfirm);
    }
    const rows = [
        createData('Flight Number', props.selectedDeptFlightId),
        createData('Departure Date and Time', props.deptFlightDeptTime + "   ,   " + props.deptFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.deptFlightArrivalTime + "  ,   " + props.deptFlightArrivalDate.substring(0, 10)),
        createData('Chosen Class', props.chosenClass),



    ];

    const rowsR = [
        createData('Flight Number', props.retFlightId),
        createData('Departure Date and Time', props.retFlightDeptTime + "   ,   " + props.retFlightDeptDate.substring(0, 10)),
        createData('Arrival Date and Time', props.retFlightArrivalTime + "  ,   " + props.retFlightArrivalDate.substring(0, 10)),
        createData('Chosen Class', props.chosenClass),


    ];
    if (props.deptFlightPrice >= 0) {
        rows.push(createData('Additional Fee', props.deptFlightPrice))
    }
    else {
        rows.push(createData('Amount to be refunded', Math.abs(props.deptFlightPrice)))
    }
    if (props.retFlightPrice >= 0) {
        rowsR.push(createData('Additional Fee', props.retFlightPrice))
    }
    else {
        rowsR.push(createData('Amount to be refunded', Math.abs(props.retFlightPrice)))
    }

    let userId = JSON.parse(localStorage.getItem('user'))?._id;

    const clickConfirm = () => {
        if (userId) {
            toggleDialog();
        } else {
            history.push('/login');
        }
    }



    const onConfirm = (e) => {
        let numOfAdults = props.numOfAdults
        let numOfChildren = props.numOfChildren;
        let numOfSeats = numOfAdults * 1 + numOfChildren * 1;

       numOfSeats = props.seatCount;

        let priceOfDept = props.deptFlightPriceReal;
        let priceOfRet = props.retFlightPriceReal;
        console.log(props)
        let cabin = props.chosenClass;
        let reservationId = props.reservationId
        let deptFlight = props.deptFlight;
        let deptFlightOld = props.deptFlightOld;
        let retFlight = props.retFlight;
        let retFlightOld = props.retFlightOld;



        //-------------------------------

        //-------------------------------

        switch (cabin) {
            case "Economy":
                console.log(numOfSeats + " updatett here")
                console.log(deptFlight)

                if (window.location.href.includes("Dept")) {
                    let deptSeatsOld = deptFlightOld.seatsEconomy;
                    deptSeatsOld = deptSeatsOld.map((s) => (s == userId) ? null : s)
                    deptFlight = { ...deptFlight, availableEconomy: deptFlight.availableEconomy - numOfSeats };
                    deptFlightOld = { ...deptFlightOld, availableEconomy: deptFlightOld.availableEconomy + numOfSeats, seatsEconomy: deptSeatsOld };
                }
                else if (window.location.href.includes("Ret")) {
                    let retSeatsOld = retFlightOld.seatsEconomy;
                    retSeatsOld = retSeatsOld.map((s) => (s == userId) ? null : s)
                    retFlight = { ...retFlight, availableEconomy: retFlight.availableEconomy - numOfSeats };
                    retFlightOld = { ...retFlightOld, availableEconomy: retFlightOld.availableEconomy + numOfSeats, seatsEconomy: retSeatsOld };
                }
                break;
            case "First":
                if (window.location.href.includes("Dept")) {
                    let deptSeatsOld = deptFlightOld.seatsFirst;
                    deptSeatsOld = deptSeatsOld.map((s) => (s == userId) ? null : s)
                    deptFlight = { ...deptFlight, availableFirst: deptFlight.availableFirst - numOfSeats};
                    deptFlightOld = { ...deptFlightOld, availableFirst: deptFlightOld.availableFirst + numOfSeats, seatsFirst: deptSeatsOld  };
                }
                else if (window.location.href.includes("Ret")) {
                    let retSeatsOld = retFlightOld.seatsFirst;
                    retSeatsOld = retSeatsOld.map((s) => (s == userId) ? null : s)
                    retFlight = { ...retFlight, availableFirst: retFlight.availableFirst - numOfSeats };
                    retFlightOld = { ...retFlightOld, availableFirst: retFlightOld.availableFirst + numOfSeats, seatsFirst: retSeatsOld };
                }
                break;
            case "Business":
                if (window.location.href.includes("Dept")) {
                    let deptSeatsOld = deptFlightOld.seatsBusiness;
                    deptSeatsOld = deptSeatsOld.map((s) => (s == userId) ? null : s)
                    deptFlight = { ...deptFlight, availableBusiness: deptFlight.availableBusiness - numOfSeats };
                    deptFlightOld = { ...deptFlightOld, availableBusiness: deptFlightOld.availableBusiness + numOfSeats, seatsBusiness: deptSeatsOld  };
                }
                else if (window.location.href.includes("Ret")) {
                    let retSeatsOld = retFlightOld.seatsBusiness;
                    retSeatsOld = retSeatsOld.map((s) => (s == userId) ? null : s)
                    retFlight = { ...retFlight, availableBusiness: retFlight.availableBusiness - numOfSeats };
                    retFlightOld = { ...retFlightOld, availableBusiness: retFlightOld.availableBusiness + numOfSeats, seatsBusiness: retSeatsOld };
                }
                break;
            default:
                console.log("Something went wrong");
        }



        if (window.location.href.includes("Ret")) {
            axios
                .put(BACKEND_URL + 'flights/update?flightId=' + retFlight?.flightId, retFlight)
                .then(res => {
                    console.log(res.data);

                    axios
                        .put(BACKEND_URL + 'flights/update?flightId=' + retFlightOld?.flightId, retFlightOld)
                        .then(res => {
                            console.log(res.data);

                            const data = {

                                to: retFlight?.flightId,
                                cabin: cabin,
                                price: priceOfDept + priceOfRet
                            }
                            axios
                                .put(BACKEND_URL + "reservations/update?_id=" + reservationId, data)
                                .then(res => {
                                    console.log("reservation")
                                    console.log(res.data);
                                    props.setBookingNum(res.data._id);
                                    props.selectDept();
                                })
                                .catch(err => {
                                    console.log("Error updating reservation: " + err);
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
        else if (window.location.href.includes("Dept")) {
            axios
                .put(BACKEND_URL + 'flights/update?flightId=' + deptFlight?.flightId, deptFlight)
                .then(res => {
                    console.log(res.data);

                    axios
                        .put(BACKEND_URL + 'flights/update?flightId=' + deptFlightOld?.flightId, deptFlightOld)
                        .then(res => {
                            console.log(res.data);

                            const data = {

                                from: deptFlight?.flightId,
                                cabin: cabin,
                                price: priceOfDept + priceOfRet
                            }
                            axios
                                .put(BACKEND_URL + "reservations/update?_id=" + reservationId, data)
                                .then(res => {
                                    console.log("reservation")
                                    console.log(res.data);
                                    props.setBookingNum(res.data._id);
                                    props.selectDept();
                                })
                                .catch(err => {
                                    console.log("Error updating reservation: " + err);
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

                {(props.deptFlightPrice + props.retFlightPrice) >= 0 ? <div>Additional Fee: <p style={{ color: "red" }}> <span><b style={{ color: "black" }}>EGP</b>{props.deptFlightPrice + props.retFlightPrice}</span></p> </div> :
                    <div>Amount to be refunded: <p style={{ color: "green" }}> <span><b style={{ color: "black" }}>EGP</b>{Math.abs(props.deptFlightPrice + props.retFlightPrice)}</span></p> </div>}
                <p className="passenger-font">(for {props.numOfAdults + props.numOfChildren} passengers)</p>

                <button className="confirm-res" onClick={clickConfirm}>Confirm Reservation</button>

                <div>
                    <Dialog
                        open={showConfirm}
                        onClose={toggleDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to confirm the reservation?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={toggleDialog} variant="text">back </Button>
                            <Button onClick={onConfirm} variant="text" color="success">Confirm Reservation</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>

        </div>
    )
};

export default ResUpdateSummary;
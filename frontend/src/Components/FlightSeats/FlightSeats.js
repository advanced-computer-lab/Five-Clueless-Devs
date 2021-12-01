import { Button, IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BACKEND_URL } from "../../API/URLS";
import Seats from "../SeatMap/Seats";
import './DepartureSeats.css';
import moment from 'moment';
import ArrowBack from '@mui/icons-material/ArrowBack';


const FlightSeats = ({ from, to, maxSeats, setView }) => {

    const history = useHistory();

    const [type, setType] = useState("Departure");
    const [errMsg, setErrMsg] = useState("");

    //must get it from the previous step
    //const maxSeats = 3;
    const userId = 20;
    const flightId = 2;
    const flightId1 = 79;
    const cabin = 'economy';
    //-----------------------------------


    const [flight, setFlight] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]); // [{number:A3, id:2}...]

    const [seats, setSeats] = useState([]);
    // const [seats, setSeats] = useState([123, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 111,
    //     123, null, null, 123, null, null, "hell", 123, null, null, 123, null, null, null, null, null]);


    useEffect(() => {
        console.log("Print id: " + flightId);
        setFlight(from);
        // axios
        //     .get(BACKEND_URL + "flights/search?flightId=" + flightId)
        //     .then(res => {
        //         console.log(res.data);
        //         setFlight(res.data[0] || {});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }, []);

    useEffect(() => {
        console.log("Print id: " + flightId);
        if (type === 'Departure') {
            setFlight(from);
            // axios
            //     .get(BACKEND_URL + "flights/search?flightId=" + flightId)
            //     .then(res => {
            //         console.log(res.data);
            //         setFlight(res.data[0] || {});
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
        }
        if (type === 'Arrival') {
            setFlight(to);
            // axios
            //     .get(BACKEND_URL + "flights/search?flightId=" + flightId1)
            //     .then(res => {
            //         console.log(res.data);
            //         setFlight(res.data[0] || {});
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
        }

    }, [type]);


    useEffect(() => {
        if (cabin === 'economy' && flight?.seatsEconomy) {
            setSeats(flight?.seatsEconomy)
        }
        else if (cabin === 'business' && flight?.seatsBusiness) {
            setSeats(flight?.seatsBusiness);
        }
        else if (cabin === 'first' && flight?.seatsFirst) {
            setSeats(flight?.seatsFirst);
        }

        console.log(seats);
    }, [flight?.flightId])

    const removeSeat = (id) => {
        let tmpSeats = [...seats];
        tmpSeats[id] = null;
        setSeats(tmpSeats);
    }

    const onSubmit = (e) => {
        if (selectedSeats.length < maxSeats) {
            setErrMsg(`You must select ${maxSeats} seats`)
        } else {

            e.preventDefault();
            setErrMsg('');
            let tmpSeats = [...seats];
            let tmpFlight = { ...flight };

            selectedSeats.forEach((seat) => {
                if (!tmpSeats[seat.id] || tmpSeats[seat.id] === 'null' || tmpSeats[seat.id] == userId) {
                    tmpSeats[seat.id] = userId;
                } else {
                    console.log("error");
                    return;
                }
            })
            setSeats(tmpSeats);
            let freeSeats = seats.filter((s) => s === null || s === "null");
            let remSeats = freeSeats.length;

            if (cabin === 'economy') {
                setFlight({ ...flight, availableEconomy: remSeats, seatsEconomy: tmpSeats });
                tmpFlight = { ...tmpFlight, seatsEconomy: tmpSeats }
            }
            else if (cabin === 'business') {
                setFlight({ ...flight, availableBusiness: remSeats, seatsBusiness: tmpSeats });
                tmpFlight = { ...tmpFlight, seatsBusiness: tmpSeats }
            }
            else if (cabin === 'first') {
                setFlight({ ...flight, availableSeats: remSeats, seatsFirst: tmpSeats });
                tmpFlight = { ...tmpFlight, seatsFirst: tmpSeats }
            }

            let id = flight?.flightId;
            // if (type === 'Arrival') {
            //     id = flightId1;
            // }
            axios
                .put(BACKEND_URL + 'flights/update?flightId=' + id, tmpFlight)
                .then(res => {
                    console.log(res.data);
                    if (type === 'Arrival') {
                        setView(4);
                    }
                })
                .catch(err => {
                    console.log(err);
                })


            if (type == 'Departure') {
                setSeats([]);
                setType('Arrival');
            }
        }

    };

    const getDuration = () => {
        let depDate = moment(flight?.departureDate?.substring(0, 10) + "T" + flight?.departureTime + ":00");
        let arrDate = moment(flight?.arrivalDate?.substring(0, 10) + "T" + flight?.arrivalTime + ":00");
        let durationInMins = arrDate.diff(depDate, 'minutes');
        let durHours = Math.floor(durationInMins / 60);
        durationInMins = durationInMins - 60 * durHours;
        return `${durHours} hours and ${durationInMins} minutes`;
    }


    const goBack = () => {

        if (type === "Departure") {
            setView(2);
        }
        else {
            setSeats([]);
            setType('Departure');
        }
    }

    return (
        <div>

            <div className="dep-cont">

                <IconButton onClick={goBack} style={{ marginBottom: 'auto' }}>
                    <ArrowBack />
                </IconButton>

                <div className="dep-summary">
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan="2">
                                    <Typography variant="h4" component="h4">
                                        {type} Flight Summary
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Flight Number</TableCell>
                                <TableCell>{flight?.flightId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Origin Country</TableCell>
                                <TableCell>{flight?.from}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Destination</TableCell>
                                <TableCell>{flight?.to}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Departure Date</TableCell>
                                <TableCell>{flight?.departureDate?.substring(0, 10)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Arrival Date</TableCell>
                                <TableCell>{flight?.arrivalDate?.substring(0, 10)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Departure Time</TableCell>
                                <TableCell>{flight?.departureTime}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Arrival Time</TableCell>
                                <TableCell>{flight?.arrivalTime}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Arrival Time</TableCell>
                                <TableCell>{flight?.arrivalTime}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Duration</TableCell>
                                <TableCell>{getDuration()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Cabin Class</TableCell>
                                <TableCell>{'Economy'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Baggage Allowance</TableCell>
                                <TableCell>{'One 23kg Bag'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Price</TableCell>
                                <TableCell>{'10000 EGP'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Max Number Of Seats</TableCell>
                                <TableCell>{maxSeats}</TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>
                </div>

                <div className="dep-seats">
                    <Seats
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        seats={seats}
                        maxSeats={maxSeats}
                        userId={userId}
                        removeSeat={removeSeat}
                    />
                    <Typography style={{ fontStyle: 'italic', maxWidth: '240px' }}> {`Selected Seats: `}
                        {
                            selectedSeats.map((s) => s.number).join(", ")
                        }
                    </Typography>
                </div>

            </div>


            <Button variant="outlined" type="submit" onClick={onSubmit}>
                Confirm {type} Seats
            </Button>
            <Typography style={{ color: '#ff3333' }}>
                {errMsg}
            </Typography>

        </div>
    );
}

export default FlightSeats;
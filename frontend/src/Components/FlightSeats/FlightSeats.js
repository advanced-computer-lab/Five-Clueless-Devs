import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BACKEND_URL } from "../../API/URLS";
import Seats from "../SeatMap/Seats";
import './DepartureSeats.css';
import moment from 'moment';
import ArrowBack from '@mui/icons-material/ArrowBack';
import UIButton from "../UIButton/UIButton";


const FlightSeats = ({ from, to, maxSeats, setView, cabin, setFrom, setTo, setDeptSeats, setRetSeats }) => {

    const history = useHistory();

    const [type, setType] = useState("Departure");
    const [errMsg, setErrMsg] = useState("");

    //must get it from the previous step
    let userId = JSON.parse(localStorage.getItem('user'))?._id;

    //-----------------------------------


    const [flight, setFlight] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]); // [{number:A3, id:2}...]

    const [seats, setSeats] = useState([]);
    // const [seats, setSeats] = useState([123, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 111,
    //     123, null, null, 123, null, null, "hell", 123, null, null, 123, null, null, null, null, null]);


    useEffect(() => {
        console.log("Print id: " + flight?.flightId);
        setFlight(from);
    }, []);

    useEffect(() => {
        console.log("Print id: " + flight?.flightId);
        if (type === 'Departure') {
            setFlight(from);
        }
        if (type === 'Arrival') {
            setFlight(to);
        }

    }, [type]);


    useEffect(() => {
        if (cabin === 'Economy' && flight?.seatsEconomy) {
            setSeats(flight?.seatsEconomy)
        }
        else if (cabin === 'Business' && flight?.seatsBusiness) {
            setSeats(flight?.seatsBusiness);
        }
        else if (cabin === 'First' && flight?.seatsFirst) {
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
        e.preventDefault();
        if (selectedSeats.length < maxSeats) {
            setErrMsg(`You must select ${maxSeats} seats`)
        } else {
            setErrMsg('');
            let tmpSeats = [...seats];
            let tmpFlight = {};

            if (type === 'Departure') {
                tmpFlight = { ...from };
            }
            if (type === 'Arrival') {
                tmpFlight = { ...to };
            }

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

            if (cabin === 'Economy') {
                setFlight({ ...tmpFlight, seatsEconomy: tmpSeats, availableEconomy: tmpFlight.availableEconomy - selectedSeats.length });
                tmpFlight = { ...tmpFlight, seatsEconomy: tmpSeats, availableEconomy: tmpFlight.availableEconomy - selectedSeats.length }
            }
            else if (cabin === 'Business') {
                setFlight({ ...tmpFlight, seatsBusiness: tmpSeats, availableBusiness: tmpFlight.availableBusiness - selectedSeats.length });
                tmpFlight = { ...tmpFlight, seatsBusiness: tmpSeats, availableBusiness: tmpFlight.availableBusiness - selectedSeats.length }
            }
            else if (cabin === 'First') {
                setFlight({ ...tmpFlight, seatsFirst: tmpSeats, availableFirst: tmpFlight.availableFirst - selectedSeats.length });
                tmpFlight = { ...tmpFlight, seatsFirst: tmpSeats, availableFirst: tmpFlight.availableFirst - selectedSeats.length }
            }

            let id = flight?.flightId;
            axios
                .put(BACKEND_URL + 'flights/update?flightId=' + id, tmpFlight,{
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res.data);
                    if (type === 'Arrival') {
                        setView(5);
                        setTo(tmpFlight);
                        setRetSeats(selectedSeats)
                    } else {
                        setFrom(tmpFlight);
                        setDeptSeats(selectedSeats);
                        setSeats([]);
                        setSelectedSeats([]);
                        setType('Arrival');
                    }
                })
                .catch(err => {
                    console.log(err);
                })

            // if (type == 'Departure') {

            // } else if (type === "Arrival") {

            // }
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

    const getBaggage = () => {
        if (type == "Departure") {
            return from?.baggageAllowance;
        } else {
            return to?.baggageAllowance;
        }
    }


    const goBack = () => {
        setSeats([]);
        setSelectedSeats([]);
        setType('Departure');
    }

    return (
        <div>

            <div className="dep-cont">
                {type === 'Arrival' ? <IconButton onClick={goBack} style={{ marginBottom: 'auto' }}>
                    <ArrowBack />
                </IconButton> : null
                }
                <div className="dep-flex-cont">
                    <div className="dep-summary">
                        <TableContainer component={Paper}>
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
                                        <TableCell className="dep-table-header">Flight Number</TableCell>
                                        <TableCell className="dep-table-content">{flight?.flightId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Origin Country</TableCell>
                                        <TableCell className="dep-table-content">{flight?.from}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Destination</TableCell>
                                        <TableCell className="dep-table-content">{flight?.to}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Departure Date</TableCell>
                                        <TableCell className="dep-table-content">{flight?.departureDate?.substring(0, 10)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Departure Time</TableCell>
                                        <TableCell className="dep-table-content">{flight?.departureTime}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Arrival Date</TableCell>
                                        <TableCell className="dep-table-content">{flight?.arrivalDate?.substring(0, 10)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Arrival Time</TableCell>
                                        <TableCell className="dep-table-content">{flight?.arrivalTime}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Duration</TableCell>
                                        <TableCell className="dep-table-content">{getDuration()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Cabin Class</TableCell>
                                        <TableCell className="dep-table-content">{cabin}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Baggage Allowance</TableCell>
                                        <TableCell className="dep-table-content">{getBaggage()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="dep-table-header">Max Number Of Seats</TableCell>
                                        <TableCell className="dep-table-content">{maxSeats}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
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
            </div>


            {/* <Button variant="outlined" type="submit" onClick={onSubmit}>{`Confirm ${type} Seats`}</Button> */}

            <UIButton
                onClick={onSubmit}
                type={'submit'}
                text={`Confirm ${type} Seats`}
                margin="10px"
            />
            <Typography style={{ color: '#ff3333' }}>
                {errMsg}
            </Typography>

        </div>
    );
}

export default FlightSeats;
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BACKEND_URL } from "../../API/URLS";
import Seats from "../SeatMap/Seats";
import './DepartureSeats.css';

const FlightSeats = () => {
    const history = useHistory();

    const [type, setType] = useState("departure");

    //must get it from the previous step
    const maxSeats = 10;
    const userId = 11;
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
        axios
            .get(BACKEND_URL + "flights/search?flightId=" + flightId)
            .then(res => {
                console.log(res.data);
                setFlight(res.data[0] || {});
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        console.log("Print id: " + flightId);
        if (type === 'departure') {
            axios
                .get(BACKEND_URL + "flights/search?flightId=" + flightId)
                .then(res => {
                    console.log(res.data);
                    setFlight(res.data[0] || {});
                })
                .catch(err => {
                    console.log(err);
                })
        }
        if (type === 'arrival') {
            axios
                .get(BACKEND_URL + "flights/search?flightId=" + flightId1)
                .then(res => {
                    console.log(res.data);
                    setFlight(res.data[0] || {});
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [type]);


    useEffect(() => {
        if (cabin === 'economy' && flight.seatsEconomy) {
            setSeats(flight.seatsEconomy)
        }
        else if (cabin === 'business' && flight.seatsBusiness) {
            setSeats(flight.seatsBusiness);
        }
        else if (cabin === 'first' && flight.seatsFirst) {
            setSeats(flight.seatsFirst);
        }

        console.log(seats);
    }, [flight.flightId])

    const removeSeat = (id) => {
        let tmpSeats = [...seats];
        tmpSeats[id] = null;
        setSeats(tmpSeats);
    }

    const onSubmit = (e) => {

        e.preventDefault();
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
        if (cabin === 'economy') {
            setFlight({ ...flight, seatsEconomy: tmpSeats });
            tmpFlight = { ...tmpFlight, seatsEconomy: tmpSeats }
        }
        else if (cabin === 'business') {
            setFlight({ ...flight, seatsBusiness: tmpSeats });
            tmpFlight = { ...tmpFlight, seatsBusiness: tmpSeats }
        }
        else if (cabin === 'first') {
            setFlight({ ...flight, seatsFirst: tmpSeats });
            tmpFlight = { ...tmpFlight, seatsFirst: tmpSeats }
        }

        let id = flightId;
        if (type === 'arrival') {
            id = flightId1;
        }
        axios
            .put(BACKEND_URL + 'flights/update?flightId=' + id, tmpFlight)
            .then(res => {
                console.log(res.data);
                if (type === 'arrival') {
                    history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            })


        if (type == 'departure') {
            setSeats([]);
            setType('arrival');
        }


    };



    return (
        <div>
            <div className="dep-cont">

                <div className="dep-summary">

                    <h1> {type} Flight Summary</h1>
                    <p>Flight Number: {flight.flightId}</p>
                    <p>From: {flight.from} To: {flight.to}</p>
                    <p>Departure: {flight.departureDate} , Arrival: </p>
                    <p>Duration: </p>
                    <p>Cabin Class: Economy</p>
                    <p>Baggage Allowance: 1 23kg bag</p>
                    <p>Price: 10000 EGP</p>
                    <p>Max Number of Seats: {maxSeats}</p>
                    <p><em> Selected Seats:
                        {
                            selectedSeats.map((s) => s.number).join(", ")
                        }
                    </em>
                    </p>
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
                </div>

            </div>

            <Button variant="outlined" type="submit" onClick={onSubmit}>
                Confirm Seats
            </Button>
        </div>
    );
}

export default FlightSeats;
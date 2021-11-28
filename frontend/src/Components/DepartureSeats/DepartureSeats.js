import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../API/URLS";
import Seats from "../SeatMap/Seats";
import './DepartureSeats.css';

const DepartureSeats = () => {

    const [flight, setFlight] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]); // [{number:A3, id:2}...]
    const maxSeats = 3;
    const id = 1;

    const seats = [123, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 111,
        123, null, null, 123, null, null, "hell", 123, null, null, 123, null, null, null, null, null];


    useEffect(() => {
        console.log("Print id: " + { id });
        axios
            .get(BACKEND_URL + "flights/search?flightId=" + id)
            .then(res => {
                console.log(res.data);
                setFlight(res.data[0] || {});
            })
            .catch(err => {
                console.log(err);
            })
    }
        , []);

    return (
        <div>
            <div className="dep-cont">

                <div className="dep-summary">

                    <h1> Departure Flight Summary</h1>
                    <p>Flight Number: 1</p>
                    <p>From: CAI To: RIY</p>
                    <p>Departure: , Arrival: </p>
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
                    />
                </div>

            </div>

            <Button variant="outlined" type="submit">
                Confirm Seats
            </Button>
        </div>
    );
}

export default DepartureSeats;
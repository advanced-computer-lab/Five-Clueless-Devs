import { Button } from "@mui/material";
import { useState } from "react";
import Seats from "../SeatMap/Seats";
import './DepartureSeats.css';

const DepartureSeats = () => {

    const [selectedSeats, setSelectedSeats] = useState([]);
    const maxSeats = 3;

    const seats = [123, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 111,
        123, null, null, 123, null, null, "hell", 123, null, null, 123, null, null, null, null, null];

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
                            ` ${selectedSeats.join(', ')}`
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
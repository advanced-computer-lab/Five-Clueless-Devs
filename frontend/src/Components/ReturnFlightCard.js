import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import "./DepartureFlightCard.css";

const FlightCard = (props) => {
    const flight = props.flight;

    const history = useHistory();
    const handleClick = () => {
        props.data();
        props.passRetId(flight.flightId);
        props.passRetFrom(flight.from);
        props.passRetTo(flight.to);
        props.passRetDuration(flight.duration);
        console.log(flight.flightId);
        console.log(flight.from); 
    }
    const checkTotal = () => {
        if (props.chosenClass == "Economy") {
            return flight.price * props.numOfAdults + flight.price * props.numOfChildren * 0.7
        }
        else if (props.chosenClass == "Business") {
            return 1.2*(flight.price * props.numOfAdults + flight.price * props.numOfChildren * 0.7)
        }
        else if (props.chosenClass == "First") {
            return 1.4*(flight.price * props.numOfAdults + flight.price * props.numOfChildren * 0.7)
        }
    }

    return (
        <div className="card-container">
            {/* <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fetraveltech.com%2Fwp-content%2Fuploads%2F2021%2F09%2FMW-HE536_airpla_20190225131547_ZH.jpg&imgrefurl=https%3A%2F%2Fetraveltech.com%2Fcheap-flights-cairo-from-to-hurghada%2F&tbnid=-LhKiDUJLgmoMM&vet=12ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ..i&docid=0R9RSPJABoN1lM&w=890&h=501&q=flight&ved=2ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ" alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/details/${flight.flightId}`}>
                        {flight.flightId}
                    </Link>
                </h2>
                <h3>{flight.from}</h3>
                <p>{flight.to}</p>
            </div> */}

            <div className="flight-card" >
                <div className="flight-card-left">
                    <div className="head-card-return">
                        <p className="flight-card-head-type">Return</p>
                        <div className="flip-image">
                            <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                                alt="airplaneDepart"
                                width="27px"
                                height="27px"
                            />
                        </div>
                    </div>
                    <p className="flight-card-airport">{flight?.from}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${flight.departureDate.substring(0, 10)}  ${flight.departureTime}`}</p>
                    {/* <p className="flight-card-date">{}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{flight.departureTerminal}</p>
                </div>

                <div className="">
                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>

                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Generic_turbofan_airplane.svg"
                        alt="airplane"
                        width="80px"
                        height="40px"
                    />
                    <p className="flight-card-head">flight number</p>
                    <p className="flight-card-date">{flight.flightId}</p>
                    <div className="middle-duration">
                        <img src="https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/000000/external-flight-meeting-photo3ideastudio-lineal-photo3ideastudio.png"
                            alt="airplaneDuration"
                            width="40px"
                            height="40px" />

                        <p className="flight-card-duration">Duration {flight.duration} </p>

                    </div>
                    
                </div>

                <div className="flight-card-right">
                    <p className="flight-card-head"></p>
                    <p className="flight-card-head"></p>
                    <p className="flight-card-airport">{flight?.to}</p>
                    <p className="flight-card-head">date</p>
                    <p className="flight-card-date">{`${flight.arrivalDate.substring(0, 10)}  ${flight.arrivalTime}`}</p>
                    {/* <p className="flight-card-date">{flight.arrivalTime}</p> */}
                    <p className="flight-card-head">terminal</p>
                    <p className="flight-card-terminal">{flight.arrivalTerminal}</p>

                </div>
                <div className="flight-card-right-buttons">
                    <button className="buttonClass" type="button" onClick={handleClick}>Select</button>
                    <p className="view-detail" onClick={handleClick}>View Details</p>
                    <div className="middle-price">
                    <p> <span><b>EGP</b>{checkTotal()}</span></p>
                 
                    </div>
                    <p className="passenger-font" onClick={handleClick}>(for {props.numOfAdults + props.numOfChildren} passengers)</p>
                </div>
            </div>

        </div>
    )
};

export default FlightCard;
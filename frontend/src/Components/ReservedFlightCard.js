import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import "./FlightCard.css";

const ReservedFlightCard = (props) => {
    const fromflight = props.from;
    const toflight = props.to;
    const history = useHistory();
    const handleClick = () => {
        history.push(`/summary/${fromflight.flightId}/${toflight.flightId}`)
       console.log("entered");
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

            <div className="flight-card" onClick={handleClick}>
                <div className="flight-card-left">
                    <p className="flight-card-head">departure flight</p>
                    <p className="flight-card-airport">{fromflight?.from}</p>
                    <p className="flight-card-airport">{fromflight?.to}</p>
                    <p className="flight-card-head"> departure date</p>
                    <p className="flight-card-date">{`${fromflight?.departureDate?.substring(0, 10)}  ${fromflight?.departureTime}`}</p>
                    <p className="flight-card-head"> arrival date</p>
                    <p className="flight-card-date">{`${fromflight?.arrivalDate?.substring(0, 10)}  ${fromflight?.arrivalTime}`}</p>
                    {/* <p className="flight-card-date">{}</p> */}
                    <p className="flight-card-head">departure terminal</p>
                    <p className="flight-card-terminal">{fromflight?.departureTerminal}</p>
                    <p className="flight-card-head">arrival terminal</p>
                    <p className="flight-card-terminal">{fromflight?.arrivalTerminal}</p>
                </div>

                <div className="">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Generic_turbofan_airplane.svg"
                        alt="airplane"
                        width="80px"
                        height="40px"
                    />
                     <p className="flight-card-head">departure flight number</p>
                    <p className="flight-card-date">{fromflight?.flightId}</p>
                    <p className="flight-card-head">return flight number</p>
                    <p className="flight-card-date">{toflight?.flightId}</p>
                </div>

                <div className="flight-card-right">
                    <p className="flight-card-head">return flight</p>
                    <p className="flight-card-airport">{toflight?.from}</p>
                    <p className="flight-card-airport">{toflight?.to}</p>
                    <p className="flight-card-head"> departure date</p>
                    <p className="flight-card-date">{`${toflight?.departureDate?.substring(0, 10)}  ${toflight?.departureTime}`}</p>
                    <p className="flight-card-head">arrival date</p>
                    <p className="flight-card-date">{`${toflight?.arrivalDate?.substring(0, 10)}  ${toflight?.arrivalTime}`}</p>
                    {/* <p className="flight-card-date">{flight.arrivalTime}</p> */}
                    <p className="flight-card-head">departure terminal</p>
                    <p className="flight-card-terminal">{toflight?.departureTerminal}</p>
                    <p className="flight-card-head">arrival terminal</p>
                    <p className="flight-card-terminal">{toflight?.arrivalTerminal}</p>


                </div>
            </div>

        </div>
    )
};

export default ReservedFlightCard;
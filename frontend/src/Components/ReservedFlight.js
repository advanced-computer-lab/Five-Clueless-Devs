import axios from 'axios';
import { response } from 'express';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Reservations from '../../../backend/model/Reservations';
import { BACKEND_URL } from '../API/URLS';
import '../App.css';
import "./FlightCard.css";

const ReservedFlight = () => {
    const [Reservation, setReservation] = useState();

    useEffect(() => {
        getReservetion();
    }, []);
    let { id } = useParams();


    const getReservetion = () => {
        console.log("Print id: " + { id });
        axios.get(BACKEND_URL + "reservations/GetFlight?UserID=" + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    
    }
   
    

    return (
       /** */ <div className="card-container">
            {/* <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fetraveltech.com%2Fwp-content%2Fuploads%2F2021%2F09%2FMW-HE536_airpla_20190225131547_ZH.jpg&imgrefurl=https%3A%2F%2Fetraveltech.com%2Fcheap-flights-cairo-from-to-hurghada%2F&tbnid=-LhKiDUJLgmoMM&vet=12ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ..i&docid=0R9RSPJABoN1lM&w=890&h=501&q=flight&ved=2ahUKEwjz18q7vf_zAhXiMewKHadADmkQMygDegUIARDNAQ" alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/details/${flight.flightId}`}>
                        {flight.flightId}
                    </Link>
                </h2>
                <h3>{flight.from}</h3>
                <p>{flight.to}</p>
            </div> */

        </div>
    )
};



export default ReservedFlight;
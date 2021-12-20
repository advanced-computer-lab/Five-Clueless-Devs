import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ReservationCancel from './ReservationCancel';
import './ViewSummary.css';
import './Itinerary.css';


const ViewSummary = () => {

  //let seatCount = 0;
  const [seatCount, setSeatCount] = useState(0);
  let Uid = JSON.parse(localStorage.getItem('user'))?._id;

  let currEmail = "";
  let text2="";
  const [sent, setSent] = useState(false)
  const [text, setText] = useState("")
  const [email, setEmail] = useState("")

  const handleSend = async (e) => {
    text2="Refunded : "+reservation?.price;
    console.log(text2);
    setSent(true)
    try {

      console.log(email);
      //  BACKEND_URL + "users/search?userId=" + id)
      await axios.post(BACKEND_URL + "users/send_mail?userId=" + Uid, {
        text2, to: email
      })
    } catch (error) {

      console.error(error)
    }
  }

  const history = useHistory();
  const [fromflight, setfromFlight] = useState({
    flightId: '',
    from: '',
    to: '',
    departureDate: '',
    arrivalDate: '',
    departureTime: '',
    arrivalTime: '',
    arrivalTerminal: '',
    departureTerminal: ''
  });
  const [toflight, settoFlight] = useState({
    flightId: '',
    from: '',
    to: '',
    departureDate: '',
    arrivalDate: '',
    departureTime: '',
    arrivalTime: '',
    arrivalTerminal: '',
    departureTerminal: ''
  });
  const [reservation, setReservation] = useState();
  const [seatsFrom, setSeatsFrom] = useState();
  const [seatsTO, setSeatsTO] = useState();
  const [bookingId, setBookingId] = useState("");
  const [fromSeatsArray, setFromSeatsArray] = useState([]);
  const [toSeatsArray, setToSeatsArray] = useState([]);

  // let { idfrom, idto } = useParams();
  let { reservationId } = useParams();
  useEffect(() => {
    getSummary();

    axios
      .get(BACKEND_URL + "users/search?userId=" + Uid)
      .then(res => {
        console.log(res.data);
        setEmail(res.data[0].email);
        console.log(currEmail);


      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const toCancel = () => {
    console.log("cancel");

    handleSend();
  }

  const getSummary = () => {
    //console.log("Print id: " + { id });
    var tempFromEconomy = [];
    var tempFromFirst = [];
    var tempFromBusiness = [];
    var temptoEconomy = [];
    var temptoFirst = [];
    var temptoBusiness = [];



    // console.log(tempFromEconomy);
    // axios.get(BACKEND_URL + "reservations/GetReservation?UserID=" + Uid + "&from=" + idfrom + "&to=" + idto)
    axios.get(BACKEND_URL + "reservations/GetReservation?_id=" + reservationId)
      .then(res => {
        setReservation(res.data[0]);
        setBookingId(reservationId.toUpperCase());

        var temp1 = [];
        var temp2 = [];
        console.log(res.data[0]._id);
        // switch (res.data[0].cabin) {
        //   case "Economy":
        //     temp1 = tempFromEconomy;
        //     temp2 = temptoEconomy;
        //     break;
        //   case "First":
        //     temp1 = tempFromFirst;
        //     temp2 = temptoFirst;
        //     break;
        //   case "Business":
        //     temp1 = tempFromBusiness;
        //     temp2 = temptoBusiness;
        // }



        axios
          .get(BACKEND_URL + "flights/search?flightId=" + res.data[0].from)
          .then(resFrom => {
            tempFromEconomy = [...resFrom.data[0].seatsEconomy];
            tempFromFirst = [...resFrom.data[0].seatsFirst];
            tempFromBusiness = [...resFrom.data[0].seatsBusiness];

            switch (res.data[0].cabin) {
              case "Economy":
                temp1 = tempFromEconomy;
                break;
              case "First":
                temp1 = tempFromFirst;
                break;
              case "Business":
                temp1 = tempFromBusiness;
            }

            setFromSeatsArray(temp1);

            let SeatFrom = [];
            for (let i = 0; i < temp1.length; i++) {
              if (temp1[i] == Uid) {
                SeatFrom.push(getSeatNumber(i));
              }
            }
            console.log(SeatFrom)
            var seatFromAsString = SeatFrom.join(', ');
            setSeatsFrom(seatFromAsString);
            setfromFlight(resFrom.data[0] || {})
          }).catch(err => {
            console.log(err);
          })


        axios
          .get(BACKEND_URL + "flights/search?flightId=" + res.data[0].to)
          .then(resTo => {
            // console.log(res.data[0]);
            temptoEconomy = [...resTo.data[0].seatsEconomy];
            temptoFirst = [...resTo.data[0].seatsFirst];
            temptoBusiness = [...resTo.data[0].seatsBusiness];

            switch (res.data[0].cabin) {
              case "Economy":
                temp2 = temptoEconomy;
                break;
              case "First":
                temp2 = temptoFirst;
                break;
              case "Business":
                temp2 = temptoBusiness;
            }
            setToSeatsArray(temp2);
            // console.log(temp2)

            let SeatTo = [];

            for (let i = 0; i < temp2.length; i++) {
              if (temp2[i] == Uid) {
                SeatTo.push(getSeatNumber(i));
              }
            }
            setSeatCount(SeatTo.length);
            var seatToAsString = SeatTo.join(', ');
            setSeatsTO(seatToAsString);
            settoFlight(resTo.data[0] || {});
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
    setText("Refunded :"+reservation?.price);
     console.log(reservation?.price);
     
  }
  const getSeatNumber = (i) => {
    let letter = String.fromCharCode('A'.charCodeAt(0) + i % 6);
    let num = Math.floor(i / 6 + 1);
    return `${num}${letter}`
  }



  //   const onDeleteConfirm = () => {
  //     axios
  //       .delete(BACKEND_URL + "flights/deleteFlight?flightId=" + id)
  //       .then(res => {
  //         history.push("/search");
  //       })
  //       .catch(err => {
  //         console.log("Error form ViewFlightDetails_deleteClick");
  //         console.log(err);
  //       })
  //   };
  //   const [showConfirm, setConfirm] = useState(false);
  //   const setConfirmButton = () => {
  //     setConfirm(true)
  //     // setDelete(false)
  //   };

  //   const [showDelete, setDelete] = useState(true);
  //   const setDeleteButton = () => {
  //     showDelete(false)
  //   };

  //   const toggleDialog = () => {
  //     setConfirm(!showConfirm);
  //   }


  return (
    // <div>
    //   <Button variant="outlined" onClick={getSummary}>Search</Button>
    // </div>
    <div className="ViewFlight">
      <div className="container">
        <div className="row">
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Flights' Record</h1>
            <p className="lead text-center">
              View Flights' Info
            </p>
            <hr /> <br />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: "10px" }}>
            <div className='view-summary-card'>


              <div className="head-itinerary-card" style={{ margin: '10px 0' }}>
                <div className="icon">
                  <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                    alt="airplaneDepart"
                    width="25px"
                    height="25px" />
                </div>
                <div className="text-within">
                  <p>Onward trip from <span className="from-to-font">{fromflight?.from}</span> to <span className="from-to-font">{fromflight?.to}</span></p>
                </div>
              </div>

              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 500 }} className="table table-hover table-dark">
                  <TableBody>
                    <TableRow>
                      <TableCell>  <span className="info-header-font"> Departure Flight ID </span> </TableCell>
                      <TableCell align="right">{fromflight?.flightId}</TableCell>
                    </TableRow>
                   
                    <TableRow>
                      <TableCell>   <span className="info-header-font">Departure Date</span></TableCell>
                      <TableCell align="right">{fromflight?.departureDate?.substring(0, 10)}</TableCell>
                    </TableRow>

                    <TableRow>
                      {/* <th scope="row">5</th> */}
                      <TableCell>  <span className="info-header-font">Arrival Date</span></TableCell>
                      <TableCell align="right">{fromflight?.arrivalDate?.substring(0, 10)}</TableCell>
                    </TableRow>
                    
                    <TableRow>
                      {/* <th scope="row">6</th> */}
                      <TableCell>  <span className="info-header-font">Departure Time </span></TableCell>
                      <TableCell align="right">{fromflight?.departureTime}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">7</th> */}
                      <TableCell>  <span className="info-header-font">Arrival Time</span></TableCell>
                      <TableCell align="right">{fromflight?.arrivalTime}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">11</th> */}
                      <TableCell>  <span className="info-header-font">Departure Terminal</span></TableCell>
                      <TableCell align="right">{fromflight?.departureTerminal}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">12</th> */}
                      <TableCell>  <span className="info-header-font">Arrival Terminal</span></TableCell>
                      <TableCell align="right">{fromflight?.arrivalTerminal}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">12</th> */}
                      <TableCell>  <span className="info-header-font">Cabin Class</span></TableCell>
                      <TableCell align="right">{reservation?.cabin}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">12</th> */}
                      <TableCell>  <span className="info-header-font">Seats</span></TableCell>
                      <TableCell align="right">{seatsFrom}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className='view-summary-card'>
              <div className="head-itinerary-card-return" style={{ margin: '10px 0' }}>
                <div className="icon">
                  <div className="flip-image">
                    <img src="https://img.icons8.com/ios/50/000000/airplane-mode-on--v1.png"
                      alt="airplaneDepart"
                      width="25px"
                      height="25px" />
                  </div>
                </div>
                <div className="text-within">
                  <p>Return trip from <span className="from-to-font">{toflight.from}</span> to <span className="from-to-font">{toflight.to}</span></p>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table>
                  {/* <h1> Return Flight </h1> */}
                  <TableBody>
                    <TableRow>
                      <TableCell> <span className="info-header-font">Return Flight ID</span></TableCell>
                      <TableCell align="right">{toflight.flightId}</TableCell>
                    </TableRow>
                
                    <TableRow>
                      {/* <th scope="row">4</th> */}
                      <TableCell><span className="info-header-font">Departure Date</span></TableCell>
                      <TableCell align="right">{toflight.departureDate?.substring(0, 10)}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">5</th> */}
                      <TableCell><span className="info-header-font">Arrival Date</span></TableCell>
                      <TableCell align="right">{toflight.arrivalDate?.substring(0, 10)}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">6</th> */}
                      <TableCell><span className="info-header-font">Departure Time</span></TableCell>
                      <TableCell align="right">{toflight.departureTime}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">7</th> */}
                      <TableCell><span className="info-header-font">Arrival Time</span></TableCell>
                      <TableCell align="right">{toflight.arrivalTime}</TableCell>
                    </TableRow>

                    <TableRow>
                      {/* <th scope="row">11</th> */}
                      <TableCell><span className="info-header-font">Departure Terminal</span></TableCell>
                      <TableCell align="right">{toflight.departureTerminal}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">12</th> */}
                      <TableCell><span className="info-header-font">Arrival Terminal</span></TableCell>
                      <TableCell align="right">{toflight.arrivalTerminal}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">12</th> */}
                      <TableCell><span className="info-header-font">Cabin Class</span></TableCell>
                      <TableCell align="right">{reservation?.cabin}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <th scope="row">12</th> */}
                      <TableCell><span className="info-header-font">Seats</span></TableCell>
                      <TableCell align="right">{seatsTO}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div>Booking Number: <span>{bookingId}</span></div>
          <div>Total Price: EGP <span>{reservation?.price}</span></div>
        </div>

        <div className="row">
          <div className="col-md-6">
          </div>

          <div className="col-md-6" style={{ margin: "10px" }}>
            {/* <Link to={`/update-flight/${id}`} className="btn btn-outline-info btn-lg btn-block">
              Edit Flights
            </Link>
            <br /> */}
            <div>
              <ReservationCancel
                fromSeats={fromSeatsArray}
                toSeats={toSeatsArray}
                from={fromflight?.flightId}
                to={toflight?.flightId}
                userid={Uid}
                cabin={reservation?.cabin}
                reservationId={reservationId}
                fromflight={fromflight}
                toflight={toflight}
                chosenFromSeat={seatsFrom}
                chosenToSeat={seatsTO}
                departureFromCountry={fromflight?.from}
                departureToCountry={fromflight?.to}
                returnFromCountry={toflight?.from}
                returnToCountry={toflight?.to}
                seatCount={seatCount}
                handleSend={handleSend}
              />

            </div>
            {/* <div>
              <Button variant="outlined" onClick={handleSend}>send email man</Button>
            </div> */}

          </div>
        </div>
      </div>

    </div>
  )
}

export default ViewSummary;
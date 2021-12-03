import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';
import ReservationCancel from './ReservationCancel';



const ViewSummary = () => {

  let Uid = localStorage.getItem('userId') || 10;

  // david edited this part to add the send mail functionality
  let currEmail = "";

  const [sent, setSent] = useState(false)
  const [text, setText] = useState("")
  const [email, setEmail] = useState("")
  const handleSend = async (e) => {
    setSent(true)
    try {

      console.log(email);
      //  BACKEND_URL + "users/search?userId=" + id)
      await axios.post(BACKEND_URL + "users/send_mail?userId=" + Uid, {
        text, to: email
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
        setBookingId(reservationId.toUpperCase())
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
    setText("Amount Refunded:" + reservation?.price)
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
            <div style={{ margin: "0 25px" }}>
              <Table sx={{ maxWidth: 500 }} className="table table-hover table-dark">
                <h1> Departure Flight </h1>
                <TableBody>
                  <TableRow>
                    {/* <th scope="row">1</th> */}
                    <TableCell>Departure Flight ID</TableCell>
                    <TableCell>{fromflight?.flightId}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">2</th> */}
                    <TableCell>Departure Country</TableCell>
                    <TableCell>{fromflight?.from}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">3</th> */}
                    <TableCell>Destination</TableCell>
                    <TableCell>{fromflight?.to}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">4</th> */}
                    <TableCell>Departure Date</TableCell>
                    <TableCell>{fromflight?.departureDate?.substring(0, 10)}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">5</th> */}
                    <TableCell>Arrival Date</TableCell>
                    <TableCell>{fromflight?.arrivalDate?.substring(0, 10)}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">6</th> */}
                    <TableCell>Departure Time</TableCell>
                    <TableCell>{fromflight?.departureTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">7</th> */}
                    <TableCell>Arrival Time</TableCell>
                    <TableCell>{fromflight?.arrivalTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">11</th> */}
                    <TableCell>Departure Terminal</TableCell>
                    <TableCell>{fromflight?.departureTerminal}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">12</th> */}
                    <TableCell>Arrival Terminal</TableCell>
                    <TableCell>{fromflight?.arrivalTerminal}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">12</th> */}
                    <TableCell>Cabin Class</TableCell>
                    <TableCell>{reservation?.cabin}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">12</th> */}
                    <TableCell>Seats</TableCell>
                    <TableCell>{seatsFrom}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div style={{ margin: "0 25px" }}>
              <Table>
                <h1> Return Flight </h1>
                <TableBody>
                  <TableRow>
                    {/* <th scope="row">1</th> */}
                    <TableCell>Return Flight ID</TableCell>
                    <TableCell>{toflight.flightId}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">2</th> */}
                    <TableCell>Departure Country</TableCell>
                    <TableCell>{toflight.from}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">3</th> */}
                    <TableCell>Destination</TableCell>
                    <TableCell>{toflight.to}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">4</th> */}
                    <TableCell>Departure Date</TableCell>
                    <TableCell>{toflight.departureDate?.substring(0, 10)}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">5</th> */}
                    <TableCell>Arrival Date</TableCell>
                    <TableCell>{toflight.arrivalDate?.substring(0, 10)}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">6</th> */}
                    <TableCell>Departure Time</TableCell>
                    <TableCell>{toflight.departureTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">7</th> */}
                    <TableCell>Arrival Time</TableCell>
                    <TableCell>{toflight.arrivalTime}</TableCell>
                  </TableRow>

                  <TableRow>
                    {/* <th scope="row">11</th> */}
                    <TableCell>Departure Terminal</TableCell>
                    <TableCell>{toflight.departureTerminal}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">12</th> */}
                    <TableCell>Arrival Terminal</TableCell>
                    <TableCell>{toflight.arrivalTerminal}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">12</th> */}
                    <TableCell>Cabin Class</TableCell>
                    <TableCell>{reservation?.cabin}</TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <th scope="row">12</th> */}
                    <TableCell>Seats</TableCell>
                    <TableCell>{seatsTO}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
                handleSend={handleSend}
              />

            </div>
            <div>
              <Button variant="outlined" onClick={handleSend}>send email man</Button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ViewSummary;
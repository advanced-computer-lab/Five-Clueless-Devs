import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';


const ViewSummary = () => {

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
  const[reservation,setReservation]=useState();
  let { idfrom,idto } = useParams();
  useEffect(() => {
    getSummary();
}, []);
const getSummary = () =>{
    //console.log("Print id: " + { id });
    var tempFromEconomy=[];
    var tempFromFirst=[];
    var tempFromBusiness=[];
    var temptoEconomy=[];
    var temptoFirst=[];
    var temptoBusiness=[];
    
    axios
      .get(BACKEND_URL + "flights/search?flightId=" + idfrom)
      .then(res => {
        //console.log(res.data[0]);
        tempFromEconomy=[...res.data[0].seatsEconomy];
        tempFromFirst=[...res.data[0].seatsFirst];
        tempFromBusiness=[...res.data[0].seatsBusiness];

         //console.log(tempFromEconomy);
        // console.log(tempFromFirst);
        // console.log(tempFromBusiness);
        setfromFlight(res.data[0] || {});
        axios
        .get(BACKEND_URL + "flights/search?flightId=" + idto)
        .then(res => {
         // console.log(res.data[0]);
          temptoEconomy=[...res.data[0].seatsEconomy];
          temptoFirst=[...res.data[0].seatsFirst];
          temptoBusiness=[...res.data[0].seatsBusiness];
          settoFlight(res.data[0] || {});
        })
        .catch(err => {
          console.log(err);
        })
       // console.log(tempFromEconomy);
        axios.get(BACKEND_URL + "reservations/GetReservation?UserID=" + 5)
        .then(res => {
           setReservation(res.data[0]);
            var temp1=[];
            var temp2=[];
          console.log(res.data);
          //temp=[...res.data];
          let test="Economy";
          //console.log(tempFromEconomy);
          switch(test){
              case "Economy":
                  temp1=tempFromEconomy;
                  temp2=temptoEconomy;
                  break;
              case "First":
                  temp1=tempFromFirst;
                  temp2=temptoFirst;
                  break;
              case "Business":
                  temp1=tempFromBusiness;
                  temp2=temptoBusiness;
          }
          //console.log(temp1);
          //console.log(temp2);
          let Uid="10";
          let SeatsFrom=[];
          let SeatTo=[];
          for(let i=0;i<temp1.length;i++){
              if(temp1[i]==Uid){
                  SeatsFrom.push(i);
              }
          }
          //console.log(SeatsFrom);
          for(let i=0;i<temp2.length;i++){
            if(temp2[i]==Uid){
                SeatTo.push(i);
            }
        }
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
     
  }
//   const getSeatNumber = (i) => {
//     let letter = String.fromCharCode('A'.charCodeAt(0) + i % 6);
//     let num = Math.floor(i / 6 + 1);
//     return ${num}${letter}
// }



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
        <div>
          <Button variant="outlined" onClick={getSummary}>Search</Button>
        </div>
    // <div className="ViewFlight">
    //   <div className="container">
    //     <div className="row">
    //       <br />
    //       <div className="col-md-8 m-auto">
    //         <h1 className="display-4 text-center">Flights' Record</h1>
    //         <p className="lead text-center">
    //           View Flights' Info
    //         </p>
    //         <hr /> <br />
    //       </div>
    //     </div>
    //     <div>
    //       <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    //         <Table sx={{ maxWidth: 500 }} className="table table-hover table-dark">
    //           {/* <thead>
    //       <TableRow>
    //         <th scope="col">#</th>
    //         <th scope="col">First</th>
    //         <th scope="col">Last</th>
    //         <th scope="col">Handle</th>
    //       </TableRow>
    //     </thead> */}
    //           <TableBody>
    //             <TableRow>
    //               {/* <th scope="row">1</th> */}
    //               <TableCell>Flight ID</TableCell>
    //               <TableCell>{flight.flightId}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">2</th> */}
    //               <TableCell>Origin Country</TableCell>
    //               <TableCell>{flight.from}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">3</th> */}
    //               <TableCell>Destination</TableCell>
    //               <TableCell>{flight.to}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">4</th> */}
    //               <TableCell>Departure Date</TableCell>
    //               <TableCell>{flight.departureDate.substring(0, 10)}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">5</th> */}
    //               <TableCell>Arrival Date</TableCell>
    //               <TableCell>{flight.arrivalDate.substring(0, 10)}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">6</th> */}
    //               <TableCell>Departure Time</TableCell>
    //               <TableCell>{flight.departureTime}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">7</th> */}
    //               <TableCell>Arrival Time</TableCell>
    //               <TableCell>{flight.arrivalTime}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">8</th> */}
    //               <TableCell>Available Economy Seats</TableCell>
    //               <TableCell>{flight.availableEconomy}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">9</th> */}
    //               <TableCell>Available Business Seats</TableCell>
    //               <TableCell>{flight.availableBusiness}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">10</th> */}
    //               <TableCell>Available First Class Seats</TableCell>
    //               <TableCell>{flight.availableFirst}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">11</th> */}
    //               <TableCell>Departure Terminal</TableCell>
    //               <TableCell>{flight.departureTerminal}</TableCell>
    //             </TableRow>
    //             <TableRow>
    //               {/* <th scope="row">12</th> */}
    //               <TableCell>Arrival Terminal</TableCell>
    //               <TableCell>{flight.arrivalTerminal}</TableCell>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </div>
    //     </div>

    //     <div className="row">
    //       <div className="col-md-6">
    //       </div>

    //       <div className="col-md-6" style={{ margin: "10px" }}>
    //         {/* <Link to={`/update-flight/${id}`} className="btn btn-outline-info btn-lg btn-block">
    //           Edit Flights
    //         </Link>
    //         <br /> */}

    //         <Button
    //           onClick={() => history.push(`/update-flight/${id}`)}
    //           variant="outlined"
    //           style={{ marginRight: "10px" }}
    //         > Edit </Button>

    //         {showDelete ? <Button onClick={setConfirmButton} variant="outlined" color="error">Delete </Button> : null}
    //         {/* {showConfirm ? <Button onClick={onDeleteConfirm} variant="outlined" color="error">Confirm</Button> : null} */}

    //       </div>
    //     </div>
    //   </div>


    //   <div>
    //     <Dialog
    //       open={showConfirm}
    //       onClose={toggleDialog}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description"
    //     >
    //       <DialogTitle id="alert-dialog-title">
    //         {"Are you sure you want to delete this flight?"}
    //       </DialogTitle>
    //       <DialogActions>
    //         <Button onClick={toggleDialog} variant="text">Cancel </Button>
    //         <Button onClick={onDeleteConfirm} variant="text" color="error">Delete</Button>
    //       </DialogActions>
    //     </Dialog>
    //   </div>

    // </div>
  )
}

export default ViewSummary;
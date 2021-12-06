import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';


const ReservationCancel = (props) => {
    const history = useHistory();
    const from = props.from;
    const to = props.to;
    const userid=props.id;
    //let{id,from,to}=useParams();
    const [fromflight, setfromFlight] = useState({
        availableEconomy: '',
        availableBusiness: '',
        availableFirst: '',
        seatsBusiness:'',
        seatsEconomy:'',
        seatsFirst:''
    });

    const [toflight, settoFlight] = useState({
        availableEconomy: '',
        availableBusiness: '',
        availableFirst: '',
        seatsBusiness:'',
        seatsEconomy:'',
        seatsFirst:''
    });
  const [showConfirm, setConfirm] = useState(false);

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }
    useEffect(() => {
        OnCancel();
    }, []);
const OnCancel = () => {
    
    
    var tempFromEconomy=[];
    var tempFromFirst=[];
    var tempFromBusiness=[];
    var temptoEconomy=[];
    var temptoFirst=[];
    var temptoBusiness=[];
    
    axios
      .get(BACKEND_URL + "flights/search?flightId=" + from)
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
        .get(BACKEND_URL + "flights/search?flightId=" +to)
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
        axios.get(BACKEND_URL + "reservations/GetReservation?UserID="+userid+"&from="+from+"&to="+to)
        .then(res => {
        //    setReservation(res.data[0]);
            var temp1=[];
            var temp2=[];
          console.log(res.data[0]._id);
          //temp=[...res.data];
          let cabinclass="";
          //console.log(tempFromEconomy);
          switch(res.data[0].cabin){
              case "Economy":
                  temp1=tempFromEconomy;
                  temp2=temptoEconomy;
                  cabinclass="Economy";
                  break;
              case "First":
                  temp1=tempFromFirst;
                  temp2=temptoFirst;
                  cabinclass="First";
                  break;
              case "Business":
                  temp1=tempFromBusiness;
                  temp2=temptoBusiness;
                  cabinclass="Business";
          }
          //console.log(temp1);
          //console.log(temp2);
          //let Uid="10";
          let SeatFrom=[];
          let SeatTo=[];
          let countFrom=0;
          let countTo=0;
          for(let i=0;i<temp1.length;i++){
              if(temp1[i]==userid){
                  SeatFrom[i]=null;
                  countFrom++;
              }
              else
              SeatFrom[i]=temp1[i];
          }
          //setSeatsFrom(SeatFrom);
          //console.log(SeatFrom);
          for(let i=0;i<temp2.length;i++){
            if(temp2[i]==userid){
                SeatTo[i]=null;
                countTo++;}
            else{
                SeatTo[i]=temp2[i];
            }
                
            }
        switch(cabinclass){
            case "Economy":
                setfromFlight({...fromflight,availableEconomy:fromflight.availableEconomy+countFrom,seatsEconomy:SeatFrom});
                settoFlight({...toflight,availableEconomy:toflight.availableEconomy+countTo,seatsEconomy:SeatTo});
                break;
            case "First":
                setfromFlight({...fromflight,availableFirst:fromflight.availableFirst+countFrom,seatsFirst:SeatFrom});
                settoFlight({...toflight,availableFirst:toflight.availableFirst+countTo,seatsFirst:SeatTo});
                 break;
            case "Business":
                setfromFlight({...fromflight,availableBusiness:fromflight.availableBusiness+countFrom,seatsBusiness:SeatFrom});
                settoFlight({...toflight,availableBusiness:toflight.availableBusiness+countTo,seatsBusiness:SeatTo});
                 break;
            default:
                console.log("Something went wrong");
        }
        //setSeatsTO(SeatTo);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
      

  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
        .put(BACKEND_URL + 'flights/update?flightId=' +from, fromflight)
        .then(res => {
            console.log(res.data);
    axios
        .put(BACKEND_URL + 'flights/update?flightId=' + to, toflight)
        .then(res => {
            console.log(res.data);
    axios
        .delete(BACKEND_URL + "reservations/cancelReservation?UserID=" + userid+"&from"+from+"&to"+to)
        .then(res => {
        history.push("/Reserved-flights");
      })
      .catch(err => {
        console.log("Error form Cancel Resrevation");
        console.log(err);
      })
        })
        .catch(err => {
            console.log(err);
        })
        })
        .catch(err => {
            console.log(err);
        })
};
return(
    <div>
          <Button variant="outlined" onClick={onSubmit}>cancel</Button>
        </div>
/* <div>
        <Dialog
          open={showConfirm}
          onClose={toggleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to cancel the reservation?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={toggleDialog} variant="text">back </Button>
            <Button onClick={onSubmit} variant="text" color="error">cancel Reservation</Button>
          </DialogActions>
        </Dialog>
      </div> */
)
}
export default ReservationCancel;
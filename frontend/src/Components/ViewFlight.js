import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from '../API/URLS';
import Flight from '../../../backend/model/Flight';


export default function App() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };
    React.useEffect(() => {
       const results = Flight.filter(flight =>
         flight.toLowerCase().includes(searchTerm)
       );
       setSearchResults(results);
     }, [searchTerm]);
   
     return (
       <div className="App">
         <input
           type="text"
           placeholder="Search"
           value={searchTerm}
           onChange={handleChange}
         />
         <ul>
            {searchResults.map(item => (
             <li>{item}</li>
           ))}
         </ul>
       </div>
     );
   }









/*export default function ViewFlight(){
    const [flights,setFlights]= React.useState({});
    const[b,setB] = useState(true);

    
useEffect(()=>{


    axios.get( BACKEND_URL+"flights/search").then(
        res=>{setFlights(res.data[0])
            // console.log(flights, 'flolfofl')
        console.log(res.data[0], 'flyyyyy')
    }
    ).catch();
},[])

console.log(flights, 'flolfofl')

function handleButtonClick(){

setB(b);
}

return(
    <div>
    <div>dfghgfdfgh</div>
    {/* flights.map(a=>{b?<button onClick={handleButtonClick}>{a.flightId ,a.from ,a.to, a.departureDate, a.arrivalDate, a.departureTime, a.arrivalTime,
        a.availableEconomy, a.availableBusiness, a.availableFirst, a.arrivalTerminal, a.departureTerminal
    }</button>:<button onClick={handleButtonClick}>{a.username}</button>}) *///}

    /*{Object.keys(flights).map((detail, i) => {return (<div> {detail} :  {flights[detail]} </div>)})}
    </div>
);
    
} */

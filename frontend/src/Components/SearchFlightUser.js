import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import FlightCard from './FlightCard';
import TextField from '@mui/material/TextField';
import './SearchFlightCriteria.css';
import { Button, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
//NO PREVENT DEFAULT IS PROBLEM?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!?!!!?!?!!??!?!!?!

const SearchFlightUser = ({ location }) => {
    // const history = useHistory();
    // useState hooks for input and language

    const [returnFlight, setReturnFlight] = useState({
        flightId: '',
        from: '',
        to: '',
        departureDate: '',
        arrivalDate: '',
        departureTime: '',
        arrivalTime: '',
        availableEconomy: '',
        availableBusiness: '',
        availableFirst: '',
        arrivalTerminal: '',
        departureTerminal: ''
    });
    const [chosenClass, setClass] = useState('Economy');
    const [returnDate, setReturnDate] = useState('');
    const [adultsNumber, setAdultNumber] = useState(1);
    const [childNumber, setChildNumber] = useState(0);
    const [allFlights, setAll] = useState([]);
    const [flightRes, setResult] = useState([]);
    const [flight, setFlight] = useState({
        flightId: '',
        from: '',
        to: '',
        departureDate: '',
        arrivalDate: '',
        departureTime: '',
        arrivalTime: '',
        availableEconomy: '',
        availableBusiness: '',
        availableFirst: '',
        arrivalTerminal: '',
        departureTerminal: ''
    });

    useEffect(() => {
        axios
            .get(BACKEND_URL + "flights/search?")
            .then(res => {
                console.log(res.data);
                setResult(res.data);
                console.log(flightRes);
                setAll(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // useEffect((e) => {
    //     const usp = new URLSearchParams(flight);
    //     let keysForDel = [];
    //     usp.forEach((value, key) => {
    //         if (value === '') {
    //             keysForDel.push(key);
    //         }
    //     });

    //     keysForDel.forEach(key => {
    //         usp.delete(key);
    //     });
    //     console.log(usp.toString());
    //     // prevents default, so page won't reload on form submit

    //     //e.preventDefault();
    //     axios
    //         .get(BACKEND_URL + "flights/search?" + usp.toString())
    //         .then(res => {
    //             console.log(res.data);
    //             setResult(res.data);
    //             console.log(flightRes);

    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [flight])

    const onChooseReturnDate = (e) => {
        setReturnDate(e.target.value);

    }
    const onChooseClass = (e) => {
        setClass(e.target.value);

    }
    const onChooseAdult = (e) => {
        setAdultNumber(e.target.value);

    }
    const onChooseChild = (e) => {
        setChildNumber(e.target.value);
    }
    const handleChangeTo = (event, value) => {
        if (value == null) {
            setFlight({ ...flight, to: "" });
        }
        else {
            setFlight({ ...flight, to: value });
        }
    }
    const handleChangeFrom = (event, value) => {
        if (value == null) {
            setFlight({ ...flight, from: "" });
        }
        else {
            setFlight({ ...flight, from: value });
        }
    }
    const onChange = (e) => {
        setFlight({ ...flight, [e.target.name]: e.target.value });
        console.log(flight);

    };

    // const clearAll = (e) => {
    //     var elementsSelect = document.getElementById('select');
    //     var elementsDate = document.getElementById('dateInput');
    //     console.log(elementsSelect.length);

    //     for (var i = 0; i < elementsSelect.length; i++) {
    //         elementsSelect.selectedIndex = null;
    //         console.log("Im in select");
    //     }
    //     for (var j = 0; j < elementsDate.length; j++) {
    //         elementsDate.value = "";
    //         console.log("Im in");
    //     }
    //     console.log("CLEARED");
    // }
    const showAll = (e) => {
        e.preventDefault();
        axios
            .get(BACKEND_URL + "flights/searchUser?")
            .then(res => {
                console.log(res.data);
                setResult(res.data);
                console.log(flightRes);

            })
            .catch(err => {
                console.log(err);
            })
        //clearAll(e);
    };
    // function for handling form submit
    const submitAction = (e) => {
        setReturnFlight(flight);    //Remove return date from model and just replace
        returnFlight.departureDate = returnDate;
        returnFlight.from = flight.to;
        returnFlight.to = flight.from;
        console.log(returnFlight);
        var passNumber = adultsNumber + childNumber;
        var numberAndClass = "";
        console.log(chosenClass);
        const usp = new URLSearchParams(flight);
        const uspReturn = new URLSearchParams(returnFlight);
        let keysForDel = [];
        let keysForDel2 = [];
        if (chosenClass == "Economy") {
            numberAndClass = "availableEconomy[gte]" + `=${passNumber}`;
            console.log("entered here");

        }
        else if (chosenClass == "Business") {
            numberAndClass = "availableBusiness[gte]" + `=${passNumber}`;

        }
        else if (chosenClass == "First") {
            numberAndClass = "availableFirst[gte]" + `=${passNumber}`;

        }
        usp.forEach((value, key) => {
            if (value === '') {
                keysForDel.push(key);
            }
        });

        keysForDel.forEach(key => {
            usp.delete(key);
        });
        uspReturn.forEach((value, key) => {
            if (value === '') {
                keysForDel2.push(key);
            }
        });

        keysForDel2.forEach(key => {
            uspReturn.delete(key);
        });
        console.log(usp.toString());
        console.log(uspReturn.toString());
        // prevents default, so page won't reload on form submit

        e.preventDefault();
        axios
            .get(BACKEND_URL + "flights/searchUser?" + usp.toString() + "&" + numberAndClass)
            .then(res => {
                console.log(res.data);
                setResult(res.data);
                console.log(flightRes);

            })
            .catch(err => {
                console.log(err);
            })

    };

    return (
        <>

            <div className='bg-dark text-light'>
                <div className='container pt-5' style={{ height: '100vh' }}>
                    <h1 className="display-4 text-center">Search for flights</h1>


                    <form onSubmit={submitAction} className='mt-5'>
                        <div className='input-group'>
                            <div className='criteria-form-group'>

                                <div>
                                    {/* <FormControl sx={{ m: 1, minWidth: 120 }} >
                                        <InputLabel id="demo-simple-select-label">From</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="select"
                                            name="from"
                                            value={flight.from}
                                            label="From"
                                            onChange={(e) => onChange(e)}
                                        >
                                            {allFlights.map(flight => flight.from)
                                                .filter((value, index, self) => self.indexOf(value) === index).map((fl, k) =>
                                                    <MenuItem value={fl} key={k} >{fl}</MenuItem>)}

                                        </Select>
                                    </FormControl> */}
                                    {/* <FormControl sx={{ m: 1, minWidth: 120 }} >
                                        <InputLabel id="demo-simple-select-label">To</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="select"
                                            name="to"
                                            value={flight.to}
                                            label="To"
                                            onChange={(e) => onChange(e)}
                                            
                                        >
                                            {flightRes.map(flight => flight.to)
                                                .filter((value, index, self) => self.indexOf(value) === index).map((fl, k) =>
                                                    <MenuItem value={fl} key={k} >{fl}</MenuItem>)}

                                        </Select>
                                    </FormControl> */}

                                    <Autocomplete 
                                        disablePortal
                                        id="combo-box-demo"
                                        options={allFlights.map(flight => flight.to)
                                            .filter((value, index, self) => self.indexOf(value) === index)}
                                        sx={{ width: 300 }}

                                        // onChange={(e) => onChange(e)}

                                        renderInput={(params) => <TextField {...params} required label="To" />}
                                        // name="to"
                                        // value={flight.to}
                                        onChange={handleChangeTo}


                                    />
                                    <Autocomplete 
                                        disablePortal
                                        id="combo-box-demo"
                                        options={allFlights.map(flight => flight.from)
                                            .filter((value, index, self) => self.indexOf(value) === index)}
                                        sx={{ width: 300 }}
                                        
                                        // onChange={(e) => onChange(e)}

                                        renderInput={(params) => <TextField {...params} required label="From" />}
                                        // name="to"
                                        // value={flight.to}
                                        onChange={handleChangeFrom}

                                    />
                                    <span className={flight.departureDate === "" ? "criteria-hide" : ""}>
                                        <TextField
                                            id="dateInput"
                                            type="date"
                                            className='form-control'
                                            label='Departure Date'
                                            name="departureDate"
                                            value={flight.departureDate}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </span>
                                    <span className={returnDate === "" ? "criteria-hide" : ""}>
                                        <TextField
                                            id="dateInput"
                                            type='date'
                                            className='form-control'
                                            label='Return Date'
                                            name="returnDate"
                                            value={returnDate}
                                            onChange={(e) => onChooseReturnDate(e)}
                                        />
                                    </span>
                                    <div>
                                        <FormControl sx={{ m: 1, minWidth: 120 }} >
                                            <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="select"

                                                value={chosenClass}
                                                label="Class"
                                                onChange={(e) => onChooseClass(e)}

                                            >

                                                <MenuItem value={'Economy'} >Economy</MenuItem>
                                                <MenuItem value={'Business'} >Business</MenuItem>
                                                <MenuItem value={'First'} >First</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} >
                                        <InputLabel id="demo-simple-select-label">Adults</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="select"

                                            value={adultsNumber}
                                            label="Adults"
                                            onChange={(e) => onChooseAdult(e)}

                                        >


                                            <MenuItem value={1} >1</MenuItem>
                                            <MenuItem value={2} >2</MenuItem>
                                            <MenuItem value={3} >3</MenuItem>
                                            <MenuItem value={4} >4</MenuItem>
                                            <MenuItem value={5} >5</MenuItem>
                                            <MenuItem value={6} >6</MenuItem>
                                            <MenuItem value={7} >7</MenuItem>
                                            <MenuItem value={8} >8</MenuItem>
                                            <MenuItem value={9} >9</MenuItem>

                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} >
                                        <InputLabel id="demo-simple-select-label">Children</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="select"

                                            value={childNumber}
                                            label="Children"
                                            onChange={(e) => onChooseChild(e)}

                                        >

                                            <MenuItem value={0} >0</MenuItem>
                                            <MenuItem value={1} >1</MenuItem>
                                            <MenuItem value={2} >2</MenuItem>
                                            <MenuItem value={3} >3</MenuItem>
                                            <MenuItem value={4} >4</MenuItem>
                                            <MenuItem value={5} >5</MenuItem>
                                            <MenuItem value={6} >6</MenuItem>
                                            <MenuItem value={7} >7</MenuItem>
                                            <MenuItem value={8} >8</MenuItem>
                                            <MenuItem value={9} >9</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='input-group-append'>
                                    <Button variant="outlined" type="submit">Search</Button>


                                </div>
                                <div>
                                    <Button variant="outlined" onClick={(e) => showAll(e)} >Show All</Button>
                                </div>
                                <div className="list">
                                    {flightRes.map((flight, k) =>
                                        <FlightCard flight={flight} key={k} />
                                    )}
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SearchFlightUser;
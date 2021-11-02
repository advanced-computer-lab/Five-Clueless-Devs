import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import './CreateFlight.css';


class CreateFlight extends Component {
    constructor() {
        super();
        this.state = {
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
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            flightId: this.state.flightId,
            from: this.state.from,
            to: this.state.to,
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate,
            departureTime: this.state.departureTime,
            arrivalTime: this.state.arrivalTime,
            availableEconomy: this.state.availableEconomy,
            availableBusiness: this.state.availableBusiness,
            availableFirst: this.state.availableFirst,
            departureTerminal: this.state.departureTerminal,
            arrivalTerminal: this.state.arrivalTerminal

        };

        axios
            .post(BACKEND_URL + 'flights/createFlight', data)
            .then(res => {
                this.setState({
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
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in Create Flight!");
            })
    };

    render() {
        return (
            <div className="CreateBook">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Flight</h1>
                            <p className="lead text-center">
                                Create new flight
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <label> Flight ID: </label>
                                    <input
                                        type='text'
                                        placeholder='Flight ID'
                                        name='flightId'
                                        className='form-control'
                                        value={this.state.flightId}
                                        onChange={this.onChange}
                                    />

                                </div>


                                <div className='form-group'>
                                    <label> From: </label>
                                    <input
                                        type='text'
                                        placeholder='From'
                                        name='from'
                                        className='form-control'
                                        value={this.state.from}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label> To: </label>
                                    <input
                                        type='text'
                                        placeholder='To'
                                        name='to'
                                        className='form-control'
                                        value={this.state.to}
                                        onChange={this.onChange}
                                    />
                                </div>


                                <div className='form-group'>
                                    <label> Departure Time: </label>
                                    <input
                                        type='time'
                                        placeholder='Departure Time'
                                        name='departureTime'
                                        className='form-control'
                                        value={this.state.departureTime}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Arrival Time: </label>
                                    <input
                                        type='time'
                                        placeholder='Arrival Time'
                                        name='arrivalTime'
                                        className='form-control'
                                        value={this.state.arrivalTime}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Economy Class Seats: </label>
                                    <input
                                        type='text'
                                        placeholder='Economy Class Seats'
                                        name='availableEconomy'
                                        className='form-control'
                                        value={this.state.availableEconomy}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Business Class Seats: </label>
                                    <input
                                        type='text'
                                        placeholder='Business Class Seats'
                                        name='availableBusiness'
                                        className='form-control'
                                        value={this.state.availableBusiness}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> First Class Seats: </label>
                                    <input
                                        type='text'
                                        placeholder='First Class Seats'
                                        name='availableFirst'
                                        className='form-control'
                                        value={this.state.availableFirst}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Departure Terminal: </label>
                                    <input
                                        type='text'
                                        placeholder='Departure Terminal'
                                        name='departureTerminal'
                                        className='form-control'
                                        value={this.state.departureTerminal}  //CHANGE THIS TO DEPARTURE TERMINAL
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Arrival Terminal: </label>
                                    <input
                                        type='text'
                                        placeholder='Arrival Terminal'
                                        name='arrivalTerminal'
                                        className='form-control'
                                        value={this.state.arrivalTerminal} //CHANGE THIS TO ARRIVAL TEMRSINALS
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label> Departure Date: </label>
                                    <input
                                        type='date'
                                        placeholder='Departure Date'
                                        name='departureDate'
                                        className='form-control'
                                        value={this.state.departureDate}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label> Arrival Date: </label>
                                    <input
                                        type='date'
                                        placeholder='Arrival Date'
                                        name='arrivalDate'
                                        className='form-control'
                                        value={this.state.arrivalDate}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-outline-warning btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateFlight;
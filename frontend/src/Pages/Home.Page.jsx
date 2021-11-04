import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../API/URLS";


const Home = ({ inheritedValue }) => {


    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log('useeffect')
    }, []);

    const clickHandler = (x) => {
        setCounter(x)
    }

    const getFlights = () => {
        console.log('1')
        axios.get(BACKEND_URL + '/flights/test/').then(resp => {
            console.log(resp.data);
        });
    }

    return (
        <div>
            home page count = {counter}

            <div>
                <button onClick={(e) => {
                    setCounter(counter + 1);
                    console.log(counter);
                }}>increment</button>
            </div>

            <div>
                <button onClick={() => getFlights()}>reset</button>
                {inheritedValue}
            </div>

        </div>
    );
}

export default Home;
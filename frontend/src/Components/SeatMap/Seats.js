import { useEffect, useState } from "react";
import SeatMap from "./SeatMap";

const Seats = (props) => {

    const propSeats = props.seats;
    // [123, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 111,
    //     123, null, null, 123, null, null, "hell", 123, null, null, 123, null, null, null, null, null];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const processedRows = [];
        let temp = [];
        for (let i = 0; i < propSeats.length; i++) {
            if (i % 3 === 0 && i % 6 !== 0) {
                temp.push(null);
            } else if (i !== 0 && i % 6 === 0) {
                processedRows.push(temp);
                temp = [];
            }

            if (propSeats[i] !== null) {
                temp.push({ id: i + 1, number: i % 6 + 1 });
            } else {
                temp.push({ id: i + 1, number: i % 6 + 1, isReserved: true });
            }
        }

        setRows(processedRows);
        // console.log(processedRows);

    }, [])

    return (
        <>
            {rows.length > 0 ?
                <SeatMap
                    rows={rows}
                    selectedSeats={props.selectedSeats}
                    setSelectedSeats = {props.setSelectedSeats}
                    maxSeats={props.maxSeats}
                />
                : null}
        </>
    );
}

export default Seats;

   // [
    //   [
    //     { id: 1, number: 1, isSelected: true },
    //     { id: 2, number: 2 },
    //     null,
    //     { id: 3, number: "3", isReserved: true },
    //     { id: 4, number: "4" },
    //     null,
    //     { id: 5, number: 5 },
    //     { id: 6, number: 6 }
    //   ],
    //   [
    //     { id: 7, number: 1, isReserved: true },
    //     { id: 8, number: 2, isReserved: true },
    //     null,
    //     { id: 9, number: "3", isReserved: true },
    //     { id: 10, number: "4" },
    //     null,
    //     { id: 11, number: 5 },
    //     { id: 12, number: 6 }
    //   ],
    //   [
    //     { id: 13, number: 1 },
    //     { id: 14, number: 2 },
    //     null,
    //     { id: 15, number: 3, isReserved: true },
    //     { id: 16, number: 4 },
    //     null,
    //     { id: 17, number: 5 },
    //     { id: 18, number: 6 }
    //   ],
    //   [
    //     { id: 19, number: 1 },
    //     { id: 20, number: 2 },
    //     null,
    //     { id: 21, number: 3 },
    //     { id: 22, number: 4 },
    //     null,
    //     { id: 23, number: 5 },
    //     { id: 24, number: 6 }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],

    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ],
    //   [
    //     { id: 25, number: 1, isReserved: true },
    //     { id: 26, number: 2 },
    //     null,
    //     { id: 27, number: "3", isReserved: true },
    //     { id: 28, number: "4" },
    //     null,
    //     { id: 29, number: 5 },
    //     { id: 30, number: 6, isReserved: true }
    //   ]
    // ];
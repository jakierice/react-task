import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import dayjs from 'dayjs';

function Home() {
  const [currentRandomNumber, setCurrentRandomNumber] = useState({
    value: 0,
    timestamp: Number(new Date()),
  });
  const [numberList, setNumberList] = useState([]);
  const { current: socket } = useRef(io());
  useEffect(() => {
    socket.on('random-number', data => {
      setCurrentRandomNumber(data);
      setNumberList(prevList => {
        return prevList.concat({
          name: dayjs(data.timestamp).format('YYYYMMDDTHH:mm:ss'),
          value: data.value,
        });
      });
    });

    // the returned callback will be called by react when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  return (
    <React.Fragment>
      <header>
        <h1>Entropy Party</h1>
      </header>
      <main>
        <section>
          <h2>Random Numbers</h2>
          <button onClick={() => socket.close()}>Close connection</button>
          <button onClick={() => socket.open()}>Open connection</button>
          <strong>{currentRandomNumber.value}</strong>
          <LineChart
            width={730}
            height={250}
            data={numberList}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            syncId="random-number-chart"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#FF5964" />
          </LineChart>
          {/* <ul>
            {numberList.map((number, index) => (
              <li key={String(number.timestamp + index)}>{number.value}</li>
            ))}
          </ul> */}
        </section>
      </main>
    </React.Fragment>
  );
}

export default Home;

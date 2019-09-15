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
import Alert from '@reach/alert';
import dayjs from 'dayjs';

function Home() {
  const [currentRandomNumber, setCurrentRandomNumber] = useState([
    {
      value: '0',
      timestamp: Number(new Date()),
    },
  ]);
  const [randomNumberList, setRandomNumberList] = useState([]);
  const { current: socket } = useRef(io());

  const [randomNumberAlertThreshold, setRandomNumberAlertThreshold] = useState(
    75,
  );

  function handleThresholdInputChange(event) {
    const thresholdInputValue = event.target.value;
  }

  useEffect(() => {
    socket.on('random-number', data => {
      setCurrentRandomNumber(data);
      setRandomNumberList(prevList => {
        return prevList.concat({
          timestamp: dayjs(data.timestamp).format('YYYYMMDDTHH:mm:ss'),
          value: String(data.value),
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
          <input
            type="range"
            id="random-number-threshold-slider"
            name="random-number-threshold-slider"
            min="0"
            max="100"
            value={randomNumberAlertThreshold}
            onChange={event =>
              setRandomNumberAlertThreshold(event.target.value)
            }
          />
          <label htmlFor="random-number-threshold-slider">
            Random number alert threshold set to: {randomNumberAlertThreshold}
          </label>
          <LineChart
            data={randomNumberList}
            height={250}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            syncId="random-number-chart"
            width={730}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#FF5964" />
          </LineChart>
          <BarChart
            data={randomNumberList}
            height={250}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            syncId="random-number-chart"
            width={730}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#2892D7" />
          </BarChart>
          {parseInt(currentRandomNumber.value) > randomNumberAlertThreshold && (
            <Alert
              style={{
                background: 'hsla(10, 50%, 50%, .10)',
                padding: '10px',
              }}
            >
              ❗️ Woah! That's a high random number.
            </Alert>
          )}
          <ul>
            {randomNumberList
              .slice(randomNumberList.length - 10, randomNumberList.length)
              .map((number, index) => (
                <li key={number.timestamp}>{number.value}</li>
              ))}
          </ul>
        </section>
      </main>
    </React.Fragment>
  );
}

export default Home;

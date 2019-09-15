import React, { Fragment, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {
  ResponsiveContainer,
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
  const [isSocketConnected, setIsSocketConnected] = useState(false);
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

  useEffect(() => {
    socket.on('random-number', data => {
      setIsSocketConnected(true);
      setCurrentRandomNumber(data);
      setRandomNumberList(prevList => {
        return prevList.concat({
          timestamp: dayjs(data.timestamp).format('YYMMDDTHH:mm:ss'),
          value: String(data.value),
        });
      });
    });

    // the returned callback will be called by react when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  function closeSocketConnection() {
    setIsSocketConnected(false);
    socket.close();
  }

  function openSocketConnection() {
    setIsSocketConnected(true);
    socket.open();
  }

  return (
    <Fragment>
      <header>
        <h1>Entropy Party</h1>
        <small>
          Connection to random number pipe is{' '}
          {isSocketConnected ? 'open' : 'closed'}
        </small>
      </header>
      <main>
        <section>
          <button onClick={closeSocketConnection}>Close connection</button>
          <button onClick={openSocketConnection}>Open connection</button>
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
          <strong>Current random number: {currentRandomNumber.value}</strong>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={randomNumberList}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              syncId="random-number-chart"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={[-100, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#FF5964" />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={randomNumberList}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              syncId="random-number-chart"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={[-100, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2892D7" />
            </BarChart>
          </ResponsiveContainer>
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
          <h2>Log</h2>
          <ul>
            {randomNumberList
              .slice(randomNumberList.length - 10, randomNumberList.length)
              .map((number, index) => (
                <li key={number.timestamp}>{number.value}</li>
              ))}
          </ul>
        </section>
      </main>
    </Fragment>
  );
}

export default Home;

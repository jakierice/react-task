import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { createGlobalStyle } from 'styled-components';
import useResizeObserver from 'use-resize-observer';
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

import {
  PageLayoutWrapper,
  HeaderLayoutWrapper,
  MainContentLayoutWrapper,
  ChartsLayoutWrapper,
  ControlsLayoutWrapper,
  MetaInfoLayoutWrapper,
  ShowOnMobileOnly,
  ShowOnDesktopOnly,
} from '../styles/layout';
import { FullScreenModal } from '../components/FullScreenModal';
import { ToastList } from '../components/Toast';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  @media screen and (max-width: 425px) {
    body {
      padding: 0;
    }
  }
`;

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
  const toastListRef = useRef(null);
  // const [thresholdAlerts, setThresholdAlerts] = useState([]);
  const [isControlModalOpen, setIsControlModalOpen] = useState(false);

  useEffect(() => {
    socket.on('random-number', data => {
      setIsSocketConnected(true);
      setRandomNumberList(prevList => {
        setCurrentRandomNumber(data);
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

  useEffect(() => {
    if (
      parseInt(currentRandomNumber.value) > parseInt(randomNumberAlertThreshold)
    ) {
      toastListRef.current(
        `Random number is ${currentRandomNumber.value -
          parseInt(
            randomNumberAlertThreshold,
          )} higher than threshold provided by user.`,
      );
    }
  }, [currentRandomNumber, toastListRef, randomNumberAlertThreshold]);

  const [chartsLayoutWrapperRef, chartsLayoutWrapperWidth] = useResizeObserver({
    defaultWidth: 635,
  });

  function closeSocketConnection() {
    setIsSocketConnected(false);
    socket.close();
  }

  function openSocketConnection() {
    setIsSocketConnected(true);
    socket.open();
  }

  return (
    <PageLayoutWrapper>
      <GlobalStyle />
      <HeaderLayoutWrapper>
        <h1>Entropy Party</h1>
        <small>
          Connection to random number pipe is{' '}
          {isSocketConnected ? 'open' : 'closed'}
        </small>
        <button type="button" onClick={() => setIsControlModalOpen(true)}>
          Open chart controls
        </button>
      </HeaderLayoutWrapper>
      <MainContentLayoutWrapper>
        <ControlsLayoutWrapper>
          <ShowOnDesktopOnly>
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
          </ShowOnDesktopOnly>
          <ShowOnMobileOnly>
            <FullScreenModal isOpen={isControlModalOpen}>
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
                Random number alert threshold set to:{' '}
                {randomNumberAlertThreshold}
              </label>
              <button
                type="button"
                onClick={() => setIsControlModalOpen(false)}
              >
                Close chart controls
              </button>
            </FullScreenModal>
          </ShowOnMobileOnly>
        </ControlsLayoutWrapper>
        <ChartsLayoutWrapper ref={chartsLayoutWrapperRef}>
          <LineChart
            height={300}
            width={chartsLayoutWrapperWidth - 30}
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
          <BarChart
            height={300}
            width={chartsLayoutWrapperWidth - 30}
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
        </ChartsLayoutWrapper>
        <MetaInfoLayoutWrapper>
          <ToastList>{add => (toastListRef.current = add)}</ToastList>
          <strong>Current random number: {currentRandomNumber.value}</strong>
          <h2>Log</h2>
          <ul>
            {randomNumberList
              .slice(randomNumberList.length - 10, randomNumberList.length)
              .map((number, index) => (
                <li key={number.timestamp + index}>{number.value}</li>
              ))}
          </ul>
        </MetaInfoLayoutWrapper>
      </MainContentLayoutWrapper>
    </PageLayoutWrapper>
  );
}

export default Home;

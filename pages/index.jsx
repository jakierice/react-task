// external package imports
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { ThemeProvider } from 'styled-components';
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
import { Sliders } from 'react-feather';

// local package imports
import {
  Header,
  FullScreenModal,
  Toast,
  Button,
  SectionTitle,
  StrongText,
  UnorderedList,
  Controls,
  PullTabButton,
} from '../components';
import {
  PageLayoutWrapper,
  MainContentLayoutWrapper,
  ChartsLayoutWrapper,
  MetaInfoLayoutWrapper,
  ShowOnMobileOnly,
  ShowOnDesktopOnly,
  HorizontalRule,
  PositionFixed,
  theme,
  GlobalStyles
} from '../styles';

function Home() {
  const { current: socket } = useRef(io());
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  useEffect(() => {
    setIsSocketConnected(socket.connected);
  });

  const [randomNumberData, setRandomNumber] = useState({
    currentRandomNumber: { value: 0, timestamp: new Date() },
    randomNumberList: [],
  });

  useEffect(() => {
    try {
      socket.on('random-number', data => {
        setRandomNumber(prevRandomNumbers => {
          return {
            currentRandomNumber: data,
            randomNumberList: prevRandomNumbers.randomNumberList.concat({
              timestamp: dayjs(data.timestamp).format('HH:mm:ss'),
              value: String(data.value),
            }),
          };
        });
      });
    } catch (error) {
      console.error(error);
    }
    // the returned callback will be called by react when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  const [randomNumberAlertThreshold, setRandomNumberAlertThreshold] = useState(
    75,
  );
  const toastListRef = useRef(null);

  useEffect(() => {
    if (
      parseInt(randomNumberData.currentRandomNumber.value) >
      parseInt(randomNumberAlertThreshold)
    ) {
      toastListRef.current(
        `Random number is ${randomNumberData.currentRandomNumber.value -
          parseInt(
            randomNumberAlertThreshold,
          )} higher than threshold provided by user.`,
      );
    }
  }, [
    randomNumberData.currentRandomNumber.value,
    toastListRef,
    randomNumberAlertThreshold,
  ]);
  const [isControlModalOpen, setIsControlModalOpen] = useState(false);

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

  const [snapshotSize, setSnapshotSize] = useState(15);
  const snapshot = randomNumberData.randomNumberList.slice(
    Math.max(
      randomNumberData.randomNumberList.length - parseInt(snapshotSize),
      0,
    ),
  );
  const controlsPropsBag = {
    closeSocketConnection,
    isSocketConnected,
    openSocketConnection,
    randomNumberAlertThreshold,
    setRandomNumberAlertThreshold,
    setSnapshotSize,
    snapshotSize,
  };

  return (
    <ThemeProvider theme={theme}>
      <PageLayoutWrapper>
        <GlobalStyles />
        <Header isSocketConnected={isSocketConnected} />
        <MainContentLayoutWrapper>
          <ShowOnDesktopOnly>
            <Controls {...controlsPropsBag} />
          </ShowOnDesktopOnly>
          <ChartsLayoutWrapper ref={chartsLayoutWrapperRef}>
            <LineChart
              height={300}
              width={chartsLayoutWrapperWidth - 16}
              data={snapshot}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              syncId="random-number-chart"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={[-100, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ color: '#FF5964' }} />
              <Line type="monotone" dataKey="value" stroke="#FF5964" />
            </LineChart>
            <BarChart
              height={300}
              width={chartsLayoutWrapperWidth - 16}
              data={snapshot}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              syncId="random-number-chart"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={[-100, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ color: '#2892D7' }} />
              <Bar dataKey="value" fill="#2892D7" />
            </BarChart>
          </ChartsLayoutWrapper>
          <MetaInfoLayoutWrapper>
            <HorizontalRule />
            <StrongText>
              Current random number:{' '}
              {randomNumberData.currentRandomNumber.value}
            </StrongText>
            <SectionTitle>Log ({snapshot.length} items)</SectionTitle>
            <UnorderedList>
              {snapshot
                .map((number, index) => (
                  <li key={number.timestamp + index}>{number.value}</li>
                ))
                .reverse()}
            </UnorderedList>
          </MetaInfoLayoutWrapper>
        </MainContentLayoutWrapper>
        <ShowOnMobileOnly>
          <PositionFixed top={75} right={0}>
            <PullTabButton
              onClick={() => setIsControlModalOpen(true)}
              aria-label="open chart controls."
            >
              <Sliders size={24} />
            </PullTabButton>
          </PositionFixed>
        </ShowOnMobileOnly>
        <FullScreenModal isOpen={isControlModalOpen}>
          <Controls {...controlsPropsBag} />
          <Button onClick={() => setIsControlModalOpen(false)}>
            Close controls
          </Button>
        </FullScreenModal>
        <Toast>{add => (toastListRef.current = add)}</Toast>
      </PageLayoutWrapper>
    </ThemeProvider>
  );
}

export default Home;

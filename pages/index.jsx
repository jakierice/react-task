import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
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
  MetaInfoLayoutWrapper,
  ShowOnMobileOnly,
  ShowOnDesktopOnly,
  HorizontalRule,
  PositionFixed,
} from '../styles/layout';
import { FullScreenModal } from '../components/FullScreenModal';
import ToastList from '../components/Toast';
import { Button } from '../components/Button';
import theme from '../styles/theme';
import {
  PageTitle,
  SectionTitle,
  StrongText,
  SmallText,
  CapitalText,
} from '../components/typography';
import { UnorderedList } from '../components/List';
import Controls from '../components/Controls';
import { PullTabButton } from '../components/PullTabButton';
import { Sliders } from 'react-feather';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.darkGray};
    font-family: Arial, Helvetica, sans-serif;
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
        <GlobalStyle />
        <HeaderLayoutWrapper>
          <PageTitle>Entropy Party</PageTitle>
          <SmallText>
            Connection:{' '}
            <CapitalText>{isSocketConnected ? 'open' : 'closed'}</CapitalText>
          </SmallText>
        </HeaderLayoutWrapper>
        <MainContentLayoutWrapper>
          <ShowOnDesktopOnly>
            <Controls {...controlsPropsBag} />
          </ShowOnDesktopOnly>
          <FullScreenModal isOpen={isControlModalOpen}>
            <Controls {...controlsPropsBag} />
            <Button onClick={() => setIsControlModalOpen(false)}>
              Close controls
            </Button>
          </FullScreenModal>
          <ChartsLayoutWrapper ref={chartsLayoutWrapperRef}>
            <LineChart
              height={300}
              width={chartsLayoutWrapperWidth - 16}
              data={snapshot}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
        <ToastList>{add => (toastListRef.current = add)}</ToastList>
      </PageLayoutWrapper>
    </ThemeProvider>
  );
}

export default Home;

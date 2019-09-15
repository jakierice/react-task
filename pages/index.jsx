import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

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
        return prevList.concat(data);
      });
    });

    // the returned callback will be called by reacted
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
          <ul>
            {numberList.map((number, index) => (
              <li key={String(number.timestamp + index)}>{number.value}</li>
            ))}
          </ul>
        </section>
      </main>
    </React.Fragment>
  );
}

export default Home;

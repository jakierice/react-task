import React from 'react';
import io from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? 'https://react-task.jakierice.now.sh/' : '';

class Home extends React.Component {
  state = {
    hello: '',
  };
  static socket;
  componentDidMount() {
    console.log(URL);
    this.socket = io();
    this.socket.on('now', (data) => {
      this.setState({
        hello: data.value,
      });
    });
  }

  render() {
    return <div>{this.state.hello}</div>;
  }
}

export default Home;

import React from 'react';
import io from 'socket.io-client';

class Home extends React.Component {
  state = {
    hello: '',
  };
  private socket: any;
  componentDidMount() {
    this.socket = io();
    this.socket.on('now', (data: any) => {
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

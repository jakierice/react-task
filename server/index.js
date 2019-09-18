const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const randomNumber = require('../utils/randomNumber');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const PORT = dev ? 3000 : process.env.PORT;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connection', function(socket) {
  const unsubscribe = randomNumber.subscribe(function(number) {
    const data = {
      value: number,
      timestamp: Number(new Date()),
    };

    socket.emit('random-number', data);
  });

  socket.on('disconnect', function() {
    unsubscribe();
  });
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  http.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Listening on http://localhost:${PORT}`);
  });
});

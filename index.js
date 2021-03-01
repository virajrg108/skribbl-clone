const express = require('express');
const http = require('http');
var cors = require('cors')
const app = express();
app.use(cors())
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', onConnection);

app.use("/", express.static(__dirname + '/client/build'));

function onConnection(socket) {
  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data)
  });
}

const port = 8080;
server.listen(port, () => console.log(`server is running on port ${port}`));
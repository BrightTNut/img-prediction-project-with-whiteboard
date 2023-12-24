import express from 'express';
import http from 'http';
import { Socket, Server as WebSocketServer } from 'socket.io';
import { Pool } from 'pg';
import cors from 'cors'; // Import the cors middleware
import { WebSocket } from 'ws';


const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);
const wss = new WebSocketServer(server);
const port = 3001;

const pool = new Pool({
  user: 'tejas',
  host: 'localhost',
  database: 'img',
  password: 'Tejas@12',
  port: 5432,
});

app.use(cors()); // Use cors middleware to enable CORS
app.use(express.json());

// ... (other routes and middleware)

app.post('/upload', (req, res) => {
  // Handle file upload logic here
  res.status(200).send('File uploaded successfully');
});

// WebSocket logic
io.on('connection', (socket) => {
  console.log('WebSocket connection established');
  
  // Your WebSocket logic goes here
  // Handle WebSocket events here
  io.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    
  });
});


io.on('connection', (socket: Socket) => {
  console.log('WebSocket connection established');

  // Access connected sockets (clients)
  const connectedSockets = io.sockets.sockets;
  console.log('Connected clients:', Object.keys(connectedSockets));

  // Handle WebSocket events here
  socket.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import http from 'http';
import app from './App/app.js';
import { Server } from "socket.io";


const PORT = process.env.PORT;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow requests from any origin (replace with your domain)
        methods: ["GET", "POST"], // Allow GET and POST requests
    }
});

io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for client joining a sport room
    socket.on('joinRoom', (sport) => {
        socket.join(sport);
        console.log(sport);
        // Send current bid for the sport to the client
    });

    // Listen for new bids


    // Broadcast new bid to all clients in the sport room
    socket.on('placeBid', ({ sport, player, bid, currentBid }) => {
        if (bid > currentBid) {
            io.to(sport).emit('currentBid', { playerName: player, bid });
            console.log(`${player} placed bid ${bid} in room ${sport}`);
        } else {
            console.log("Bid amount should be greater than the current bid");
        }

    });




    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, console.log(`Server is running on ${PORT}`));
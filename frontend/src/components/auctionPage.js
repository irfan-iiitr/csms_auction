// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import io from 'socket.io-client';


// function AuctionPage() {

//     const location = useLocation();
//     const { fromHome } = location.state;
//     let data = fromHome.data;


//     const socket = io("http://localhost:2030");
//     socket.emit('joinRoom', data.sportName);

//     const [players, setPlayers] = useState([]);

//     useEffect(() => {
//         getAllPlayers();
//     },[]);

//     async function getAllPlayers() {
//         const response = await axios.post("http://localhost:2030/api/v1/players/sport", { "sportName": data.sportName });
//         console.log(response.data);
//         setPlayers(response.data);
//     }

//     function handleSubmit(){

//     }

//     return (
//         <div className="flex">


//             <div className="flex flex-col w-[75%]">
//                 <h1>Players</h1>
//                 {players.map((player) => {
//                     return <div className="flex justify-around bg-green-300 border border-pink-900 border-1 border-dotted m-2 p-4">
//                         <h1>Name:{player.name}</h1>
//                         <p>CurrentBid:{player.basePrice}</p>
//                     </div>;
//                 })}

//                 <form>
//                     <input type="text">Enter tthe player that you want to bid for</input>
//                     <input type="text">Enter the amount</input>
//                     <button onClick={handleSubmit}>submit</button>
//                 </form>

//             </div>

//             <div>
//                 <h1>TeamLeaders</h1></div>




//         </div>
//     );


// }

// export default AuctionPage;


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import io from 'socket.io-client';

// function AuctionPage() {
//     const location = useLocation();
//     const { fromHome } = location.state;
//     const data = fromHome.data;

//     const [players, setPlayers] = useState([]);
//     const [playerName, setPlayerName] = useState("");
//     const [bidAmount, setBidAmount] = useState("");
//     const [bids, setBids] = useState({});

//     const socket = io("http://localhost:2030");

//     useEffect(() => {
//         socket.emit('joinRoom', data.sportName);

//         getAllPlayers();

//         // Clean up the socket connection when component unmounts
//         return () => {
//             socket.disconnect();
//         };
//     }, [data.sportName, socket]);

//     async function getAllPlayers() {
//         try {
//             const response = await axios.post("http://localhost:2030/api/v1/players/sport", { sportName: data.sportName });
//             setPlayers(response.data);
//         } catch (error) {
//             console.error("Error fetching players:", error);
//         }
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         // Add your logic to handle form submission, like emitting a socket event with bid data
//         socket.emit('placeBid', { playerName, bidAmount });
//         // Reset form fields
//         setPlayerName("");
//         setBidAmount("");
//     }

//     return (
//         <div className="flex">
//             <div className="flex flex-col w-[100%]">
//                 <h1>Players</h1>
//                 {players.map((player) => (
//                     <div key={player.id} className="flex justify-around bg-green-300 border border-pink-900 border-1 border-dotted m-2 p-4">
//                         <h1>Name: {player.name}</h1>
//                         <p>Base Price: {player.basePrice}</p>
//                     </div>
//                 ))}

//                 <form onSubmit={handleSubmit}>
//                     <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Enter the player that you want to bid for" />
//                     <input type="text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Enter the amount" />
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AuctionPage;


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import io from 'socket.io-client';

// function AuctionPage() {
//     const location = useLocation();
//     const { fromHome } = location.state;
//     const data = fromHome.data;

//     const [players, setPlayers] = useState([]);
//     const [bids, setBids] = useState([]);

//     const [playerName, setPlayerName] = useState("");
//     const [bidAmount, setBidAmount] = useState("");


//     useEffect(() => {

//         const socket = io("http://localhost:2030");
//         socket.emit('joinRoom', data.sportName);
//         socket.on('currentBid', ({ playerName, bid }) => {
//             setBids(prevBids => {
//                 // Update bid for the specific player
//                 const updatedBids = [...prevBids];
//                 const index = updatedBids.findIndex(item => item.player === playerName);
//                 if (index !== -1) {
//                     updatedBids[index] = { player: playerName, bid: bid };
//                 } else {
//                     updatedBids.push({ player: playerName, bid: bid });
//                 }
//                 return updatedBids;
//             });
//         });

//         getAllPlayers();

//         // Clean up the socket connection when component unmounts
//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     async function getAllPlayers() {
//         try {
//             const response = await axios.post("http://localhost:2030/api/v1/players/sport", { sportName: data.sportName });
//             setPlayers(response.data);
//             // Initialize bids for each player to 0
//             const initialBids = response.data.map(player => ({ player: player.name, bid: 0 }));
//             setBids(initialBids);
//         } catch (error) {
//             console.error("Error fetching players:", error);
//         }
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         // Add logic to handle form submission
//         const currentPlayerBidIndex = bids.findIndex(item => item.player === playerName);
//         const currentBid = currentPlayerBidIndex !== -1 ? bids[currentPlayerBidIndex].bid : 0;
//         socket.emit('placeBid', { sport: data.sportName, player: playerName, bid: bidAmount, currentBid: currentBid });
//         // Reset form fields
//         setPlayerName("");
//         setBidAmount("");
//     }

//     return (
//         <div className="flex">
//             <div className="flex flex-col w-[100%]">
//                 <h1>Players</h1>
//                 {players.map((player) => {
//                     const playerBid = bids.find(item => item.player === player.name);
//                     const currentBid = playerBid ? playerBid.bid : 0;
//                     return (
//                         <div key={player.id} className="flex justify-around bg-green-300 border border-pink-900 border-1 border-dotted m-2 p-4">
//                             <h1>Name: {player.name}</h1>
//                             <p>Base Price :{player.basePrice}</p>
//                             <p>Current Bid: {currentBid}</p> {/* Display bid for each player */}
//                         </div>
//                     );
//                 })}

//                 <form onSubmit={handleSubmit}>
//                     <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Enter the player that you want to bid for" />
//                     <input type="text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Enter the amount" />
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AuctionPage;

// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import io from 'socket.io-client';

// function AuctionPage() {
//     const location = useLocation();
//     const { fromHome } = location.state;
//     const data = fromHome.data;

//     const [players, setPlayers] = useState([]);
//     const [bids, setBids] = useState([]);
//     const [playerName, setPlayerName] = useState("");
//     const [bidAmount, setBidAmount] = useState("");
//     const socketRef = useRef(null);

//     // Establish socket connection only once when component mounts
//     useEffect(() => {
//         socketRef.current = io("http://localhost:2030");
        
//         // Emit 'joinRoom' event when component mounts
//         socketRef.current.emit('joinRoom', data.sportName);
        
//         // Listen for 'currentBid' event
//         socketRef.current.on('currentBid', ({ playerName, bid }) => {
//             setBids(prevBids => {
//                 // Update bid for the specific player
//                 const updatedBids = [...prevBids];
//                 const index = updatedBids.findIndex(item => item.player === playerName);
//                 if (index !== -1) {
//                     updatedBids[index] = { player: playerName, bid: bid };
//                 } else {
//                     updatedBids.push({ player: playerName, bid: bid });
//                 }
//                 return updatedBids;
//             });
//         });

//         getAllPlayers(); // Fetch players when component mounts

//         // Clean up the socket connection when component unmounts
//         return () => {
//             socketRef.current.disconnect();
//         };
//     }, []); // Empty dependency array ensures useEffect runs only once when component mounts

//     async function getAllPlayers() {
//         try {
//             const response = await axios.post("http://localhost:2030/api/v1/players/sport", { sportName: data.sportName });
//             setPlayers(response.data);
//             // Initialize bids for each player to 0
//             const initialBids = response.data.map(player => ({ player: player.name, bid: 0 }));
//             setBids(initialBids);
//         } catch (error) {
//             console.error("Error fetching players:", error);
//         }
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         // Add logic to handle form submission
//         const currentPlayerBidIndex = bids.findIndex(item => item.player === playerName);
//         const currentBid = currentPlayerBidIndex !== -1 ? bids[currentPlayerBidIndex].bid : 0;
//         const socket = io("http://localhost:2030"); // Establish socket connection
//         socket.emit('placeBid', { sport: data.sportName, player: playerName, bid: bidAmount, currentBid: currentBid });
//         socket.disconnect(); // Disconnect socket after emitting event
//         setPlayerName("");
//         setBidAmount("");
//     }

//     return (
//         <div className="flex">
//             <div className="flex flex-col w-[100%]">
//                 <h1>Players</h1>
//                 {players.map((player) => {
//                     const playerBid = bids.find(item => item.player === player.name);
//                     const currentBid = playerBid ? playerBid.bid : 0;
//                     return (
//                         <div key={player.id} className="flex justify-around bg-green-300 border border-pink-900 border-1 border-dotted m-2 p-4">
//                             <h1>Name: {player.name}</h1>
//                             <p>Base Price :{player.basePrice}</p>
//                             <p>Current Bid: {currentBid}</p> {/* Display bid for each player */}
//                         </div>
//                     );
//                 })}

//                 <form onSubmit={handleSubmit}>
//                     <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Enter the player that you want to bid for" />
//                     <input type="text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Enter the amount" />
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AuctionPage;

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import io from 'socket.io-client';

function AuctionPage() {
    const location = useLocation();
    const { fromHome } = location.state;
    const data = fromHome.data;

    const [players, setPlayers] = useState([]);
    const [bids, setBids] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [bidAmount, setBidAmount] = useState("");
    const socketRef = useRef(null);

    // Establish socket connection only once when component mounts
    useEffect(() => {
        socketRef.current = io("http://localhost:2030");
        
        // Emit 'joinRoom' event when component mounts
        socketRef.current.emit('joinRoom', data.sportName);
        
        // Listen for 'currentBid' event
        socketRef.current.on('currentBid', ({ playerName, bid }) => {
            setBids(prevBids => {
                // Update bid for the specific player
                const updatedBids = [...prevBids];
                const index = updatedBids.findIndex(item => item.player === playerName);
                if (index !== -1) {
                    updatedBids[index] = { player: playerName, bid: bid };
                } else {
                    updatedBids.push({ player: playerName, bid: bid });
                }
                return updatedBids;
            });
        });

        getAllPlayers(); // Fetch players when component mounts

        // Clean up the socket connection when component unmounts
        return () => {
            socketRef.current.disconnect();
        };
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts

    async function getAllPlayers() {
        try {
            const response = await axios.post("http://localhost:2030/api/v1/players/sport", { sportName: data.sportName });
            setPlayers(response.data);
            // Initialize bids for each player to 0
            const initialBids = response.data.map(player => ({ player: player.name, bid: 0 }));
            setBids(initialBids);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Add logic to handle form submission
        const currentPlayerBidIndex = bids.findIndex(item => item.player === playerName);
        const currentBid = currentPlayerBidIndex !== -1 ? bids[currentPlayerBidIndex].bid : 0;
        socketRef.current.emit('placeBid', { sport: data.sportName, player: playerName, bid: bidAmount, currentBid: currentBid });
        // Reset form fields
        setPlayerName("");
        setBidAmount("");
    }

    return (
        <div className="flex">
            <div className="flex flex-col w-[100%]">
                <h1>Players</h1>
                {players.map((player) => {
                    const playerBid = bids.find(item => item.player === player.name);
                    const currentBid = playerBid ? playerBid.bid : 0;
                    return (
                        <div key={player.id} className="flex justify-around bg-green-300 border border-pink-900 border-1 border-dotted m-2 p-4">
                            <h1>Name: {player.name}</h1>
                            <p>Base Price :{player.basePrice}</p>
                            <p>Current Bid: {currentBid}</p> {/* Display bid for each player */}
                        </div>
                    );
                })}

                <form onSubmit={handleSubmit}>
                    <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Enter the player that you want to bid for" />
                    <input type="text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Enter the amount" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AuctionPage;


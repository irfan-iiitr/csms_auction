

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
    const [bidAmount, setBidAmount] = useState(0);
    const [isTeamLeader, setIsTeamLeader] = useState(false); // State to store team leader status
    const [teamLeaderPlayer, setTeamLeaderPlayer] = useState(null);
    const [isSavedBid,setIsSavedBid]=useState(true);
    const [remainingTime,setRemainingTime]=useState(false);
    const [isTeam,setIsTeam]=useState(false);


    // State to store team leader player data

    const [teamLeaderSport,setTeamLeaderSport]=useState("");
    const socketRef = useRef(null);

useEffect(() => {
    // Load current bids from localStorage when the component mounts
    const savedBids = localStorage.getItem('bids');
    if (savedBids) {
        setIsSavedBid(true);
        setBids(JSON.parse(savedBids));
    }

    socketRef.current = io("http://localhost:2030");
    
    socketRef.current.emit('joinRoom', data.sportName);
    
    socketRef.current.on('currentBid', ({ playerName, bid }) => {
        setBids(prevBids => {
            //console.log("my bid",bid);
            const updatedBids = [...prevBids];
            const index = updatedBids.findIndex(item => item.player === playerName);
            if (index !== -1) {
                updatedBids[index] = { player: playerName, bid: bid };
            } else {
                updatedBids.push({ player: playerName, bid: bid });
            }
            // Save updated bids to localStorage
            localStorage.setItem('bids', JSON.stringify(updatedBids));
            return updatedBids;
        });
    });

    getAllPlayers();

    return () => {
        socketRef.current.disconnect();
    };
}, []);

async function getAllPlayers() {
    try {
        const response = await axios.post("http://localhost:2030/api/v1/players/sport", { sportName: data.sportName });
        setPlayers(response.data);

        // Only initialize bids if it's not already set
        if (!isSavedBid) {
            const initialBids = response.data.map(player => ({ player: player.name, bid: 0 }));
            setBids(initialBids);

            // Save initial bids to localStorage
            localStorage.setItem('bids', JSON.stringify(initialBids));
        }

        // Check if the user is a team leader
        const userEmail = 'pv@gmail.com'; // Replace with actual user's email or retrieve dynamically
        const isTeamLeaderResponse = await axios.post("http://localhost:2030/api/v1/players/isteamleader", { email: userEmail });
        console.log(isTeamLeaderResponse);
     
        const teamLeaderSportId=isTeamLeaderResponse.data.player.SportName[0];
 
        const teamLeaderSportResponse=await axios.get(`http://localhost:2030/api/v1/sports/${teamLeaderSportId}`);
        const teamLeaderSportName=teamLeaderSportResponse.data.name;
  
        setTeamLeaderSport(teamLeaderSportName);

        setIsTeamLeader(isTeamLeaderResponse.data.msg);
        if(isTeamLeaderResponse.data.msg){
            const id=isTeamLeaderResponse.data.player._id;
            const team=await axios.get(`http://localhost:2030/api/v1/teams/team/${id}`);
            setIsTeam(team.data.msg);
        }
        if (isTeamLeaderResponse.data.player) {
            setTeamLeaderPlayer(isTeamLeaderResponse.data.player[0]);
        }
        console.log(isTeamLeaderResponse.data);
    } catch (error) {
        console.error("Error fetching players:", error);
    }
}


    function handleSubmit(event) {
        // event.preventDefault();
        const currentPlayerBidIndex = bids.findIndex(item => item.player === event.target.value);
        const currentBid = currentPlayerBidIndex !== -1 ? bids[currentPlayerBidIndex].bid : 0;
        setBidAmount(currentBid+1000);
        socketRef.current.emit('placeBid', { sport: data.sportName, player: event.target.value, bid:currentBid+10000, currentBid: currentBid });
        setPlayerName("");
        setBidAmount("");
    }

    return ( 
        <div className="flex">
            <div className="flex flex-col w-[100%]">
                <h1>Players</h1>
                {players.map((player) => {
                    const playerBid = bids.find(item => item.player === player.name);
                    const currentBid = playerBid?.bid;
                    return (
                        <div key={player.id} className="flex justify-around bg-green-300 border border-pink-900 border-1 border-dotted m-2 p-4">
                            <h1>Name: {player.name}</h1>
                            <p>Base Price :{player.basePrice}</p>
                            <p>Current Bid: {currentBid}</p>
                            {isTeamLeader && teamLeaderSport===data.sportName && <button onClick={handleSubmit} value={player.name}>+</button> }

                        </div>
                    );
                })}
        

                {!isTeam && <input placeholder="Enter your name"></input>}

            </div>
        </div>
    );
}

export default AuctionPage;






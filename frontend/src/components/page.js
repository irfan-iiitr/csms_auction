import React, { useEffect, useState } from "react";
import axios from "axios";
import SportsCard from "./card";
import Cricket from "../images/cricket.png";
import FootBall from "../images/football.png";
import TableTennis from "../images/table-tennis.png";
import Hockey from "../images/athlete.png";
import Kabaddi from "../images/game.png";



function Page() {
    const [sports, setSports] = useState([]);

    useEffect(() => {
        getAllSports();
    }, []);

    async function getAllSports() {
        try {
            const response = await axios.get("http://localhost:2030/api/v1/sports/");
            setSports(response.data);
        } catch (error) {
            console.error("Error fetching sports:", error);
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <h1 className="text-center">Auction System</h1>
            <div className="flex flex-wrap justify-center object-contain">
                {sports.map((sport, index) => (
                    <SportsCard key={index} name={sport.name} url={getImageUrl(sport.name)}/>
                ))}
            </div>

        </div>
    );
}

// Function to map sport name to corresponding image URL
function getImageUrl(sportName) {
    switch (sportName) {
        case "Cricket":
            return Cricket;
        case "FootBall":
            return FootBall;
        case "TableTennis":
            return TableTennis;
        case "Hockey":
            return Hockey;
        case "Kabaddi":
            return Kabaddi;
        default:
            return "";
    }
}

export default Page;

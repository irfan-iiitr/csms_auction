import React from "react";
import { Link } from "react-router-dom";

function SportsCard(props) {
    // const socket=props.sockets;
    const data={sportName:props.name}

    // function handleClick(){
    //     socket.emit('joinRoom', props.name);
    // }
    return (
        <Link to="/auction-page" state={{ fromHome: { data } }}>
            <div className="flex flex-col items-center flex-wrap">
                <div className="bg-green-300 rounded-full m-4">
                    <img className="p-10 w-[180px] h-[180px]" src={props.url} alt={props.name} />
                </div>
                <p className="text-green-600">{props.name}</p>
            </div>
        </Link>
    );
}

export default SportsCard;


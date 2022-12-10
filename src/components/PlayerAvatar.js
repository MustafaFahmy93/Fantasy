import React from 'react'
import { Avatar } from "@material-tailwind/react";
import playerAvater from "../assets/img/13_1.png"
const PlayerAvatar = () => {
    return (
        <div className="inline-block pb-32 w-4/12 player">
            <Avatar src={playerAvater} alt="avatar" />
            <p>player</p>
            {/* <Avatar src={playerAvater} alt="avatar" variant="circular" /> */}
        </div>
    )
}

export default PlayerAvatar
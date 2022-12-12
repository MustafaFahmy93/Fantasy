import React, { } from 'react'
import { Avatar } from "@material-tailwind/react";
import playerAvater from "../assets/img/13_1.png"

import { motion } from "framer-motion"
const PlayerAvatar = ({ name, tPower }) => {
    const item = {
        visible: {
            opacity: 1, y: 0,
            transition: {
                duration: 0.5,
            }
        },
        hidden: { opacity: 0, y: -100 },
    }
    // console.log(["name", name]);
    return (

        <motion.div
            variants={item}
            className="inline-block w-1/5">

            <div className="relative">
                <Avatar src={playerAvater} alt="avatar" />
                <span className="text-center text-sm absolute h-5 w-5 rounded-full bg-newColor top-0 right-2.5 pt-0" >
                    {tPower}
                </span>
                <p>{name}</p>
            </div>
            {/* <Avatar src={playerAvater} alt="avatar" variant="circular" /> */}
        </motion.div>
    )
}

export default PlayerAvatar
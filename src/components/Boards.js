import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    // Tooltip,
} from "@material-tailwind/react";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useContext, useEffect, useState } from 'react';
import PlayerAvatar from "./PlayerAvatar";
import format from "../data/fantacy.json";
import players from "../data/players.json";
import AppConfig from "../context/AppConfig";
import { motion } from "framer-motion";
import { teamBuilder, teamBuilderRandom, teamTotalPower } from '../fantasy/teams'

const Boards = () => {
    const { config } = useContext(AppConfig);
    const teamSize = config.teamSize;
    const nTeams = config.nTeams;
    // const TeamFormats = ["1", "2", "1"];
    const teams = teamBuilder(nTeams, teamSize);
    // const teams = teamBuilderRandom(3, 5);
    const [formatChange, setFormat] = useState(0)
    const [teamIndex, setTeamIndex] = useState(0)
    const [btnRight, setBtnRight] = useState(true);
    const [btnLeft, setBtnLeft] = useState(false);
    const teamA = teams[teamIndex];
    console.log(teamA);
    const teamPower = teamTotalPower(teamA);
    let playerNaumber = 0;
    const handleChangeTeam = (dir) => {
        let newTeamIndex = teamIndex;
        let len = parseInt(nTeams) - 1;


        if (dir === "right") {
            if (newTeamIndex + 1 <= len) {
                formatChange === 0 ? setFormat(1) : setFormat(0);
                newTeamIndex++;
                setTeamIndex(newTeamIndex);
                if (newTeamIndex > 0) {
                    setBtnLeft(true)
                }
                if (newTeamIndex === len) {
                    setBtnRight(false);
                }

            }
        } else if (dir === "left") {

            if (teamIndex - 1 > -1) {
                newTeamIndex--
                formatChange === 0 || formatChange === 2 ? setFormat(1) : setFormat(0);
                setTeamIndex(newTeamIndex)
                if (newTeamIndex < len) {
                    setBtnRight(true)
                }
                if (newTeamIndex === 0) {
                    setBtnLeft(false);
                }

            }
        }
    }
    // console.log(teamTotalPower(teams[0]));
    // console.log(teamA[0]);
    const teamFormat = {
        "11": ["4-3-3", "5-3-2", "0-0"],
        "5": ["3-1", "2-2", "0-0",]
    };
    const teamStyle = {
        "5": "grid-block grid-cols-5 gap-4 mb-20 space-x-10 pt-2.5",
        "11": "grid-block grid-cols-5 gap-4 mb-8 space-x-0 pt-2.5",
    }

    const list = {
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        },
        hidden: { opacity: 0 },
    }
    const getNewplayer = () => {
        if (playerNaumber + 1 < teamA.length) {
            playerNaumber++
        }
    }
    return (
        <div className="flex justify-center relative top-12 text-white">


            <Card className="w-128 board-bg" >
                <CardHeader className="relative h-8 text-center text-xl font-black" >
                    Team {teamIndex + 1}
                </CardHeader>

                <CardBody>
                    {/* <div className="text-center board "> */}
                    <div className="w-10 h-112 absolute z-20 left-0 rounded-full"
                        onClick={() => {
                            handleChangeTeam("left")
                        }}
                    >
                        {btnLeft && <BsChevronCompactLeft size={40} className="h-full" />}
                    </div>
                    <div className="w-10 h-112 absolute z-20 right-0 rounded-full "
                        onClick={() => {
                            handleChangeTeam("right")
                        }}
                    >
                        {btnRight && <BsChevronCompactRight size={40} className="h-full" />}
                    </div>
                    <motion.div
                        initial="hidden"
                        animate={"visible"}
                        variants={list}
                        key={Math.random()}
                        className="text-center board">
                        {/* className="text-center bg-[url('/src/assets/img/board2.png')] board"> */}

                        {

                            format.format[teamSize][teamFormat[teamSize][formatChange]].map((row, rowIndex) => (

                                <div id="notif"
                                    key={Math.random()}
                                    className={teamStyle[teamSize]}>
                                    {
                                        console.log(playerNaumber)
                                    }
                                    {
                                        row.map((player, index) => (
                                            <PlayerAvatar key={Math.random()} name={teamA[playerNaumber].name} tPower={teamA[playerNaumber].totalPower}>
                                                {
                                                    getNewplayer()


                                                }
                                            </PlayerAvatar>

                                        ))
                                    }
                                </div>
                            ))
                        }
                    </motion.div>

                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                    <Typography variant="small">{teamPower}</Typography>
                    <Typography variant="small" color="gray" className="flex gap-1 text-white">
                        <i className="fas fa-map-marker-alt fa-sm mt-[3px] text-whait" />
                        Barcelona, Spain
                    </Typography>
                </CardFooter>
            </Card>
        </div >
    );
}

export default Boards
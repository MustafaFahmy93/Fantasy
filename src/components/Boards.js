import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    // Tooltip,
} from "@material-tailwind/react";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useContext, useState } from 'react';
import PlayerAvatar from "./PlayerAvatar";
import format from "../data/fantacy.json";
// import players from "../data/players.json";
import AppConfig from "../context/AppConfig";
import { motion } from "framer-motion";
import { teamBuilder, teamBuilderRandom, teamBuilderCaptainsRandom, teamTotalPower, getTeamName } from '../fantasy/teams'
import PlayersConfig from "../context/PlayersConfig";
let teams = [[], [], [], [], []]
const Boards = () => {
    const { config, setBuildTeams } = useContext(AppConfig);
    const { players } = useContext(PlayersConfig);
    const teamSize = config.teamSize;
    const nTeams = config.nTeams;
    // const TeamFormats = ["1", "2", "1"];
    // console.log(["buildTeams", config.buildTeams])

    if (config.buildTeams && players.length > 0) {
        if (config.mode === 1) {
            teams = teamBuilderRandom(players, nTeams, teamSize);
            setBuildTeams(false);
        }
        else if (config.mode === 2) {
            teams = teamBuilder(players, nTeams, teamSize);
            setBuildTeams(false);
        }
        else if (config.mode === 3) {
            teams = teamBuilderCaptainsRandom(players, config.captainsId, nTeams, teamSize)
            // console.log(["teams", teams])
            setBuildTeams(false);
            // const teams = teamBuilderRandom(3, 5);
        }
    }




    // console.log("teams");
    // console.log(teams);

    const [formatChange, setFormat] = useState(0)
    const [teamIndex, setTeamIndex] = useState(0)
    const [btnRight, setBtnRight] = useState(true);
    const [btnLeft, setBtnLeft] = useState(false);
    const teamA = teams[teamIndex];
    // console.log("teamA");
    // console.log(teamA);

    const teamPower = teamTotalPower(teamA, teamSize);
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

    return (
        <div className="flex justify-center relative top-12 text-white">


            <Card className="w-128 board-bg" >
                <CardHeader className="relative h-8 text-center text-xl font-black" >
                    {/* Team {teamIndex + 1} */}
                    Team {getTeamName(teamA, config.captainsId)}
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
                    <div className="board">


                        <motion.div
                            initial="hidden"
                            animate={"visible"}
                            variants={list}
                            key={Math.random()}
                            className="text-center">


                            {


                                format.format[teamSize][teamFormat[teamSize][formatChange]].map((row, rowIndex) => (

                                    <div
                                        key={Math.random()}
                                        className={teamStyle[teamSize]}>
                                        {
                                            row.map((player, index) => (

                                                teamA.length > playerNaumber &&
                                                <PlayerAvatar key={Math.random()} name={teamA[playerNaumber].name}
                                                    tColor={teamA[playerNaumber].tcolor}
                                                    tPower={teamA[playerNaumber].total}>
                                                    {playerNaumber++}
                                                </PlayerAvatar>


                                            )
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </motion.div>
                    </div>

                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                    <Typography variant="small">Team Overall: {teamPower}</Typography>
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
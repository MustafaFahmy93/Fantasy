import { Fragment, useState, useContext, useEffect } from "react";
import {
    Button,
    // Dialog,
    // DialogHeader,
    // DialogBody,
    // DialogFooter,
    Select,
    Option
} from "@material-tailwind/react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PlayersConfig from "../context/PlayersConfig";
import AppConfig from "../context/AppConfig";
import { playersFilter } from "../fantasy/teams"
import { playersStore } from "../context/PlayersContext";

const Captains = () => {
    const { config, setMode, setCaptains } = useContext(AppConfig);
    const players = playersStore(state => state.playersData)

    const [open, setOpen] = useState(false);

    let captains = new Array(config.nTeams);
    let avaPlayers = playersFilter(players)
    const handleOpen = () => {

        setOpen(!open)


    };
    const [currentSelValue, setSelValue] = useState("Balance");
    useEffect(() => {
        if (config.mode === 1) setSelValue("Random")
        else if (config.mode === 2) setSelValue("Balance")
        else if (config.mode === 3) setSelValue("Min-Max Distribution")
        else if (config.mode === 4) setSelValue("Leaders with Random")

    }, [config.mode])
    const handleConfirm = () => {
        // const cLen = captains.length;
        // console.log(["cap", captains, config.nTeams])
        const uniq = [...new Set(captains)];

        if (uniq.length === parseInt(config.nTeams)) {
            setMode(4);
            setCaptains(captains);
            handleOpen();
        } else {
            if (captains.length === parseInt(config.nTeams)) {
                alert("Choose different captains")
            } else {
                alert("Choose all captains")
            }
        }


    }
    return (
        <div>
            <div className="w-72">
                <Select label="Mode" className="text-white" value={currentSelValue}>
                    <Option value={currentSelValue} onClick={() => setMode(1)}>Random</Option>
                    <Option value={currentSelValue} onClick={() => setMode(2)}>Balance</Option>
                    <Option value={currentSelValue} onClick={() => setMode(3)}>Min-Max Distribution</Option>
                    <Option value={currentSelValue} onClick={() => {
                        handleOpen();

                    }}>Leaders with Random</Option>
                </Select>
            </div>
            {/* <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline inline-block lg:top-0 relative top-2"
                onClick={handleClickOpen}
            >Edit</p> */}
            <Dialog
                open={open}
                onClose={handleOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Captains
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col w-full list-show">
                        {
                            [...Array(parseInt(config.nTeams))].map((e, i) =>
                                <div className="p-3 w-full relative" key={i}>

                                    <Select label={"Captain " + (i + 1)} className="relative">
                                        {
                                            avaPlayers.map((player, ip) => (
                                                < Option key={ip}
                                                    className="relative"
                                                    onClick={() => {
                                                        captains[i] = player.id
                                                        // console.log(captains)

                                                    }
                                                    }
                                                > {player.name}</Option>

                                            ))
                                        }

                                    </Select>
                                </div>
                            )

                        }
                    </div>
                </DialogContent>
                <DialogActions>

                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={() => {
                        handleConfirm()
                    }
                    }>
                        <span>Confirm</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Captains
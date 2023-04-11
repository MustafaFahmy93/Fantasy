import { Fragment, useState, useEffect } from "react";
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Button,
    Input,
    Switch,
    Option,
    Select
} from "@material-tailwind/react";

import { updatePlayerDB } from "../db/db";
import { playersStore } from "../context/PlayersContext";
import { muiStore } from "../context/muiContext";

const UpdatePlayer = ({ playerData }) => {
    const updatePlayersData = playersStore(state => state.updatePlayersData);
    const [open, setOpen] = useState(false);
    const setNotify = muiStore(state => state.setNotify)
    const [notifiy, setNotifiy] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        msg: "Hello, welcome to Xtend.",
        type: "success"
    })


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdatePlayer = async (e) => {
        e.preventDefault();
        const player = {
            name,
            tcolor: tshirt,
            status
        }
        updatePlayerDB(playerData.id, {
            ...player,
        }).then(() => {

            setNotify({
                open: true,
                vertical: 'buttom',
                horizontal: 'left',
                msg: "The player has been updated successfully",
                type: "success"
            })

            updatePlayersData()
            handleClose()
        }).catch(err => {
            console.log(err);
            setNotify({
                open: true,
                vertical: 'buttom',
                horizontal: 'left',
                msg: "Something went wrong, please refresh your browser and try again.",
                type: "error"
            })
        });

    };
    // 
    const [tshirt, setTshirt] = useState(playerData.tcolor);
    const [status, setStatus] = useState(playerData.status);
    const [name, setName] = useState(playerData.name);
    return (
        <div>

            <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline inline-block lg:top-0 relative top-2"
                onClick={handleClickOpen}
            >Edit</p>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="flex flex-wrap w-full p-3">
                            {/* <div className="md:w-12/12 sm:w-full w-full md:pd-0 sm:pb-3 pb-3 sm:pr-3 pr-0 "> */}
                            <div className="md:w-12/12 sm:w-full w-full md:pd-0 sm:pb-3 pb-3 sm:pr-3 pr-0">
                                <Input label="Name" onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className="md:w-8/12 sm:w-8/12 w-full">
                                <Select label="T-Shirt" value={tshirt}>
                                    <Option onClick={() => setTshirt("black")} value={"black"}><p className="text-gray-900">Black</p></Option>
                                    <Option onClick={() => setTshirt("white")} value={"white"}><p className="text-gray-600">White</p></Option>
                                    <Option onClick={() => setTshirt("red")} value={"red"}><p className="text-red-900">Red</p></Option>
                                    <Option onClick={() => setTshirt("blue")} value={"blue"}><p className="text-light-blue-700">Blue</p></Option>
                                    <Option onClick={() => setTshirt("black-white")} value={"black-white"}><p className="text-gray-900 inline-block">Black-</p><p className="text-gray-600 inline-block">White</p></Option>
                                </Select>
                            </div>
                            <div className="flex flex-col md:w-4/12 sm:w-4/12 w-full items-center relative md:left-4 left-0">
                                <label className="font-bold text-gray-900 text-center">
                                    Available
                                </label>
                                {
                                    status && <Switch defaultChecked onClick={() => setStatus(false)} />
                                }
                                {
                                    !status && <Switch onClick={() => setStatus(true)} />
                                }


                            </div>
                        </div>


                        {/* </div> */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            handleClose()
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleUpdatePlayer}>
                        <span>Update</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default UpdatePlayer
import { Fragment, useState, useContext } from "react";
import {
    Button,
    DialogFooter,
    Typography
} from "@material-tailwind/react";
// import { players } from "../data/players.js"
// import axios from "axios";
import UpdatePlayer from "./UpdatePlayer";
import AppConfig from "../context/AppConfig";
import { playersStore } from "../context/PlayersContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { delplayerDB } from "../db/db";
import { muiStore } from "../context/muiContext";

const PlayersList = () => {
    // const { players, LoadPlayers } = useContext(PlayersConfig);
    const setNotify = muiStore(state => state.setNotify)
    const players = playersStore(state => state.playersData)
    const updatePlayersData = playersStore(state => state.updatePlayersData)
    const { setMode, setHideBoard } = useContext(AppConfig);

    const [open, setOpen] = useState(false);
    // const [players, setPlayers] = useState([]);
    const handleOpen = () => {
        // alert("done")
        setOpen(!open)
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {

                delplayerDB(id).then(() => {
                    setHideBoard(false)
                    handleOpen()
                    setNotify({
                        open: true,
                        vertical: 'buttom',
                        horizontal: 'left',
                        msg: "The player has been deleted successfully.",
                        type: "success"
                    })
                    setMode(2)
                    updatePlayersData()
                }).catch((err) => {
                    console.error(err)
                    setNotify({
                        open: true,
                        vertical: 'buttom',
                        horizontal: 'left',
                        msg: "Something went wrong, please refresh your browser and try again.",
                        type: "error"
                    })
                })

                // alert("Done");


            } catch (err) {
                console.log(err);
                // alert("Something went wrong delete");
            }
        }

    };

    return (
        <div>
            <p onClick={(e) => {
                e.preventDefault()
                setHideBoard(true)
                setMode(1)
                handleOpen()
            }}
                className="cursor-pointer flex items-center">
                Players
            </p>
            <Dialog
                open={open}
                onClose={handleOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Players list
                </DialogTitle>
                <DialogContent>
                    <table className="border-collapse w-full h-full">
                        <thead>
                            <tr>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">#ID</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Overall</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">

                            {

                                players.map((player, index) => (
                                    <tr key={index} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">#ID</span>
                                            {index + 1}
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Name</span>
                                            {player.name}
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Overall</span>
                                            {player.total}
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                            <span className={player.status ? "rounded bg-green-400 py-1 px-3 text-xs font-bold" : "rounded bg-red-400 py-1 px-3 text-xs font-bold"}>
                                                {/* {player.status === 1 ? "Available" : "Unavailable"} */}
                                                {player.status && "Available"}
                                                {player.status === false && "Unavailable"}
                                            </span>
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800  border border-b lg:text-center block lg:table-cell relative lg:static text-right">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                                            <div onClick={() => (0)}
                                                className="inline-block"
                                            >

                                                <UpdatePlayer playerData={player} />
                                            </div>

                                            <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline pl-6 inline-block lg:top-0 relative top-2"
                                                onClick={() => handleDelete(player.id)}
                                            >Remove</p>
                                        </td>
                                    </tr>
                                ))
                            }




                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            setHideBoard(false)
                            setMode(2)

                            handleOpen()
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={() => {
                        setHideBoard(false)
                        setMode(2)
                        handleOpen()
                    }}>
                        <span>Confirm</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PlayersList
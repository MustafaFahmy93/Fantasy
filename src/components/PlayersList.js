import { Fragment, useState, useEffect, useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography
} from "@material-tailwind/react";
// import { players } from "../data/players.js"
import PlayersConfig from "../context/PlayersConfig";
import axios from "axios";
const PlayersList = () => {
    const { players, setPlayers } = useContext(PlayersConfig);

    const [open, setOpen] = useState(false);
    // const [players, setPlayers] = useState([]);
    const handleOpen = () => setOpen(!open);
    const fetchAllPlayers = async () => {
        try {
            const res = await axios.get("http://192.168.0.101:8800/players");
            setPlayers(res.data);
        } catch (err) {
            // alert("Something went wrong get");
            console.log(err);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://192.168.0.101:8800/players/${id}`);
            // window.location.reload()
            fetchAllPlayers();
            alert("Done");
        } catch (err) {
            console.log(err);
            // alert("Something went wrong delete");
        }
    };

    return (
        <Fragment>
            <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-normal"
                onClick={handleOpen}
            >
                <p className="cursor-pointer flex items-center cursor-pointer">
                    Players
                </p>
            </Typography>
            <Dialog open={open} handler={handleOpen} size="xl" className="lg:h-4/5 h-4/5 overflow-y-scroll">
                <DialogHeader>Players</DialogHeader>
                <DialogBody divider>

                    <table className="border-collapse w-full h-full">
                        <thead>
                            <tr>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">#ID</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Total Power</th>
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
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Total Power</span>
                                            {player.total}
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                            <span className={player.status ? "rounded bg-green-400 py-1 px-3 text-xs font-bold" : "rounded bg-red-400 py-1 px-3 text-xs font-bold"}>
                                                {player.status ? "Available" : "Unavailable"}
                                            </span>
                                        </td>
                                        <td className="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                                            <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline inline-block">Edit</p>
                                            <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline pl-6 inline-block"
                                                onClick={() => handleDelete(player.id)}
                                            >Remove</p>
                                        </td>
                                    </tr>
                                ))
                            }




                        </tbody>
                    </table>

                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

export default PlayersList
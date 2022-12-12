import { Fragment, useState, useContext } from "react";
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import InputRange from "./InputRange";
import PlayersConfig from "../context/PlayersConfig";
const AddPlayer = ({ btnStyle }) => {
    const { player, setPlayers, resetPlayer, setName, setPower, setSpeed, setdefence } = useContext(PlayersConfig);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const setPlayername = (e) => {
        const { value } = e.target;
        // console.log(value);
        setName(value);
    }
    const fetchAllPlayers = async () => {
        try {
            const res = await axios.get("http://192.168.0.101:8800/players");
            setPlayers(res.data);
        } catch (err) {
            // alert("Something went wrong get");
            console.log(err);
        }
    };
    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://192.168.0.101:8800/players", player);
            alert(player.name + " has been added to the players list");
            resetPlayer();
            // handleOpen();
            fetchAllPlayers();
        } catch (err) {
            console.log(err);
            // alert("Something went wrong");
            // setError(true)
        }
    };
    return (
        <Fragment>
            <Button onClick={handleOpen} variant="gradient" className={btnStyle} color="indigo">
                Add Player
            </Button>
            <Dialog open={open} handler={handleOpen} size="xl">
                <DialogHeader>Player performance</DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="w-11/12">
                            <Input label="Name" onChange={(e) => setPlayername(e)} value={player.name} />
                        </div>
                        <InputRange inputName={"Power"} playerPower={player.power} disabled={false} method={setPower} />
                        <InputRange inputName={"Speed"} playerPower={player.speed} disabled={false} method={setSpeed} />
                        <InputRange inputName={"defence"} playerPower={player.defence} disabled={false} method={setdefence} />
                        <InputRange inputName={"Total power"} playerPower={player.total} disabled={true} method={() => { }} />

                    </div>
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
                    <Button variant="gradient" color="green" onClick={handleAddPlayer}>
                        <span>Add</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

export default AddPlayer
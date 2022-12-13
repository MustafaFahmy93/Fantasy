import { Fragment, useState, useContext } from "react";
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Switch,
    Option,
    Select
} from "@material-tailwind/react";
import axios from "axios";
import InputRange from "./InputRange";
import PlayersConfig from "../context/PlayersConfig";
import AppConfig from "../context/AppConfig";
const UpdatePlayer = ({ playerAppId }) => {
    // const { players, setPlayers, player, setPlayer, setName, setPace, setShooting, setPassing, setDribbling, setDefending, setPhysicality } = useContext(PlayersConfig);
    const { players, player, resetPlayer, LoadPlayers, LoadPlayer, setName, setStatus, setTcolor, setPace, setShooting, setPassing, setDribbling, setDefending, setPhysicality } = useContext(PlayersConfig);
    const { config, setNTeams, setBuildTeams } = useContext(AppConfig);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        // console.log(["Player", playerAppId])
        // console.log(players)
        // console.log(players[playerAppId])
        // setPlayer(players[playerAppId])
        LoadPlayer(players[playerAppId])
        setOpen(!open)
    };

    const setPlayername = (e) => {
        const { value } = e.target;
        // console.log(value);
        setName(value);
    }
    const fetchAllPlayers = async () => {
        try {
            const res = await axios.get("https://x-tend.solutions/fantasy/api/");
            LoadPlayers(res.data);
            alert("Done");

        } catch (err) {
            // alert("Something went wrong get");
            console.log(err);
        }
    };

    const handleUpdatePlayer = async (e) => {
        e.preventDefault();

        try {
            // await axios.put(`https://x-tend.solutions/fantasy/api/${player.id}`, player);

            await axios.put(`https://x-tend.solutions/fantasy/api/`, player);
            // navigate("/");
            await fetchAllPlayers();
            // setNTeams(config.nTeams);
            setBuildTeams(true);
            // handleOpen();
        } catch (err) {
            console.log(err);
            // setError(true);
        }
    };
    return (
        <Fragment>
            <p className="cursor-pointer text-blue-400 hover:text-blue-600 underline inline-block"
                onClick={handleOpen}
            >Edit</p>
            {/* <Button onClick={handleOpen} variant="gradient" className={btnStyle} color="indigo">
                Update Player
            </Button> */}
            <Dialog open={open} handler={handleOpen} size="xl"
                className="lg:max-w-[50%]  lg:min-w-[50%] lg:h-fit h-4/5 lg:overflow-hidden overflow-y-scroll"
                dismiss={
                    {
                        enabled: false,
                        escapeKey: false,
                        referencePointerDown: false,
                        outsidePointerDown: false,
                        ancestorScroll: false,
                        bubbles: false,
                    }

                }
            >
                <DialogHeader>Player Attributes</DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-wrap w-full">
                        <div className="lg:w-4/12 w-full mr-3 lg:pb-0 pb-2">
                            <Input label="Name" onChange={(e) => setPlayername(e)} value={player.name} />
                        </div>
                        <div className="lg:w-4/12 w-9/12">
                            <Select label="T-Shirt" value={player.tcolor}>
                                <Option onClick={() => setTcolor("black")} value={"black"}><p className="text-gray-900">Black</p></Option>
                                <Option onClick={() => setTcolor("white")} value={"white"}><p className="text-gray-600">White</p></Option>
                                <Option onClick={() => setTcolor("red")} value={"red"}><p className="text-red-900">Red</p></Option>
                                <Option onClick={() => setTcolor("blue")} value={"blue"}><p className="text-light-blue-700">Blue</p></Option>
                                <Option onClick={() => setTcolor("black-white")} value={"black-white"}><p className="text-gray-900 inline-block">Black-</p><p className="text-gray-600 inline-block">White</p></Option>
                            </Select>
                        </div>
                        <div className="flex flex-col w-3/12 items-center h-2 bottom-2 relative pl-3 pt-1">
                            <label className="font-bold text-gray-900 text-center">
                                Available
                            </label>
                            {
                                player.status && <Switch defaultChecked onClick={() => setStatus(false)} />
                            }
                            {
                                !player.status && <Switch onClick={() => setStatus(true)} />
                            }


                        </div>



                        <InputRange inputName={"Pace"} playerPower={player.pace} disabled={false} method={setPace} />
                        <InputRange inputName={"Shooting"} playerPower={player.shooting} disabled={false} method={setShooting} />
                        <InputRange inputName={"Passing"} playerPower={player.passing} disabled={false} method={setPassing} />
                        <InputRange inputName={"Dribbling"} playerPower={player.dribbling} disabled={false} method={setDribbling} />
                        <InputRange inputName={"Defending"} playerPower={player.defending} disabled={false} method={setDefending} />
                        <InputRange inputName={"Physicality"} playerPower={player.physicality} disabled={false} method={setPhysicality} />
                        <InputRange inputName={"OVERALL"} playerPower={player.total} disabled={true} method={() => { }} />

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            resetPlayer()
                            handleOpen()
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleUpdatePlayer}>
                        <span>Update</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment >
    );
}

export default UpdatePlayer
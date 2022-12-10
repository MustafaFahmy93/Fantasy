import { Fragment, useState, useContext } from "react";
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import InputRange from "./InputRange";
import PlayerConfig from "../context/PlayerConfig";
const AddPlayer = () => {
    const { config, resetConfig, setName, setPower, setSpeed, setDefance } = useContext(PlayerConfig);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const setPlayername = (e) => {
        const { value } = e.target;
        // console.log(value);
        setName(value);
    }
    return (
        <Fragment>
            <Button onClick={handleOpen} variant="gradient">
                Add Player
            </Button>
            <Dialog open={open} handler={handleOpen} size="xl">
                <DialogHeader>Player performance</DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="w-11/12">
                            <Input label="Name" onChange={(e) => setPlayername(e)} />
                        </div>
                        <InputRange inputName={"Power"} playerPower={config.power} disabled={false} method={setPower} />
                        <InputRange inputName={"Speed"} playerPower={config.speed} disabled={false} method={setSpeed} />
                        <InputRange inputName={"Defance"} playerPower={config.defance} disabled={false} method={setDefance} />
                        <InputRange inputName={"Total power"} playerPower={config.total} disabled={true} method={() => { }} />

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>OK</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

export default AddPlayer
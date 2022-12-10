import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import board from "../assets/img/board.png"
import PlayerAvatar from "./PlayerAvatar";
import format from "../data/fantacy.json";
const Boards = () => {
    const dummyPlayer = '<div className="inline-block pb-32 w-4/12 player"></div>';
    const TeamFormats = ["1", "2", "1"];

    return (
        <div className="flex justify-center relative top-12">


            <Card className="w-128">
                <CardHeader className="relative h-8 text-center">
                    Team A
                </CardHeader>

                <CardBody className="text-center" >
                    <div className="grid grid-cols-5 gap-4 bg-[url('/src/assets/img/board.png')] board">
                        {
                            format.format["5"]["2"].map((player) => (
                                player === 0 ? < div className="inline-block w-1/5 player" ></div> : <PlayerAvatar />
                            ))
                        }

                    </div>
                    {/* <img
                        src={board}
                        alt="img-blur-shadow"
                        className="h-full w-full"
                    /> */}
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                    <Typography variant="small">$899/night</Typography>
                    <Typography variant="small" color="gray" className="flex gap-1">
                        <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                        Barcelona, Spain
                    </Typography>
                </CardFooter>
            </Card>
        </div >
    );
}

export default Boards
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
const Boards = () => {
    return (
        <div className="flex justify-center relative top-12">


            <Card className="w-128">
                <CardHeader className="relative h-8 text-center">
                    Team A
                </CardHeader>

                <CardBody className="text-center" >
                    <div className="grid grid-cols-3 gap-4 bg-[url('/src/assets/img/board.png')] board">
                        <PlayerAvatar />
                        <PlayerAvatar />
                        <PlayerAvatar />
                        <PlayerAvatar />
                        <PlayerAvatar />
                        <PlayerAvatar />
                        <PlayerAvatar />
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
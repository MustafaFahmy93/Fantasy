import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    // Tooltip,
} from "@material-tailwind/react";
import PlayerAvatar from "./PlayerAvatar";
import format from "../data/fantacy.json";
const Boards = () => {
    // const TeamFormats = ["1", "2", "1"];
    const teamSize = "11";
    const teamFormat = "4-3-3";
    const teamStyle = {
        "5": "grid-block grid-cols-5 gap-4 mb-24 space-x-10",
        "11": "grid-block grid-cols-5 gap-4 mb-10 space-x-2",
    }
    return (
        <div className="flex justify-center relative top-12 text-white">


            <Card className="w-128 board-bg" >
                <CardHeader className="relative h-8 text-center text-xl font-black" >
                    Team A
                </CardHeader>

                <CardBody>
                    {/* <div className="text-center board "> */}
                    <div className="text-center bg-[url('/src/assets/img/board2.png')] board">


                        {/* <div className="grid grid-cols-5 gap-4 bg-[url('/src/assets/img/board.png')] board"> */}
                        {/* {
                            format.format["11"]["1"].map((player, index) => (
                                player === 0 ? < div key={index} className="inline-block w-1/5 player" ></div> : <PlayerAvatar key={index} />
                                ))
                            } */}
                        {/* </div> */}

                        {

                            format.format[teamSize][teamFormat].map((row, indx) => (
                                // <div className="grid-block grid-cols-5 gap-4 mb-24 space-x-10">
                                // <div className="grid-block grid-cols-5 gap-4 mb-10 space-x-2">
                                <div className={teamStyle[teamSize]}>
                                    {
                                        row.map((player, index) => (
                                            <PlayerAvatar key={index} />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                    <Typography variant="small">$899/night</Typography>
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
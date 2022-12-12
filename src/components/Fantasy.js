
import AppConfig from "../context/AppConfig";
import { useContext } from 'react';
import Nav from '../components/Nav';
import Boards from '../components/Boards';
import { Select, Option } from "@material-tailwind/react";
const Fantasy = () => {
    const { config, setTeamSize, setNTeams } = useContext(AppConfig);
    return (
        <div>
            <div className="bg-img"></div>
            {/* { */}
            {/*  config.isLogin && */}
            <>

                <Nav />
                <section>
                    <div className="container mx-auto flex px-5 py-1 md:flex-row flex-col items-center">
                        <div className="lg:flex-grow md:w-1/3 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
                            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col space-y-2 items-center">
                                <h2 className="text-white text-5xl mb-3 font-app text-center">Setup</h2>
                                <div className="w-72">
                                    <Select label="Algo" className="text-white">
                                        <Option onClick={() => ("2")}>Random</Option>
                                        <Option onClick={() => ("3")}>Balancer</Option>
                                        <Option onClick={() => ("3")}>Leaders with Random</Option>
                                    </Select>
                                </div>
                                <div className="w-72">
                                    <Select label="The number of teams" className="text-white">
                                        <Option onClick={() => setNTeams("2")}>2</Option>
                                        <Option onClick={() => setNTeams("3")}>3</Option>
                                        <Option onClick={() => setNTeams("4")}>4</Option>

                                    </Select>
                                </div>
                                <div className="w-72">
                                    <Select label="Team size" className="text-white">
                                        <Option onClick={() => setTeamSize("5")}>5</Option>
                                        <Option onClick={() => setTeamSize("11")}>11</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="lg:max-w-lg lg:w-full md:w-2/3 w-96">



                            <Boards />

                        </div>
                    </div>
                </section>

            </>
            {/* } */}
        </div>

    )
}

export default Fantasy
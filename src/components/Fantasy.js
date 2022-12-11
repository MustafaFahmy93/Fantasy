
import AppConfig from "../context/AppConfig";
import { useContext } from 'react';
import Nav from '../components/Nav';
import Boards from '../components/Boards';
import { Select, Option } from "@material-tailwind/react";
const Fantasy = () => {
    const { config } = useContext(AppConfig);
    return (
        <div className="bg-img">
            {/* { */}
            {/*  config.isLogin && */}
            <>

                <Nav />
                <section className="text-white body-font">
                    <div className="text-white container mx-auto flex px-5 py-1 md:flex-row flex-col items-center">
                        <div className="text-white lg:flex-grow md:w-1/3 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                            <div className="container text-white py-10 px-10 mx-0 min-w-full flex flex-col items-center space-y-2">
                                <h2 class="text-white text-5xl mb-3 ">Setup</h2>
                                <div className="w-72 text-white">
                                    <Select label="The number of teams" className="text-white" color="white">
                                        <Option>2</Option>
                                        <Option>3</Option>
                                        <Option>4</Option>

                                    </Select>
                                </div>
                                <div className="w-72">
                                    <Select label="Team size" className="text-white" color="white">
                                        <Option>5</Option>
                                        <Option>11</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="lg:max-w-lg lg:w-full md:w-2/3 w-112">
                            {/* <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" /> */}
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
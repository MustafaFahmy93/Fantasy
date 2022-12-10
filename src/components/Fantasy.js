
import AppConfig from "../context/AppConfig";
import react, { useContext } from 'react';
import Nav from '../components/Nav';
import Boards from '../components/Boards';

const Fantasy = () => {
    const { config } = useContext(AppConfig);
    return (
        <div>
            {
                config.isLogin &&
                <div>
                    <Nav />
                    <Boards />
                </div>



            }
        </div>

    )
}

export default Fantasy
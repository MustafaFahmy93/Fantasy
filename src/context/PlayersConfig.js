import { createContext, useState } from "react";
const PlayersConfig = createContext();

export function PlayersProvide({ children }) {
    const defaultConfig = {
        name: "",
        status: true,
        power: 1,
        speed: 1,
        defence: 1,
        total: 1
    }
    // App Config
    const [player, setPlayer] = useState(defaultConfig);
    const [players, setPlayers] = useState([]);
    const resetPlayer = () => {
        setPlayer(defaultConfig);
    };
    const setName = (name) => {
        setPlayer((prevState) => {
            return { ...prevState, name: name }
        });
    };
    const setStatus = (status) => {
        setPlayer((prevState) => {
            return { ...prevState, status: status }
        });
    };
    const setPower = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, power: val }
        });
        _setTotal(val + player.speed + player.defence);
    };
    const setSpeed = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, speed: val }
        });
        _setTotal(player.power + val + player.defence);
    };
    const setdefence = (val) => {
        setPlayer((prevState) => {
            return { ...prevState, defence: val }
        });
        _setTotal(player.power + player.speed + val);
    };
    const _setTotal = (total) => {
        let t = (total) / 3;
        setPlayer((prevState) => {
            return { ...prevState, total: parseInt(t) }
        });
    };
    const methods = {
        players, setPlayers, player, resetPlayer, setName, setPower, setSpeed, setdefence, setStatus
    }

    return (
        <PlayersConfig.Provider value={methods}>
            {children}
        </PlayersConfig.Provider>
    );
}

export default PlayersConfig;
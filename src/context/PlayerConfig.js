import { createContext, useState } from "react";
const PlayerConfig = createContext();

export function PlayerProvide({ children }) {
    const defaultConfig = {
        name: "",
        status: true,
        power: 1,
        speed: 1,
        defance: 1,
        total: 1
    }
    // App Config
    const [config, setConfig] = useState(defaultConfig);
    const resetConfig = () => {
        setConfig(defaultConfig);
    };
    const setName = (name) => {
        setConfig((prevState) => {
            return { ...prevState, name: name }
        });
    };
    const setStatus = (status) => {
        setConfig((prevState) => {
            return { ...prevState, status: status }
        });
    };
    const setPower = (val) => {
        setConfig((prevState) => {
            return { ...prevState, power: val }
        });
        _setTotal(val + config.speed + config.defance);
    };
    const setSpeed = (val) => {
        setConfig((prevState) => {
            return { ...prevState, speed: val }
        });
        _setTotal(config.power + val + config.defance);
    };
    const setDefance = (val) => {
        setConfig((prevState) => {
            return { ...prevState, defance: val }
        });
        _setTotal(config.power + config.speed + val);
    };
    const _setTotal = (total) => {
        let t = (total) / 3;
        setConfig((prevState) => {
            return { ...prevState, total: parseInt(t) }
        });
    };
    const methods = {
        config, resetConfig, setName, setPower, setSpeed, setDefance, setStatus
    }

    return (
        <PlayerConfig.Provider value={methods}>
            {children}
        </PlayerConfig.Provider>
    );
}

export default PlayerConfig;
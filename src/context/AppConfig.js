import { createContext, useState } from "react";
const AppConfig = createContext();

export function AppProvide({ children }) {
    const defaultConfig = {
        isLogin: false,
        user: "admin",
        pass: "admin",
        teamSize: "5",
        nTeams: "2",
        mode: 2, // balance
        buildTeams: true,

    }
    // App Config
    const [config, setConfig] = useState(defaultConfig);
    const resetConfig = () => {
        setConfig(defaultConfig);
    };
    const setLogin = (auth) => {
        setConfig((prevState) => {
            return { ...prevState, isLogin: auth }
        });

    };
    const setTeamSize = (sizw) => {
        setConfig((prevState) => {
            return { ...prevState, teamSize: sizw }
        });
        setBuildTeams(true);
    };
    const setNTeams = (num) => {
        setConfig((prevState) => {
            return { ...prevState, nTeams: num }
        });
        setBuildTeams(true);
    };
    const setMode = (mode) => {
        setConfig((prevState) => {
            return { ...prevState, mode: mode }
        });
        setBuildTeams(true);
    };
    const setBuildTeams = (value) => {
        setConfig((prevState) => {
            return { ...prevState, buildTeams: value }
        });
    };

    const methods = {
        config, resetConfig, setLogin, setTeamSize, setNTeams, setMode, setBuildTeams
    }

    return (
        <AppConfig.Provider value={methods}>
            {children}
        </AppConfig.Provider>
    );
}

export default AppConfig;
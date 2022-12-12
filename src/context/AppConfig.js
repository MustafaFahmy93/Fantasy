import { createContext, useState } from "react";
const AppConfig = createContext();

export function AppProvide({ children }) {
    const defaultConfig = {
        isLogin: false,
        user: "admin",
        pass: "admin",
        teamSize: "5",
        nTeams: "3",

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
    };
    const setNTeams = (num) => {
        setConfig((prevState) => {
            return { ...prevState, nTeams: num }
        });
    };

    const methods = {
        config, resetConfig, setLogin, setTeamSize, setNTeams
    }

    return (
        <AppConfig.Provider value={methods}>
            {children}
        </AppConfig.Provider>
    );
}

export default AppConfig;
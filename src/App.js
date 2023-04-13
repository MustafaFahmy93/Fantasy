
import { PlayersProvide } from './context/PlayersConfig';
import './App.css';
import { useEffect, useState } from "react";
import { AppProvide } from './context/AppConfig';
import Fantasy from './components/Fantasy';
import { playersStore } from './context/PlayersContext';
import Notifications from './components/Notifications';
import { muiStore } from './context/muiContext';



function App() {
  const updatePlayersData = playersStore(state => state.updatePlayersData)
  const playersData = playersStore(state => state.playersData)
  const notify = muiStore(state => state.notify)
  const setNotify = muiStore(state => state.setNotify)
  useEffect(() => {
    // console.log(["players", playersData])
    // if (playersData.length === 0)
    updatePlayersData()
  }, [])
  return (
    <div className="App">
      <Notifications state={notify} setState={setNotify} />
      <AppProvide >
        <PlayersProvide ><Fantasy /></PlayersProvide>


      </AppProvide>


    </div>
  );
}

export default App;

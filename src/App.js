
import { PlayersProvide } from './context/PlayersConfig';
import './App.css';
import Login from './components/Login';
import { useEffect, useState } from "react";
import { AppProvide } from './context/AppConfig';
import Fantasy from './components/Fantasy';
import { playersStore } from './context/PlayersContext';


function App() {
  const updatePlayersData = playersStore(state => state.updatePlayersData)
  useEffect(() => {
    updatePlayersData()
  }, [])
  return (
    <div className="App">
      <AppProvide >
        <PlayersProvide ><Fantasy /></PlayersProvide>


      </AppProvide>


    </div>
  );
}

export default App;

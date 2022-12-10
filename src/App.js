import logo from './logo.svg';
import './App.css';
import Login from './components/Login';

import { PlayerProvide } from './context/PlayerConfig';
import { AppProvide } from './context/AppConfig';
import Fantasy from './components/Fantasy';


function App() {

  return (
    <div className="App">
      <AppProvide >

        <Login />


        <PlayerProvide >
          <Fantasy />

        </PlayerProvide>


      </AppProvide>


    </div>
  );
}

export default App;

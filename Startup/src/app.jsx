import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CharSheet } from './charSheet/charSheet';
import { CombatRules } from './combatRules/combatRules';
import { CombatTracker } from './combatTracker/combatTracker';


export default function App() {
  const [username, setUsername] = React.useState("");
  const [authToken, setAuthToken] = React.useState("");
  const [authState, setAuthState] = React.useState(false);
  const [userData, setUserData] = React.useState({});



  return (
  <BrowserRouter>
  
  <div className="body">App will display here
    
    <header>
        <div className="leftHeader">
        <h1>Cosmere RPG</h1>
        
        <nav>
            <menu className = "navbar">
            <ul><NavLink to = "login">Login Screen</NavLink></ul>
            {authState === true && (
              <ul><NavLink to = "charSheet">Character Sheet</NavLink></ul>
            )}
            {authState === true && (
            <ul><NavLink to = "combatTracker">Combat Tracker</NavLink></ul>
            )}
            <ul><NavLink to = "combatRules">Combat Rules</NavLink></ul>

            </menu>
        </nav>

        
        </div>

        <img id = "logo" alt="Cosmere Logo" src="cosmereLogoNoBackground.png"/>
    </header>
  

    <Routes>
      <Route path='/' element={
        <Login
          username={username}
          authState={authState}
          authChange={(username, authState, user) => {
            setUsername(username);
            setAuthState(authState);
            setUserData(user);
          }
          }
          />
        } exact />


      <Route path='/login' element={<Login />} exact />
      <Route path='/charSheet' element={<CharSheet />} />
      <Route path='/combatTracker' element={<CombatTracker />} />
      <Route path='/combatRules' element={<CombatRules />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    

    <footer>
      <div><a href="https://github.com/davidsdarley/CS260Startup">My Github</a></div>
    </footer>
  
  </div>
  </BrowserRouter>);
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }
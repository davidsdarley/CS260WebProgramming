import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">App will display here
    
    <header>
        <div className="leftHeader">
        <h1>Cosmere RPG</h1>
        <nav>
            <menu className = "navbar">
            <ul><a href = "index.html">Login Screen</a></ul>
            <ul><a href="charSheet.html">Character Sheet</a></ul>
            <ul><a href="combatTracker.html">Combat Tracker</a></ul>
            <ul><a href = "combatRules.html">Combat Rules</a></ul>
            </menu>
        </nav>
        </div>

        <img id = "logo" alt="Cosmere Logo" src="cosmereLogoNoBackground.png"/>
    </header>
  
    <main>Components will go here</main>

    <footer>
      <div><a href="https://github.com/davidsdarley/CS260Startup">My Github</a></div>
    </footer>
  
  </div>;



}
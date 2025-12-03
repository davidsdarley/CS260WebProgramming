import React from 'react';
import './combatTracker.css'
import { Combat } from './Combat';
import { InCombat } from './inCombat';
import { OutOfCombat } from './outOfCombat';

//This function will later get the combat from the database when given the right code. For now, it just returns a default combat for testing purposes.
function getCombat(code){
  //PLACEHOLDER ONLY. Not relevant to actual code///////////////////
  /////////////////////////////////////////////////////////////////
  //localStorage.setItem("combat", JSON.stringify(PlaceholderCombat));
  localStorage.setItem("combat", null);
  const localCombat = localStorage.getItem("combat");
  if (localCombat !== null){
    return JSON.parse(localCombat);
  } else{
    return null;
  }
}

export function CombatTracker() {
  const [activeCombat, setCombat] = React.useState(getCombat);

  return (
    <main>
      <br/>
      {activeCombat !== null && (
        <InCombat
        combat={activeCombat}
        endCombat={() => {
          //delete the combat from the database and kick everyone in it out
          setCombat(null)
        }}
        />
      )}
      {activeCombat === null && (
        <OutOfCombat
        enterCombat={(combat) => {
          setCombat(combat)
        }}
        />
      )}
    
      
      
      <img id = "AvT" alt="Adolin jumping on a Thunderclast" src="https://pbs.twimg.com/media/Gvqdj96W0AACiGY.jpg:large" />
      
    </main>
  );
}
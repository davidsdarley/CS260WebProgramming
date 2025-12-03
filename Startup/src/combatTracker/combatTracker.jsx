import React, { useEffect } from 'react';
import './combatTracker.css'
import { Combat } from './Combat';
import { InCombat } from './inCombat';
import { OutOfCombat } from './outOfCombat';

async function getCombat(code){
  // check if this code is still a valid combat
  const response = await fetch(`/api/combat/join`, {
    method: 'POST',
    body: JSON.stringify({ code: code }),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response?.status === 200){
    const body = await response.json();
    const combat = body.combat;
    return combat;
  }
  else if(response?.status === 400){ // 400 is the code sent when it can't find the combat. This means it's gone, and there is no good reason to look at this number again. In case this is a locally stored code, remove it
    localStorage.removeItem("combatCode");
  }
  return null;
}
async function leaveCombat(combat){
  localStorage.removeItem("combatCode");
  //if the owner is gone, make api call to delete it
  const name = localStorage.getItem("username");
  if (combat.owner === name){
    //do the stuff
    return;
  }
  return;
}

export function CombatTracker() {
  const [activeCombat, setCombat] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function setLocalCombat(){
    const currentCode = localStorage.getItem("combatCode");
    if (currentCode){
      const combat = await getCombat(currentCode);
      setCombat(combat);
      setLoading(false);
      return combat;
    } 
    setCombat(null);  // either recieved an unauthorized code, or doesn't have a combat to look for.
    setLoading(false);
    return null;
  }
  
  useEffect(() => {
    const currentCode = localStorage.getItem("combatCode");
    if (currentCode){
      setLoading(true);
      setLocalCombat();
    }
  }, [])

  if (loading){
    return (<p>Loading...</p>);
  }

  return (
    <main>
      <br/>
      {activeCombat !== null && (
        <InCombat
        initialCombat={activeCombat} 
        leaveCombat={() => {
          leaveCombat(activeCombat);
          setCombat(null);
        }}
        />
      )}
      {activeCombat === null && (
        <OutOfCombat
        enterCombat={(combat) => {
          setCombat(combat);
          localStorage.setItem("combatCode", combat.code);
        }}
        />
      )}
    
      
      
      <img id = "AvT" alt="Adolin jumping on a Thunderclast" src="https://pbs.twimg.com/media/Gvqdj96W0AACiGY.jpg:large" />
      
    </main>
  );
}
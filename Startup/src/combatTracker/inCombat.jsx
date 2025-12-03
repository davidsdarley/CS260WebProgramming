import { CombatTable } from "./combatTable"
import React, { useEffect } from 'react';
import './combatTracker.css'
import { UseCombatWS } from "./useCombatWS";

export function InCombat({initialCombat, leaveCombat = () => {}}){
  console.log("FLAG 5", initialCombat);
  const owner = (initialCombat.owner === localStorage.username);
  let char;
  if (!owner){
    char = localStorage.getItem('character'); //if you aren't the DM, then you are likely joining to fight.
  }
  else{
    char = null;
  }

  const { combat, connected, sendUpdate, setCombatCode,  } = UseCombatWS(initialCombat, char);
  
  useEffect(() => {
    setCombatCode(initialCombat.code);
  }, [initialCombat.code, setCombatCode]);

  if (!combat) {
    return <p>Loading combat...</p>;
  }
  console.log("FLAG 5.1", combat);
  return (<div id="InCombat">
    <p><b>Combat ID: </b><span>{combat.code}</span></p>
    <p style={{ color: connected ? "green" : "red" }}>
      {connected ? "Connected" : "Disconnected"}
    </p>
    <CombatTable
    title="PCs"
    participants={combat["PCs"]}
    />
    <CombatTable
    title="NPCS"
    participants={combat["NPCs"]}
    />

    <button onClick={() => leaveCombat()} className = "rightAligned"> Leave Combat </button>
  </div>
  )
}

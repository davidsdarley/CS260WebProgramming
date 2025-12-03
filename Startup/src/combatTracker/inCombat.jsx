//given the combat, 

import { CombatTable } from "./combatTable"
import React from 'react';
import './combatTracker.css'

//Display the combat code in the upper right part of the screen
//PC table
//NPC table
//Listen for updates
export function InCombat({combat, leaveCombat = () => {}}){
  const owner = (combat.owner === localStorage.username);
  console.log("FLAG 4.-1 Owner Status: ", owner);

  console.log("Flag 4: combat -", combat);
    return (<div id="InCombat">
      <p><b>Combat ID: </b><span>{combat.code}</span></p>
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

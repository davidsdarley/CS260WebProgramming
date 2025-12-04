import { CombatTable } from "./combatTable"
import React, { useEffect } from 'react';
import './combatTracker.css'
import { UseCombatWS } from "./useCombatWS";

export function InCombat({initialCombat, leaveCombat = () => {}}){
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

  function addParticipant(participant){
    console.log("FLAG 1", participant);
    console.log("Flag 1.1", participant.type);
    if (participant.objType === "PC"){
      if(!combat.PCs.some(pc => pc.id === participant.id)){
        combat.PCs.push(participant);
        sendUpdate(combat);
      }
    }
    else{
      combat.NPCs.push(participant); //Add the PC to the combat when a player joins.
      sendUpdate(combat);
    }
  };

  if (!combat) {
    return <p>Loading combat...</p>;
  }
  return (<div id="InCombat">
    <p><b>Combat ID: </b><span>{combat.code}</span></p>
    <p style={{ color: connected ? "green" : "red" }}>
      {connected ? "Connected" : "Disconnected"}
    </p>
    <CombatTable
    title="PCs"
    participants={combat["PCs"]}
    owner={owner}
    add={(participant) => {addParticipant(participant)}}
    />
    <CombatTable
    title="NPCs"
    participants={combat["NPCs"]}
    owner={owner}
    add={(participant) => {addParticipant(participant)}}
    />

    <button onClick={() => leaveCombat()} className = "rightAligned"> Leave Combat </button>
  </div>
  )
}

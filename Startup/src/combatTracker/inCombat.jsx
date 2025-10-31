//given the combat, 

import { CombatTable } from "./combatTable"
import React from 'react';
import './combatTracker.css'

//Display the combat code in the upper right part of the screen
//PC table
//NPC table
//Listen for updates
export function InCombat({combat}){
    return (<div>
    <CombatTable
    title="PCs"
    participants={combat["PCs"]}
    />
    <CombatTable
    title="NPCS"
    participants={combat["NPCs"]}
    />
      </div>
      )
}

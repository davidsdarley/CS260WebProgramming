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
    //NPCS
    />
    
    <section className = "textbox" id = "NPCs">
        <h3>NPCs</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>HP</th>

              <th>Physical Def.</th>
              <th>Cognitive Def.</th>
              <th>Spiritual Def.</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Thug</td>
              <td>11</td>
              <td>12</td>
              <td>10</td>
              <td>12</td>
            </tr>
          </tbody>
        </table>
      
      </section>
      </div>
      )
}

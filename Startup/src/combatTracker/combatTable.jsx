import React from 'react';
import './combatTracker.css'


export function CombatTable({title, participants}){

    <section className = "textbox" id = "players">
    <h3>{title}</h3>
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

        {
            //this part will map the participants to table rows. Each participant must be a stat block object, which can therfore calculate their defenses
        }
        <tbody>
        <tr>
          <td>Dannic</td>
          <td>20</td>
          <td>14</td>
          <td>14</td>
          <td>14</td>
        </tr>
        </tbody>

    </table>
  
  </section>
  
}
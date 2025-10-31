import React from 'react';
import './combatTracker.css'

function getPhysDef(statBlock){
  return 10+statBlock.strength +statBlock.speed;
}
function getCogDef(statBlock){
  return 10+statBlock.intellect +statBlock.willpower;
}
function getSpirDef(statBlock){
  return 10+statBlock.awareness +statBlock.presence;
}

export function CombatTable({title, participants}){
  return(
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

        <tbody>
          {
            participants.map((char, index)=>(
              <tr key = {index}>
                <td>{char.name}</td>
                <td>{char.currentHP}</td>
                <td>{getPhysDef(char)}</td>
                <td>{getCogDef(char)}</td>
                <td>{getSpirDef(char)}</td>
              </tr>
            ))
          }
        </tbody>

    </table>
  
  </section>
  )
}
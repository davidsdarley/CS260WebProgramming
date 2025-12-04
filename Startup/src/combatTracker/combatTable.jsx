import React from 'react';
import './combatTracker.css'
import { StatBlocks } from "./statBlocks.js"

function getPhysDef(statBlock){
  return 10 + Number(statBlock.strength) +Number(statBlock.speed);
}
function getCogDef(statBlock){
  return 10 + Number(statBlock.intellect) + Number(statBlock.willpower);
}
function getSpirDef(statBlock){
  return 10 + Number(statBlock.awareness) + Number(statBlock.presence);
}

export function CombatTable({title, participants, add = () => {}, owner}){
  function getHPText(char){
    if (title === "NPCs"){
      if (owner){
        return (char.currentHP+"/"+char.maxHP);
      }
      else{
        return Number(char.maxHP)-Number(char.currentHP);
      }
    }
    return (char.currentHP+"/"+char.maxHP);
  }

  const [newNPC, setNPC] = React.useState("");

  function addNewNPC(){
    if (newNPC && StatBlocks[newNPC]){
      add(StatBlocks[newNPC]);
    }
  }
  

  return(
    <section className = "textbox" id = "players">
    <h3>{title}</h3>
    <table>

      <thead>
        <tr>
          <th>Name</th>
          {(owner || title==="PCs") ? <th>HP</th>: <th>Damage Taken</th>}
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
                <td>{getHPText(char)}</td>
                <td>{getPhysDef(char)}</td>
                <td>{getCogDef(char)}</td>
                <td>{getSpirDef(char)}</td>
              </tr>
            ))
          }
        </tbody>

    </table>
  
    {//if you are the owner, we want ways to add NPCs to the fight
    (owner && title === "NPCs")? <div>
      <button onClick={addNewNPC}>add NPC</button>
      <select value={newNPC} onChange={(e)=> setNPC(e.target.value)}>
        {Object.keys(StatBlocks).map((item, index) => (
                  <option
                  key={index}>
                      {item}
                  </option>
              ))}
      </select>
    </div>
    : ""}
  </section>
  )
}
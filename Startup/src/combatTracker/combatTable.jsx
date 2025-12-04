import React, { useEffect } from 'react';
import './combatTracker.css'
import { StatBlocks } from "./statBlocks.js"
import { TwoButtonStack } from './buttonStack.jsx';
import { HitButton } from './hitButton.jsx';

function getPhysDef(statBlock){
  return 10 + Number(statBlock.strength) +Number(statBlock.speed);
}
function getCogDef(statBlock){
  return 10 + Number(statBlock.intellect) + Number(statBlock.willpower);
}
function getSpirDef(statBlock){
  return 10 + Number(statBlock.awareness) + Number(statBlock.presence);
}

async function fetchIDs() {
  const response = await fetch(`/api/characters/getIDs`, {
      method: 'POST',
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
  });
  if (response?.status === 200){
      const body = await response.json();
      const idList = body.charIDs;
      return idList;
  }
}
async function getCharFromID(id){
  const response = await fetch(`/api/characters/getChar`, {
      method: 'POST',
      body: JSON.stringify({ charID: Number(id) }),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
  });
  if (response?.status === 200){
      const body = await response.json();
      const character = body.characterSheet;
      return character;
  }
}

export function CombatTable({title, participants, add = () => {}, owner, doHit=()=>{}, remove = () => {}}){
  const [loading, setLoading] = React.useState(false);

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

  const [nameToID, setNameToID] = React.useState({});
  function addName(name, id){
    setNameToID(prev => {
      const updated = { ...prev, [name]: id };
      console.log("UPDATED:", updated);
      return updated;
    });
  }

  const [newFighter, setFighter] = React.useState("");
  async function addNew(){
    if (title==="PCs"){
      console.log("FLAG 7.1", nameToID[newFighter]);
      const charID = Number(nameToID[newFighter]);
      console.log("FLAG 7.1", charID);
      const PC = await getCharFromID(charID);
      if(PC){
        add(PC);
      }
    }
    else{
      if (newFighter && StatBlocks[newFighter]){
        add(StatBlocks[newFighter]);
      }
    }
  }

  const [options, setOptions] = React.useState(["",""])
  async function getPCs(){
    setLoading(true);
    const IDs = await fetchIDs();

    const requests = IDs
    .filter(id => id !== 1)
    .map(async id => {
      const char = await getCharFromID(id);
      addName(char.name, id);
      return char.name;
    });
    const names = await Promise.all(requests);

    setOptions(["", ...names]);
  
    setLoading(false);
  }
  
  useEffect(()=>{
    if(title==="PCs"){
      getPCs();
    }
    else{ // the NPC options.
      setOptions(Object.keys(StatBlocks));
    }
  },[]);

  if (loading){
    return <p>Loading...</p>
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
                <HitButton
                  index={index}
                  onHit={(i)=>{
                    doHit(i);
                  }}
                />
                {owner ? <td><button onClick={(index)=>remove(index)}>Remove</button></td>:""}
                
                
              </tr>
            ))
          }
        </tbody>

    </table>
  
    {//if you are the owner, we want ways to add your PCs or NPCs to the fight
    (owner && options)? <div>
      <button onClick={addNew}>add</button>
      <span> </span>
      <select value={newFighter} onChange={(e)=> setFighter(e.target.value)}>
        {options.map((item, index) => (
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

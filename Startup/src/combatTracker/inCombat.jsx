import { CombatTable } from "./combatTable"
import React, { useEffect } from 'react';
import './combatTracker.css'
import { UseCombatWS } from "./useCombatWS";
import { ArmorDeflects, WeaponDamageTypes } from "./statBlocks";


export function InCombat({initialCombat, leaveCombat = () => {}}){
  const owner = (initialCombat.owner === localStorage.username);
  const [damageType, setDamageType] = React.useState("Keen")
  const damageTypes = ["Keen", "Impact", "Energy", "Spirit", "Vital", "Healing"];

  let character
  if (!owner){
    character = localStorage.getItem('character'); //if you aren't the DM, then you are likely joining to fight.
  }
  else{
    character = null;
  }
  useEffect(() => {
    if (character){
      const parsedChar = JSON.parse(character)
      const equipped = parsedChar.inventory.Weapons.equipped;
      if (equipped){
        setDamageType(WeaponDamageTypes[equipped[0]])
      }
    }
    else{
      character = null;
    }
  },[])
  
  const { combat, connected, sendUpdate, setCombatCode,  } = UseCombatWS(initialCombat, character);
  
  function sendCombat(){
    sendUpdate(combat);
  }


  const [damageAmmount, setDamageAmmount] = React.useState("");

  useEffect(() => {
    setCombatCode(initialCombat.code);
    //if they are not the owner and have a PC here, set damage type to their equipped weapon
  }, [initialCombat.code, setCombatCode]);

  function addParticipant(participant){
    if (participant.objType === "PC"){
      if(!combat.PCs.some(pc => pc.id === participant.id)){
        combat.PCs.push(participant);
        sendCombat();
      }
    }
    else{
      combat.NPCs.push(participant); //Add the PC to the combat when a player joins.
      sendUpdate(combat);
    }
  };
  function removeParticipant(index, arr){
    if (index < 0 || index >= arr.length) return arr; // safety check
    arr.splice(index, 1);
    sendCombat();
  }

  async function hit(table, index){
    if (!damageAmmount){
      console.log("No damage ammount entered");
      return
    }
    console.log("Hit called on [", index,"] of", table);
    console.log(damageAmmount, damageType, "damage!");

    const target = table[index];
    if (damageType === "Healing"){
      target.currentHP += damageAmmount;
      if (target.currentHP > target.maxHP){
        target.currentHP = target.maxHP;
      }
    }
    else if(damageType=== "Keen" || damageType=== "Impact" || damageType=== "Energy"){
      //get Deflect value
      let deflect = 0;
      if(target.objType === "PC"){
        const armor = target.inventory.Armor.equipped[0];
        if (armor){
          deflect = ArmorDeflects[armor];
        }
        else{
          deflect = 0;
        }
      }
      else{
        deflect = target.deflect;
      }
      //subtract deflect from damage
      let damage = damageAmmount - deflect;
      //make sure damage is 0 or greater
      if (damage > 0){
        target.currentHP -= damage;
      }
      else{
        return; //no point sending an update with no actual change
      }
    }
    else{ //spirit or vital damage. Not deflected.
      target.currentHP -= damageAmmount;
    }
    //make sure they don't have negative health
    if (target.currentHP < 0){
      target.currentHP = 0;
    }
    //send it off!
    console.log(target);
    sendCombat();
    //THING TO DO! make it update the character in the Database
  }


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
    doHit={(i)=> hit(combat.PCs, i)}
    remove={(i)=>removeParticipant(i, combat.PCs)}
    />
    <CombatTable
    title="NPCs"
    participants={combat["NPCs"]}
    owner={owner}
    add={(participant) => {addParticipant(participant)}}
    doHit={(i)=> hit(combat.NPCs, i)}
    remove={(i)=>removeParticipant(i, combat.NPCs)}
    />

    {
      //add the damage stuff!
        //Number input for ammount
        //Damage type selection
    }
    <span>Damage: </span>
    <input 
      type="number"
      value={damageAmmount}
      onChange={(e)=>{setDamageAmmount(Number(e.target.value))}}
    ></input>
    
    <select 
      onChange={(e)=>setDamageType(e.target.value)}
      value={damageType}
    >
        {damageTypes.map((item, index) => (
          <option
          key={index}>
              {item}
          </option>
        ))}
    </select>




    <button onClick={() => leaveCombat()} className = "rightAligned"> Leave Combat </button>
  </div>
  )
}

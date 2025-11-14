import React from 'react';
import './combatTracker.css'
import { Combat } from './Combat';
//Adding a comment so I can commit

const Dannic = {
    "objType": "PC",
    "name": "Dannic",
    "characterInfo": {
        "level": 2,
        "classes": ["Warrior"],
        "ancestry": "Human",
  
        "Purpose": "Honor. Dannic believes wholeheartedly in the values of Honor, Loyalty, and Honesty. This has guided him in everything he does. He wants to live them, and hopes others can live them as well.",
        "Obstacle": "While Dannic is extremely willing to charge into battle, he is much more averse to ideological conflict. His response to seeing things in reality that he doesn’t like is to ignore them. If someone who he can’t fight is doing something dishonorable, he’ll do his best to ignore it. If there is injustice he isn’t authorized to respond to, he will very uncomfortably turn away. He avoids thinking about problems he doesn’t know how to fix.",
        "Goals": ["Find and stop the storming smugglers operating in my tower", "Protect Falkir"],
        "Expertises": ["Poleaxe", "Alethi"]
    },
  
    "strength": 3,
    "speed": 3,
    "maxHP": 20,
    "currentHP": 9,
  
    "intellect": 0,
    "willpower": 3,
    "currentFocus": 2,
  
    "awareness": 1,
    "presence": 2,
    "currentInvestiture": 0,
  
    "skills": {
        "Agility": 0, 
        "Athletics": 3, 
        "Heavy Weapons": 3, 
        "Light Weapons": 1, 
        "Stealth": 0, 
        "Thievery": 0,
    
        "Crafting": 0, 
        "Deduction": 0, 
        "Discipline": 2, 
        "Intimidation": 1, 
        "Lore": 0, 
        "Medicine": 0,
    
        "Deception": 0, 
        "Insight": 0, 
        "Leadership": 1, 
        "Perception": 0, 
        "Persuasion": 0, 
        "Survival": 0
    },
  
    "talents": ["Stances", "Vigilant Stance"],
  
    "inventory": {
        "Weapons":{
            "equipped": ["Poleaxe"],
            "allWeapons": ["Poleaxe", "Shield", "Shardblade"]
        },
        "Armor":{
            "equipped": ["Chain"],
            "allArmor": ["Chain"]
        },
        "Equipment": ["None"],
        "Spheres": 20
    },
  
    "conditions": ["None"],
  
    "user": "davidsdarley"
  }
export function OutOfCombat( {enterCombat = () => {}}){
    const [inputCode, setCode] = React.useState("");
    const [statusMessage, setMessage] = React.useState("");

    function setCombat(){
        //PLACEHOLDER ONLY. Not relevant to actual code///////////////////
      const PlaceholderCombat = new Combat();
      PlaceholderCombat.setCode("11111");
      PlaceholderCombat.addPC(Dannic);
      PlaceholderCombat.addNPC("Spear Infantry");
      PlaceholderCombat.addNPC("Spear Infantry");
      PlaceholderCombat.addNPC("Spear Infantry");
      /////////////////////////////////////////////////////////////////

      if (inputCode === PlaceholderCombat.code){
        localStorage.setItem('combat', JSON.stringify(PlaceholderCombat));
        enterCombat(PlaceholderCombat);
      }
      else{
        setMessage("Invalid Code. Please enter a valid code. (At the moment, the placeholder valid code is 11111)");
        setCode("");
      }
    }

    return (
    <section>
        <div className = "textbox">
            <h3>Welcome to Combat!</h3>

            <input type="text"
                value={inputCode} 
                placeholder="enter combat code here"
                onChange={(e) => setCode(e.target.value)} 
            />
            <p/>
            <button onClick={() => setCombat()}> Find Combat </button>

        </div>
        <p>{statusMessage}</p>
    </section>
    )
}


//let you select a combat
    //accept input of a combat code
    //check if the combat code is accurate
        //if it is, pass that combat to the InCombat component
        //if not, display that below until they update stuff
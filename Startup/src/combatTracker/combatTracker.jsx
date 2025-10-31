import React from 'react';
import './combatTracker.css'
import { Combat } from './Combat';
import { InCombat } from './inCombat';
import { OutOfCombat } from './outOfCombat';

const Dannic = {
  "objType": "PC",

  "characterInfo": {
      "name": "Dannic",
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

export function CombatTracker() {

  //PLACEHOLDER ONLY. Not relevant to actual code///////////////////
  const PlaceholderCombat = new Combat();
  PlaceholderCombat.setCode("11111");
  PlaceholderCombat.addPC(Dannic);
  PlaceholderCombat.addNPC("Spear Infantry");
  PlaceholderCombat.addNPC("Spear Infantry");
  PlaceholderCombat.addNPC("Spear Infantry");
  /////////////////////////////////////////////////////////////////
  localStorage.setItem("combat", PlaceholderCombat);


  const localCombat = localStorage.getItem("combat");
  const activeCombat = localCombat !== null ? localCombat:React.useState(null);

  return (
    <main>
      <br/>

      {activeCombat !== null && (
        <InCombat
        combat={activeCombat}
        />
      )}
      {activeCombat === null && (
        <OutOfCombat
        />
      )}
    {
      //PLANNING
        //if you are part of a combat, display the combat tracker
          //Display the combat code in the upper right part of the screen
          //PC table
          //NPC table
          //Listen for updates
        //if your combat has ended, or not part of a combat, go to the Find Combat screen
          //make an input thingamajig and let them enter 

      //WHAT NEEDS TO BE DONE HERE:
        //Combat variable
        //If combat is an empty object, display an OutOfCombat component.
        //If combat is not an empty object, pass it on to an InCombat component
    }
      
      
      <img id = "AvT" alt="Adolin jumping on a Thunderclast" src="https://pbs.twimg.com/media/Gvqdj96W0AACiGY.jpg:large" />
      
    </main>
  );
}
import React from 'react';
import './charSheet.css';
import { Stats } from "./stats";
import { BottomSection } from './bottomSection';
import { CharacterInfo } from './characterInfo';


export function CharSheet({userData}) {

    const Dannic = {

        "characterInfo": {
            "name": "Dannic",
            "level": 2,
            "classes": ["Warrior"],
            "ancestry": "Human",

            "Purpose": "Honor. Dannic believes wholeheartedly in the values of Honor, Loyalty, and Honesty. This has guided him in everything he does. He wants to live them, and hopes others can live them as well.",
            "Obstacle": "While Dannic is extremely willing to charge into battle, he is much more averse to ideological conflict. His response to seeing things in reality that he doesn’t like is to ignore them. If someone who he can’t fight is doing something dishonorable, he’ll do his best to ignore it. If there is injustice he isn’t authorized to respond to, he will very uncomfortably turn away. He avoids thinking about problems he doesn’t know how to fix.",
            "Goals": ["Find the smugglers", "stop the smugglers", "Protect Falkir"],
            "Expertises": ["Poleaxe", "Alethi"]
        },

        

        "strength": 3,
        "speed": 3,
        "maxHP": 20,
        "currentHP": 9,

        "intellect": 0,
        "willpower": 3,
        "currentFocus": 2,

        "awareness": 0,
        "presence": 2,
        "currentInvestiture": 0,

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
    };

    const [character, setCharacter] = React.useState(Dannic);

    function UpdateCharacter(field, mode = "replace", value){                       
        setCharacter(prev => {
            console.log("Character update called with prameters: ", field, mode, value);

            const updated = {...prev};

            // prep so I can handle nested things
            const keys = field.split(".");
            console.log("Split complete");
            let target = updated;

            // get to the end 
            for (let i = 0; i < keys.length - 1; i++) {
                target[keys[i]] = { ...target[keys[i]] }; 
                target = target[keys[i]];
            }

            const lastKey = keys[keys.length - 1];



            if (mode === "append"){
                target[lastKey] = [...target[lastKey], value];
            } else if (mode === "replace"){
                target[lastKey] = value;
            } else if (mode === "remove"){
                target[lastKey] = target[lastKey].filter(i => i !== value);
            } else if (mode === "add"){
                target[lastKey] = target[lastKey]+ value;
            } else {
                console.log("Invalid mode attempted: ", mode)
            }

            console.log("DEBUG", updated);
            return updated;
        });
        setCharacter( prev => {
            const updated = {...prev};
            //Make sure nothing is higher than any possible maximums
            return updated;
        })
    }


  return (
    <main className = "sheetSections">
    
        <CharacterInfo
        character={character}
        update={UpdateCharacter}
        />

        <section className = "gameplay" >

        
        <Stats
            character={character}
            update={(field, mode, value) => {
                UpdateCharacter(field, mode, value);
              }}
        />
        
        <hr></hr>

        <BottomSection
        talents={character["talents"]}
        inventory={character["inventory"]}
        conditions={character["conditions"]}
        update={(field, mode, value) => {
            UpdateCharacter(field, mode, value);
          }}
        />


        </section>
  </main>
  );
}
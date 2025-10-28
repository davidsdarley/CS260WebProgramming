import React from 'react';
import './charSheet.css';
import { Stats } from "./stats";
import { BottomSection } from './bottomSection';


export function CharSheet({userData}) {

    const Dannic = {
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
            return updated;
        });
    }


  return (
    <main className = "sheetSections">
    
        <section className = "charInfo">
        <div className = "fillWidthTextbox">
            <p>Dannic</p>
            <p><span>Level 2</span><span> Human</span> Warrior</p>
        </div>
        <img id = "profilePic" alt="Taln" src="https://uploads.coppermind.net/thumb/Stoneward_by_Petar_Penev.png/300px-Stoneward_by_Petar_Penev.png" />
        
        <div className = "fillWidthTextbox">
            <h3>Purpose</h3>
            <ul>
                <li>None</li>
            </ul>
            <h3>Obstacle</h3>
            <ul>
                <li>None</li>
            </ul>
            <h3>Goals</h3>
            <ul>
                <li>None</li>
            </ul>
            <h3>Expertises</h3>
            <ul>
                <li>None</li>
            </ul>

        </div>
        </section>

        <section className = "gameplay" >

        
        <Stats
            character={character}
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
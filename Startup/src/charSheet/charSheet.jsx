import React, { useEffect } from 'react';
import './charSheet.css';
import { Stats } from "./stats";
import { BottomSection } from './bottomSection';
import { CharacterInfo } from './characterInfo';
import { Dannic } from './dictionaries';


export function CharSheet({userData}) {
    //localStorage.removeItem("character");
    localStorage.setItem("charID", "2")


    function oldgetCharacter(){
        console.log("get char called");
                //eventually we're going to want to be recording the characters in Database and collecting them. 
        const localChar = localStorage.getItem("character");
        if (localChar){
            console.log("Local character found: ", JSON.parse(localChar));
            return JSON.parse(localChar);
            ;
        } else{
            localStorage.setItem("character", JSON.stringify(Dannic));
            return Dannic;
        }
    }
    async function getCharacter(charID){
        console.log("get char called");
        
        try{
            const localChar = localStorage.getItem("character");
            if (localChar){
                console.log("Local character found: ", JSON.parse(localChar));
                return JSON.parse(localChar);
            } 
        }
        catch(err){
            console.error("Failed to parse localStorage character:", err);
        }

        //If it isn't in local storage, get it from the DB
        const id =  charID; //eventually take this as a parameter
        const response = await fetch(`/api/characters/getChar`, {
            method: 'POST',
            body: JSON.stringify({ charID: id }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200){
            const body = await response.json();
            const character = body.characterSheet;
            localStorage.setItem("character", JSON.stringify(character));
            return character;
        }
        
    }
    const [charID, setCharID] = React.useState(localStorage.getItem("charID"));
    const [character, setCharacter] = React.useState(null);
    useEffect(()=> {
        getCharacter(charID).then(setCharacter);
    }, [])

    
    function UpdateCharacter(field, mode = "replace", value){                       
        //find and update the thing
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
        
        //Make sure nothing is higher than any possible maximums
        setCharacter( prev => {
            const updated = {...prev};
            //health
            if (prev.currentHP > prev.maxHP){
                updated.currentHP = updated.maxHP;
            }
            //focus
            if (prev.currentFocus > prev.willpower){
                updated.currentFocus = updated.willpower;
            }
            //investiture
            const maxInvestiture = prev.awareness > prev.presence ? prev.awareness: prev.presence;
            if (prev.currentInvestiture > maxInvestiture){
                updated.currentInvestiture = maxInvestiture;
            }

            localStorage.setItem("character", JSON.stringify(updated))

            return updated;
        })

        // save the new data and replace the old data
    }

    if(!character){
        return <div>Loading Character</div>
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
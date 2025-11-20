import React, { useEffect } from 'react';
import './charSheet.css';
import { Stats } from "./stats";
import { BottomSection } from './bottomSection';
import { CharacterInfo } from './characterInfo';
import { CharacterInfoEditing } from './characterInfoEditing';


export function CharSheet({userData}) {
    //localStorage.removeItem("character");

    async function getCharacter(charID){
        
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
    const [editMode, switchMode] = React.useState(true);
    
    
    

    async function sendUpdate(updated){
        // save the new data and replace the old data
        const response = await fetch(`/api/characters/update`, {
            method: 'POST',
            body: JSON.stringify({ charID: charID, character: updated }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200){
            //All is well
            console.log("Update successful!")
        }
        else{
            console.log("AAAAGGGHHH Character update failed!!!!")
        }
    }

    function UpdateCharacter(field, mode = "replace", value){     //Modes: append, replace, removeByIndex, add    
        //find and update the thing
        setCharacter(prev => {
            console.log("Character update called with parameters: ", field, mode, value);

            const updated = {...prev};

            // prep so I can handle nested things
            const keys = field.split(".");
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
            }
            else if (mode === "removeByIndex"){
                target[lastKey] = target[lastKey].filter( (_, i) => i != value)
            } else if (mode === "add"){
                target[lastKey] = target[lastKey]+ value;
            } else {
                console.log("Invalid mode attempted: ", mode)
            }

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

            sendUpdate(updated);
            return updated;
        })

    }

    if(!character){
        return <div>Loading Character</div>
    }

    if (!editMode){
        return (
            <main className = "sheetSections">
            
                <CharacterInfo
                character={character}
                update={UpdateCharacter}
                startEdit={()=>
                    {switchMode(true);
                    console.log("Edit mode activated");
                    }}
                />

                <section className = "gameplay" >

                
                <Stats
                    character={character}
                    update={(field, mode, value) => {
                        UpdateCharacter(field, mode, value);
                    }}
                    edit={editMode}
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

    else{
        return (
            <main className = "sheetSections">
            
                <CharacterInfoEditing
                character={character}
                update={UpdateCharacter}
                stopEdit={()=>
                    {switchMode(false);
                    console.log("Edit mode ended");
                    }}
                />

                <section className = "gameplay" >

                
                <Stats
                    character={character}
                    update={(field, mode, value) => {
                        UpdateCharacter(field, mode, value);
                    }}
                    edit={editMode}
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
    
}
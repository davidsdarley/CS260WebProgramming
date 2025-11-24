import React from 'react';
import './charSheet.css'
import { StatSection } from "./statSection.jsx"

export function Stats({character, update = () => {}, edit}){
    //character = JSON.parse(character);


    const [hp, setHP] = React.useState(character.currentHP);
    const [focusStat, setFocus] = React.useState(character.currentFocus);
    const [investiture, setInvestiture] = React.useState(character.currentInvestiture);

    
    return(
        <div className="stats">
            <StatSection
                title="Physical"
                value1={character.strength}
                value2={character.speed}
                meterMax={character.maxHP}
                meterValue={character.currentHP}
                updateMeter={(val) =>{
                    update("currentHP", "add", val)
                }}
                character={character}
                edit={edit}
                update={(field, mode, val)=>{update(field, mode, val)}}
            />

            <StatSection
                title="Cognitive"
                value1={character.intellect}
                value2={character.willpower}
                meterMax={character.willpower}
                meterValue={focusStat}
                updateMeter={(val) =>{
                    console.log("Focus changing")
                    update("currentFocus", "add", val)
                    console.log("Focus updated")
                }}
                character={character}
                edit={edit}
                update={(field, mode, val)=>{update(field, mode, val)}}
            />
            <StatSection
                title="Spiritual"
                value1={character.awareness}
                value2={character.presence}
                meterMax={character.awareness < character.presence ? character.presence: character.awareness}
                meterValue={character.currentInvestiture}
                updateMeter={(val) =>{
                    console.log("investiture changing")
                    update("currentInvestiture", "add", val)
                    console.log("investiture updated")
                }}
                character={character}
                edit={edit}
                update={(field, mode, val)=>{update(field, mode, val)}}
            />

        </div>
    );
}
import React from 'react';
import './charSheet.css'
import { StatSection } from "./statSection.jsx"

export function Stats({character, update = () => {}}){
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
                    console.log("Hp changing")
                    update("currentHP", "add", val)
                    console.log("Hp updated")
                }}
                character={character}
            />

            <StatSection
                title="Cognitive"
                value1={character.intellect}
                value2={character.willpower}
                meterMax={character.willpower}
                meterValue={focusStat}
                updateFocus={(val) =>{
                    console.log("focus changing")
                    setFocus(val)
                    console.log("focus updated")
                }}
                character={character}
            />
            <StatSection
                title="Spiritual"
                value1={character.awareness}
                value2={character.presence}
                meterMax={character.willpower < character.presence ? character.presence: character.willpower}
                meterValue={investiture}
                spendFocus={(val) =>{
                    console.log("investiture changing")
                    setInvestiture(val)
                    console.log("investiture updated")
                }}
                character={character}
            />

        </div>
    );
}
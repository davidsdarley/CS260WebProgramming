import React from 'react';
import './charSheet.css'
import { SkillBlock } from "./skillBlock.jsx"
import { ArmorDict } from './dictionaries.js';
import { CarryingCapacity } from './dictionaries.js';
import { MovementSpeed } from './dictionaries.js';
import { SensesRange } from './dictionaries.js';
import { RecoveryDie } from './dictionaries.js';

export function Physical(){

    return(
        <div id="physical addons">
            
            <div className = "atribute">
                <p><span><b>Deflect:</b> </span><span>{ArmorDict[character.inventory.Armor.equipped[0]].split(",")[0]}</span></p>
            </div>
            
            <div className = "meterAtribute"> 
                <p><span><b>Health:</b> 0 </span> <meter id="health" min="0" max={meterMax} value={meterValue} low={meterMax/4} high = {meterMax*3/4} optimum = {meterMax}></meter> <span> {meterMax}</span></p>

                <input type="number"
                    value={inputHealth} 
                    onChange={(e) => setInputHealth(Number(e.target.value))} 
                />
                <br/>
                <button onClick={() => damage('add')}> Damage</button>
                <button onClick={() => heal('sub')}> Healing</button>
            </div>
            

        </div>
        )
}
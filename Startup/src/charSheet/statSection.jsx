import React from 'react';
import './charSheet.css'
import { SkillBlock } from "./skillBlock.jsx"
import { ArmorDict } from './dictionaries.js';
import { CarryingCapacity } from './dictionaries.js';
import { MovementSpeed } from './dictionaries.js';
import { SensesRange } from './dictionaries.js';
import { RecoveryDie } from './dictionaries.js';
import { Physical } from './physical.jsx';



export function StatSection({title, value1, value2, meterMax, meterValue, updateMeter = () => {}, character, edit, update = () => {}}){
    const stat1 = title === "Physical" ? "Strength": title === "Cognitive" ? "Intellect": title === "Spiritual" ? "Awareness": "error";
    const lower1 = title === "Physical" ? "strength": title === "Cognitive" ? "intellect": title === "Spiritual" ? "awareness": "error";
    const stat2 = title === "Physical" ? "Speed": title === "Cognitive" ? "Willpower": title === "Spiritual" ? "Presence": "error";
    const lower2 = title === "Physical" ? "speed": title === "Cognitive" ? "willpower": title === "Spiritual" ? "presence": "error";

    const physicalSkills = ["Agility", "Athletics", "Heavy Weapons", "Light Weapons", "Stealth", "Thievery"];
    const cognitiveSkills = ["Crafting", "Deduction", "Discipline", "Intimidation", "Lore", "Medicine"];
    const spiritualSkills = ["Deception", "Insight", "Leadership", "Perception", "Persuasion", "Survival"];

    const skillList = title === "Physical" ? physicalSkills: title === "Cognitive" ? cognitiveSkills: title === "Spiritual" ? spiritualSkills: ["error"];
    
///////Editting vars and functions/////////////////////////////////////
    const [Stat1, setStat1] = React.useState(character[lower1]);
    const [Stat2, setStat2] = React.useState(character[lower2]);
    const [MaxHealth, setMaxHealth] = React.useState(character.maxHP);

    function updateHealth(val){
        val = Number(val)
        setMaxHealth(val);
        update("maxHP", val);
    }
    function updateStat1(val){
        setStat1(val);
        update(lower1, val);
    }
    function updateStat2(val){
        setStat2(val);
        update(lower2, val);
    }
/////////////////////////////////////////////////////////////////////////
    const [inputHealth, setInputHealth] = React.useState(0);
    function damage(){
        updateMeter(-inputHealth);
        setInputHealth(0);
    }
    function heal(){
        updateMeter(inputHealth);
        setInputHealth(0);
    }
    function updateFocus(val){
        updateMeter(val);
    }

    if(edit){
        return(
            <section className = "textbox evenSpacing">
                    <h3>{title}</h3>
                    {
                        //Not table, instead the two stats listed out. No defense
                    }
                    <span>{stat1}: </span><input type="number" value={Stat1} onChange={(e)=>{updateStat1(e.target.value)}}/>
                    <span>{stat2}: </span><input type="number" value={Stat2} onChange={(e)=>{updateStat2(e.target.value)}}/>
    
                    <br></br>
                    {title === "Physical" && (
                    <div id="physical addons">
                    <span><b>Max Health: </b></span><input type="number" value={MaxHealth} onChange={(e)=>{updateHealth(e.target.value)}}/>
                    </div>
                    )}
                    
    
                    <hr></hr>
    
                    <div>
                    {skillList.map((skillName) => (
                        <SkillBlock 
                            key={skillName} skillName={skillName} 
                            character={character}
                        />
                    ))}
                    </div>
    
                    <hr/>
    
                    {title === "Physical" && (
                        <section>
                            <div className= "atribute">
                                <span><b>Carrying Capacity:</b> </span><span>{CarryingCapacity[Stat1]} lbs</span>
                            </div>
                            <div className= "atribute">
                                <span><b>Movement:</b> </span><span>{MovementSpeed[Stat2]} ft./action</span>
                            </div>
                        </section>
                    )}
                    {title === "Cognitive" && (
                        <div className= "atribute">
                            <span><b>Recovery Die:</b> </span><span>{RecoveryDie[Stat2]}</span>
                        </div>
                    )}
                    {title === "Spiritual" && (
                        <div className= "atribute">
                            <span><b>Senses Range:</b> </span><span>{SensesRange[Stat1]} ft.</span>
                        </div>
                    )}
    
                    
    
                </section>
        )
    }

    return(
        <section className = "textbox evenSpacing">
                <h3>{title}</h3>

                <table>
                    <thead>
                    <tr>
                    <th>{stat1}</th>
                    <th>Defense</th>
                    <th>{stat2}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td>{value1}</td>
                    <td>{10+Number(value1)+Number(value2)}</td>
                    <td>{value2}</td>
                    </tr>
                    </tbody>
                </table>

                <br></br>
                {title === "Physical" && (
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
                )}
                {title === "Cognitive" &&(
                    <div className = "meterAtribute"> 
                        <p><b>Focus:</b> <span>0 </span> <meter id="focus" min="0" max={meterMax} value={character.currentFocus} low="1" high = {meterMax/2} optimum = {meterMax}></meter> <span> {meterMax}</span></p>
                        <button onClick={() => updateFocus(-1)}> Spend</button>
                        <button onClick={() => updateFocus(1)}> Regain</button>
                    </div>
                )}
                {title === "Spiritual" &&(
                    <div className = "meterAtribute"> 
                        <p><b>Investiture:</b> <span>0 </span> <meter id="investiture" min="0" max={meterMax} value={meterValue} low="1" high = {meterMax/2} optimum = {meterMax}></meter> <span> {meterMax}</span></p>
                        <button onClick={() => updateFocus(-1)}> Spend</button>
                        <button onClick={() => updateFocus(1)}> Regain</button>
                    </div>
                )}

                <hr></hr>

                <div>
                {skillList.map((skillName) => (
                    <SkillBlock 
                        key={skillName} skillName={skillName} 
                        character={character}
                    />
                ))}
                </div>

                <hr/>

                {title === "Physical" && (
                    <section>
                        <div className= "atribute">
                            <span><b>Carrying Capacity:</b> </span><span>{CarryingCapacity[character.strength]} lbs</span>
                        </div>
                        <div className= "atribute">
                            <span><b>Movement:</b> </span><span>{MovementSpeed[character.speed]} ft./action</span>
                        </div>
                    </section>
                )}
                {title === "Cognitive" && (
                    <div className= "atribute">
                        <span><b>Recovery Die:</b> </span><span>{RecoveryDie[character.willpower]}</span>
                    </div>
                )}
                {title === "Spiritual" && (
                    <div className= "atribute">
                        <span><b>Senses Range:</b> </span><span>{SensesRange[character.awareness]} ft.</span>
                    </div>
                )}

                

            </section>
    )
    
}
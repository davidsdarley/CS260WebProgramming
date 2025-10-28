import React from 'react';
import './charSheet.css'
import { Skill } from "./skill.jsx"



export function StatSection({title, value1, value2, meterMax, meterValue, setMeter = () => {}}){
    console.log("Stats section requested")

    const stat1 = title === "Physical" ? "Strength": title === "Cognitive" ? "Intellect": title === "Spiritual" ? "Awareness": "error";
    const stat2 = title === "Physical" ? "Speed": title === "Cognitive" ? "Willpower": title === "Spiritual" ? "Presence": "error";
    
    const physicalSkills = ["Agility", "Athletics", "Heavy Weapons", "Light Weapons", "Stealth", "Thievery"];
    const cognitiveSkills = ["Crafting", "Deduction", "Discipline", "Intimidation", "Lore", "Medicine"];
    const spiritualSkills = ["Deception", "Insight", "Leadership", "Perception", "Persuasion", "Survival"];

    const skillList = title === "Physical" ? physicalSkills: title === "Cognitive" ? cognitiveSkills: title === "Spiritual" ? spiritualSkills: ["error"];
    
    const [deflect, setDeflect] = React.useState(2);

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
                    <td>{10+value1+value2}</td>
                    <td>{value2}</td>
                    </tr>
                    </tbody>
                </table>

                
                {title === "Physical" && (
                <div id="physical addons">
                    <div className = "meterAtribute"> 
                        <span>Health: 0 </span> <meter id="health" min="0" max={meterMax} value={meterValue} low={meterMax/4} high = {meterMax*3/4} optimum = {meterMax}></meter> <span> {meterMax}</span>
                    </div>
                    <div className = "atribute">
                        <span>Deflect: </span><input type = "number"/>
                    </div>
                </div>
                )}
                {title === "Cognitive" &&(
                    <div className = "meterAtribute"> 
                        <p>Focus: <span>0 </span> <meter id="focus" min="0" max={meterMax} value={meterValue} low="1" high = {meterMax/2} optimum = {meterMax}></meter> <span> {meterMax}</span></p>
                    </div>
                )}
                {title === "Spiritual" &&(
                    <div className = "meterAtribute"> 
                        <p>Investiture: <span>0 </span> <meter id="investiture" min="0" max={meterMax} value={meterValue} low="1" high = {meterMax/2} optimum = {meterMax}></meter> <span> {meterMax}</span></p>
                    </div>
                )}

                <hr></hr>
                <div>
                {skillList.map((skillName) => (
                    <Skill key={skillName} skillName={skillName} />
                ))}
                </div>
                <hr/>
                {title === "Physical" && (
                    <section>
                        <div className= "atribute">
                            <p>Carrying Capacity</p><input type = "number"/>
                        </div>
                        <div className= "atribute">
                            <p>Movement</p><input type = "number"/>
                        </div>
                    </section>
                )}
                {title === "Cognitive" && (
                    <div className= "atribute">
                        <p>Recovery Die: </p><input type = "number"/>
                    </div>
                )}
                {title === "Spiritual" && (
                    <div className= "atribute">
                        <p>Senses Range: </p><input type = "number"/>
                    </div>
                )}

                

            </section>
    )
    
}
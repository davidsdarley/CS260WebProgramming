import React from 'react';
import './charSheet.css'
import { SkillStats } from './dictionaries.js';

export function SkillBlock({skillName, character, edit, update=()=>{}}){
    const stat = character[SkillStats[skillName]];
    const rank = character.skills[skillName];

    function increment(val, skill){
      const field = "skills."+skill
      update(field, "add", val)
    }

    return(
    <div className="skill">
        <span>{skillName}: </span>
        
        {
         [1, 2, 3, 4, 5].map((i) => (
          <label key={i}>
            <input
              type="checkbox"
              name={`${skillName}-rank-${i}`}
              checked={i <= rank}
              readOnly
            />
          </label>
      ))
      }

        {! edit && <span> {Number(stat)+Number(rank)}</span>}
        {edit &&
          <span> 
            <span>   </span>
            <button onClick={() => increment(1, skillName)}>+</button>
            <button onClick={() => increment(-1, skillName)}>-</button>
          </span>
        }
        {
          //If editing, include two buttons that will update the rank. One to increase it, another to decrease it.
        }
    </div>
    );
}
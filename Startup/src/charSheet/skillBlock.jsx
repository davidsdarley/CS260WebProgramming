import React from 'react';
import './charSheet.css'
import { SkillStats } from './dictionaries.js';

export function SkillBlock({skillName, character}){
    const stat = character[SkillStats[skillName]];
    const rank = character.skills[skillName];

    return(
    <div className="skill">
        <span>{skillName}: </span>
        
        {[1, 2, 3, 4, 5].map((i) => (
        <label key={i}>
          <input
            type="checkbox"
            name={`${skillName}-rank-${i}`}
            checked={i <= rank}
            readOnly
          />
        </label>
      ))}

        <span> {Number(stat)+Number(rank)}</span>
    </div>
    );
}
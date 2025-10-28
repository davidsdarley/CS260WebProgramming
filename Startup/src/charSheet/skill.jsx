import React from 'react';
import './charSheet.css'

export function Skill({skillName}){
    return(
    <div className="skill">
        <span>{skillName}</span>
        <label><input type="checkbox" name="rank-1"/></label>
        <label><input type="checkbox" name="rank-2"/></label>
        <label><input type="checkbox" name="rank-3"/></label>
        <label><input type="checkbox" name="rank-4"/></label>
        <label><input type="checkbox" name="rank-5"/></label>
    </div>
    );
}
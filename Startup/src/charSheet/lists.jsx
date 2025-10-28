import React from 'react';
import './charSheet.css';
import { TalentsDict } from './dictionaries';
import { WeaponsDict } from './dictionaries';
import { ArmorDict } from './dictionaries';
import { EquipmentDict } from './dictionaries';
import { ConditionsDict } from './dictionaries';


export function Lists({title, list = ["None"], inventory = {}}){

    const activeDict = title === "Talents" ? TalentsDict
    : title === "Weapons" ? WeaponsDict
    : title === "Armor" ? ArmorDict
    : title === "Equipment" ? EquipmentDict
    : title === "Conditions and Injuries" ? ConditionsDict
    : {};
    
    const activeList = title === "Weapons" ? inventory["Weapons"]["allWeapons"]
    : title === "Armor" ? inventory["Armor"]["allArmor"]
    : title === "Equipment" ? inventory["Equipment"]
    : list;
   


    const textboxType = title === "Talents" ? "list fillWidthTextbox": "list evenSpacing textbox";

    return(

    
    <div className = {textboxType} id = {title}>

        <h3>{title}</h3>

        {title === "Weapons" || title === "Armor" ? (<div>
            <h4>Equipped:</h4>
                <ul>
                    {inventory[title]["equipped"].map((item) => (
                                <li key={item}>{item}: {activeDict[item]}</li>
                            ))}
                </ul>
            
            <h4>All {title}</h4>
            
        </div>
        )
        :""}
        
        <ul>
            {activeList.map((item) => (
                        <li key={item}> {item}: {activeDict[item]}</li>
                    ))}
        </ul>
    </div>);
}
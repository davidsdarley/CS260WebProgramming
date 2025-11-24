import React, { useEffect } from 'react';
import './charSheet.css';
import { TalentsDict } from './dictionaries';
import { WeaponsDict } from './dictionaries';
import { ArmorDict } from './dictionaries';
import { EquipmentDict } from './dictionaries';
import { ConditionsDict } from './dictionaries';
import { Item } from './item';
import { EditOptions } from './editOptions';


export function Lists({title, list = ["None"], inventory = {}, update = () => {}, field}){

    const activeDict = 
      title === "Talents" ? TalentsDict
    : title === "Weapons" ? WeaponsDict
    : title === "Armor" ? ArmorDict
    : title === "Equipment" ? EquipmentDict
    : title === "Conditions and Injuries" ? ConditionsDict
    : {};
    
    const activeList = 
      title === "Weapons" ? inventory["Weapons"]["allWeapons"]
    : title === "Armor" ? inventory["Armor"]["allArmor"]
    : title === "Equipment" ? inventory["Equipment"]
    : list;
   

    const [equipable, setEquipable] = React.useState(true);
    const [removable, setRemovable] = React.useState(false);
    const textboxType = title === "Talents" ? "list fillWidthTextbox": "list evenSpacing textbox";
    useEffect(()=>{
        if (title==="Talents" || title==="Equipment"){
            setEquipable(false);
        }
        if (title === "Conditions and Injuries"){
            setEquipable(false);
            setRemovable(true);
        }
    },[])

    function doUpdate(field, mode, val){
        console.log("Flag Lists", field, mode, val);
        update(field, mode, val);
    }

    return(
    <div className = {textboxType} id = {title}>

        <h3>{title}</h3>

        {title === "Weapons" || title === "Armor" ? (
            <div>
                <b>Equipped:</b>
                {inventory[title]["equipped"] && <ul>
                        {inventory[title]["equipped"].map((item, index) => (
                                    <Item
                                    field={field}
                                    key={index}
                                    name={item}
                                    index={index}
                                    description={activeDict[item]}
                                    update={(field, mode, val) => doUpdate(field, mode, val)}
                                    equipped={true}
                                    />
                                ))}
                    </ul>}
                <h4>All {title}</h4>
            </div>
        )
        :""}
        
        <ul>
            {activeList.map((item, index) => (
                        <Item
                        edit={removable}
                        field={field}
                        key={index}
                        name={item}
                        index={index}
                        description={activeDict[item]}
                        equipable={equipable}
                        update={(field, mode, val) => doUpdate(field, mode, val)}
                        />
                    ))}
        </ul>

        {
            //if it's the Conditions thing, I want them to be able to add them without being in edit mode
        }
        {title === "Conditions and Injuries" && <EditOptions
            lst={inventory.conditions}
            remove={(index)=>update("conditions", "removeByIndex", index)}
            add={(val)=>update("conditions", "append", val)}
            options={Object.keys(ConditionsDict)}
            />}
        
    </div>);
}
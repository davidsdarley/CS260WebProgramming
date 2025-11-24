import React, { useEffect } from 'react';
import './charSheet.css';

export function Item( { name, index, field, description, edit, update=() => {}, equipable, equipped } ){

    const [buttonText, setText] = React.useState("Add");
    useEffect(()=>
        {if (field === "inventory.Armor" || field === "inventory.Weapons"){
        setText("Equip");
    }
    }, [])

    function doUpdate(field, mode, val){
        update(field, mode, val);
    }

    function setEquipped(){
        //if it's armor
        if (field === "inventory.Armor"){
            doUpdate("inventory.Armor.equipped", "removeByIndex", 0);
        }
        //Add the item
        doUpdate(field+".equipped", "append", name);
    }
    const character = localStorage.getItem("character")
    

    async function remove(){
        //if it's in the equipped slot, remove it
        const char =  localStorage.getItem("character");
        const character = await JSON.parse(char);
        
        try{
            const f = field+".equipped";
            if(character.inventory.field.equipped === "name"){
                doUpdate(f, "remove", name);
            }
        }
        catch{}
        doUpdate(field, "removeByIndex", index);

    }
    function unequip(){
        const f = field+".equipped";
        doUpdate(String(f), "removeByIndex", index);
    }

    if (equipped){
        return <li>
        <b>{name}</b>: {description}<span> </span><button onClick={()=>unequip()}>-</button>
    </li>
    }

    if (!name){
        return
    }

    if (edit){
        return(
            <li>
                <b>{name}</b>: {description}<span> </span><button onClick={()=>remove()}>-</button>
            </li>
        )
    }
    return(
        <li>
            <b>{name}</b>: {description}
                {equipable && <span><span>  </span> <button onClick={()=>setEquipped()}>{buttonText}</button></span>}
        </li>
    )
}
import React, { useEffect } from 'react';
import './charSheet.css';
import { EditListItem } from './editListItem';

export function EditOptions( { lst, add = () => {}, remove = () => {}, options, str} ){
    const [inputVal, setVal] = React.useState("")
    function sendNew(){
        add(inputVal);
        setVal("");
    }    
    const [word, setWord] = React.useState("")
    useEffect(()=>{if (str==="Armor" || str ==="Equipment"){
        setWord(str);
    }
    else if(!str){
        setWord("");
    }
    else{
        setWord(str+"s");
    }})
    

    return (
    <div>
        <h3>{word}</h3>
        {lst && <ul>{
            lst.map((item, index) => (
                <EditListItem
                    input={item}
                    remove={()=>{remove(index)}}
                    key={index}
                />
            ))
        }
        </ul>}
        
        <span>New {str}: </span>
        {
            // Place to input new things
        }
        <select
        value={inputVal}
        onChange={(e)=>setVal(e.target.value)}>
            {options.map((item, index) => (
                <option
                key={index}>
                    {item}
                </option>
            ))}
        </select>
        <span><button onClick={sendNew}>Add</button></span>
        

    </div>
    )

}
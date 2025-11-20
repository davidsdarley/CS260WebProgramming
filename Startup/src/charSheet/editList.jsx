import React from 'react';
import './charSheet.css';
import { EditListItem } from './editListItem';

export function EditList( { lst, add = () => {}, remove = () => {}, big, str} ){
    const [inputVal, setVal] = React.useState("")
    function sendNew(){
        add(inputVal);
        setVal("");
    }

    return (
    <div>
        <ul>{
            lst.map((item, index) => (
                <EditListItem
                    input={item}
                    remove={()=>{remove(index)}}
                    key={index}
                />
            ))
        }
        </ul>
        <span>New {str}: </span>
        <p>
            {big ? <textarea placeholder={str+"..."} value={inputVal} onChange={(e) => setVal(e.target.value)}/> : <input type="text" placeholder={str+'...'} value={inputVal} onChange={(e) => setVal(e.target.value)}/>}
            <span><button onClick={sendNew}>Add</button></span>
        </p>
        

    </div>
    )

}
import React from 'react';
import './charSheet.css';

export function CharacterInfoEditing({character, update = () => {}, stopEdit = () => {}}){
    // character = JSON.parse(character);
    if (!character){
        return <div>Loading Character...</div>
    }    
    
    return(
    <section className = "charInfo">
        <div className = "fillWidthTextbox">
            <p >Name: </p><span><input type="text" id="name" placeholder=''/></span>

        </div>
        <button onClick={stopEdit}>Save</button>
        </section>
        );
}
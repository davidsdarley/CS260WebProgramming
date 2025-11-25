import React from "react";
import { Pictures } from "./dictionaries";
import "./imageSelector.css"

export function ImageSelector( { character, update=()=>{} }){

    function onSelect(id){
        update("characterInfo.Picture", "replace", id);
    }
    //get all the available images.
    const keys = Object.keys(Pictures);
    //lay them out in rows of 3.
    //when you click on one, it calls update("characterInfo.Picture", "replace", id)
    return (
        <section>            
            <b>Profile Picture:</b>
            <div className="image-grid">
            {keys.map((id) => (
                <div
                key={id}
                className={`image-box ${character.characterInfo.Picture === id ? "selected" : ""}`}
                onClick={() => onSelect(id)}
                >
                <img src={Pictures[id]} alt="" />
                </div>
            ))}
            </div>
        </section>
      );
}

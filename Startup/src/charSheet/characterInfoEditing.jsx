import React from 'react';
import './charSheet.css';
import { EditList } from './editList';
import { ImageSelector } from './imageSelector';

export function CharacterInfoEditing({character, update = () => {}, stopEdit = () => {}}){
    // character = JSON.parse(character);
    if (!character){
        return <div>Loading Character...</div>
    }    

    const [Name, setName] = React.useState("")
    if (!character.name === "New Character"){
        setName(character.name);
    }
    else{
        console.log(character.name);
    }
    //Name
    //level
    const [Level, setLevel] = React.useState(character.characterInfo.level)
    //ancestry
    const [Ancestry, setAncestry] = React.useState(character.characterInfo.ancestry)
    //classes
    //picture
    //purpose
    //obstacle
    //goals
    //Expertises
    function save(){
        stopEdit()
        update("characterInfo.ancestry", "replace", Ancestry);
        if (Name){
            update("name", "replace", Name);
        }
        update("characterInfo.level", "replace", Level);
    }

    return(
    <section className = "charInfo">
        <div className = "fillWidthTextbox">
            <span><b>Name:</b> </span><p><input type="text" id="name" value={Name}  onChange={(e) => setName(e.target.value)}/></p>
            <span><b>Level:</b> </span><p><input type="number" id="level" value={Level} onChange={(e) => setLevel(e.target.value)}/></p>
            <span><b>Ancestry:</b> </span><p><select id="ancestry" value={Ancestry} onChange={(e) => setAncestry(e.target.value)}>
                <option>Human</option>
                <option>Singer</option>
            </select></p>
            <span><b>Classes:</b> </span>
            {
            <EditList
                lst={character.characterInfo.classes}
                field="characterInfo.classes"
                remove={(index)=>{
                    update("characterInfo.classes", "removeByIndex", index)
                }}
                add={(val)=>{
                    update("characterInfo.classes", "append", val)
                }}
                big={false}
                str="Class"
            />
                
            }
        
            <span><b>Purpose:</b> </span><p><textarea id="Purpose" defaultValue={character.characterInfo.Purpose}/></p>
            <span><b>Obstacle:</b> </span><p><textarea id="Obstacle" defaultValue={character.characterInfo.Obstacle}/></p>
            
            <span><b>Goals:</b></span>
            <EditList
            lst={character.characterInfo.Goals}
            field="characterInfo.Goals"
            remove={(index)=>{
                update("characterInfo.Goals", "removeByIndex", index)
            }}
            add={(val)=>{
                update("characterInfo.Goals", "append", val)
            }}
            big={true}
            str="Goal"
            />

            <span><b>Expertises:</b></span>
            <EditList
            lst={character.characterInfo.Expertises}
            field="characterInfo.Expertises"
            remove={(index)=>{
                update("characterInfo.Expertises", "removeByIndex", index)
            }}
            add={(val)=>{
                update("characterInfo.Expertises", "append", val)
            }}
            big={false}
            str="Expertise"
            />
            <ImageSelector
                character={character}
                update={(field, mode, val)=> {update(field, mode, val)}}
            />


        </div>
        <button onClick={save}>Save</button>
        </section>
        );
}
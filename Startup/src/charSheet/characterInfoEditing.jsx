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
    //Name
    //level
    const [Level, setLevel] = React.useState(character.characterInfo.level);
    //ancestry
    const [Ancestry, setAncestry] = React.useState(character.characterInfo.ancestry);
    //purpose
    const [Purpose, setPurpose] = React.useState(character.characterInfo.Purpose);
    //obstacle
    const [Obstacle, setObstacle] = React.useState(character.characterInfo.Obstacle);

    //goals
    //Expertises
    function save(){
        stopEdit()
        update("characterInfo.ancestry", "replace", Ancestry);
        if (Name){
            update("name", "replace", Name);
        }
        if (Purpose){
            update("characterInfo.Purpose", "replace", Purpose);
        }
        if (Obstacle){
            update("characterInfo.Obstacle", "replace", Obstacle);
        }
        if (Level){
            update("characterInfo.level", "replace", Level);
        }
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
        
            <span><b>Purpose:</b> </span><p><textarea id="Purpose" value={Purpose} onChange={(e) => setPurpose(e.target.value)}/></p>
            <span><b>Obstacle:</b> </span><p><textarea id="Obstacle" value={Obstacle} onChange={(e) => setObstacle(e.target.value)}/></p>
            
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
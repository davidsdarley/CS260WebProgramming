import React from 'react';
import './charSheet.css';

export function CharacterInfo({character, update = () => {}, startEdit = () => {}}){
    // character = JSON.parse(character);
    if (!character){
        return <div>Loading Character...</div>
    }    return(
    <section className = "charInfo">
        <div className = "fillWidthTextbox">
            <h4>{character.name}</h4>
            <p><span>Level {character.characterInfo.level}</span><span> {character.characterInfo.ancestry}</span> {character.characterInfo.classes}</p>
        </div>
        <img id = "profilePic" alt="Taln" src="https://uploads.coppermind.net/thumb/Stoneward_by_Petar_Penev.png/300px-Stoneward_by_Petar_Penev.png" />
        
        <div className = "fillWidthTextbox">
            <h3>Purpose</h3>
            <ul>
                <li>{character.characterInfo.Purpose}</li>
            </ul>
            <h3>Obstacle</h3>
            <ul>
                <li>{character.characterInfo.Obstacle}</li>
            </ul>

            

            <h3>Goals</h3>
                <ul>
                    {character.characterInfo.Goals.map((item) => (
                                <li key={item}>{item} </li>
                            ))}
                </ul>


            <h3>Expertises</h3>
            <ul>
                    {character.characterInfo.Expertises.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                </ul>

        </div>
        <button onClick={startEdit}>Edit</button>
        </section>
        );
}
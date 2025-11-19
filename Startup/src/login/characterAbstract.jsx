import React from 'react';

export function CharacterAbstract( { characterID } ){
    function handleClick(){
        localStorage.setItem("charID", characterID);
        console.log("Clicked. CharID set to", characterID);
        localStorage.removeItem("character");
    }



    //takes a characterID
    //gets the cacharacter from DB
    //shows the basic info about them

    async function getCharFromID(id){
        const response = await fetch(`/api/characters/getChar`, {
            method: 'POST',
            body: JSON.stringify({ charID: id }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200){
            const body = await response.json();
            const character = body.characterSheet;
            return character;
        }
    }
    const [character, setCharacter] = React.useState(null);
    React.useEffect(()=> {
        getCharFromID(characterID).then(setCharacter);
    }, [])



    if (!character){
        return <div className="textbox">Loading Character...</div>
    }
    //What is the basic info?
        //name
        //level
        //classes
        //picture?
    return <div className='hoverbox' onClick={handleClick}>
        <h3>{character.name}</h3>
        <p>level {character.characterInfo.level} {character.characterInfo.ancestry} {character.characterInfo.classes}</p>
        {
        //access the picture file and add it in.
        }
        </div>
}
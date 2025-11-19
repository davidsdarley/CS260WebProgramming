import React, { useEffect } from 'react';
import { CharacterAbstract } from './characterAbstract';
 

export function Characters(){
    // gets a list of character IDs
    async function getIDs() {
        const response = await fetch(`/api/characters/getIDs`, {
            method: 'POST',
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200){
            const body = await response.json();
            const idList = body.charIDs;
            return idList;
        }
    }
    
    const [IDs, setIDs] = React.useState(null);
    useEffect(() => {getIDs().then(setIDs)},[])
    console.log("FLAG 3.0 ID list: ", IDs);
    if (!IDs){
        return (<div className='textbox'>Loading Characters...</div>)
    }

    return (
        <div >
            {IDs.map(item => (
                <CharacterAbstract
                    characterID={item}
                    key={item}
                />
            ))
            }
        </div>
    );

    // reads their available characters and passes them to character abstract

    // stores in localstorage charID and charsheet
        // chooses the first one as the default
        // allows you to click on it to change the localstorage charID and charSheet to 
}
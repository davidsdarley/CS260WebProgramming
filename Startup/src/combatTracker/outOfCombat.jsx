import React from 'react';
import './combatTracker.css'
import { Combat } from './Combat';
//Adding a comment so I can commit

export function OutOfCombat( {enterCombat = () => {}, setCombatCode = () => {}}){
    const [inputCode, setCode] = React.useState("");
    const [statusMessage, setMessage] = React.useState("");

    async function joinCombat(){
        try {
            const res = await fetch("api/combat/join", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code: inputCode }),
            });
            const data = await res.json();
      
            if (!res.ok) {
              setMessage(data.msg || "Failed to join combat.");
              return;
            }
      
            // Set combat in parent and start websocket
            enterCombat(data.combat);
            setCombatCode(inputCode); // <-- triggers WebSocket to join room
          } catch (err) {
            setMessage("Error connecting to server.");
            console.error(err);
          }

    }
    async function createCombat(){
        try {
            const res = await fetch("/combat/new", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
      
            // Set combat in parent and start websocket
            enterCombat({ PCs: [], NPCs: [] }); // empty combat object initially
            setCombatCode(data.code); // <-- triggers WebSocket to join the new room
          } catch (err) {
            setMessage("Error creating combat.");
            console.error(err);
          }
    }

    return (
    <section>
        <div className = "textbox">
            <h3>Welcome to Combat!</h3>

            <input type="text"
                value={inputCode} 
                placeholder="enter combat code here"
                onChange={(e) => setCode(e.target.value)} 
            />
            <p/>
            <button onClick={() => joinCombat()}> Join Combat </button><span><button onClick={()=>createCombat()}>Create Combat</button></span>

        </div>
        <p>{statusMessage}</p>
    </section>
    )
}


//let you select a combat
    //accept input of a combat code
    //check if the combat code is accurate
        //if it is, pass that combat to the InCombat component
        //if not, display that below until they update stuff
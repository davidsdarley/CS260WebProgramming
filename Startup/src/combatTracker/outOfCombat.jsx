import React from 'react';
import './combatTracker.css'
import { Combat } from './Combat';
//Adding a comment so I can commit

export function OutOfCombat( {enterCombat = () => {}}){
    const [inputCode, setCode] = React.useState("");
    const [statusMessage, setMessage] = React.useState("");

    async function joinCombat(){
        console.log("FLAG 1: join called");
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
          } 
          catch (err) {
            setMessage("Error connecting to server.");
            console.error(err);
          }

    }
    async function createCombat(){
        const username = localStorage.getItem("username");
        try {
            const res = await fetch("api/combat/new", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({owner: username})
            });
            const data = await res.json();
            const combat = data.combat;
            enterCombat(combat); 
          } 
        catch (err) {
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
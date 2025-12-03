import { useEffect, useRef, useState } from "react";

export function UseCombatWS(initialCombat, initialCharacter = null, updateCombat=()=>{}) {
  const socketRef = useRef(null);
  const [combat, setCombat] = useState(initialCombat);
  const [connected, setConnected] = useState(false);
  const [combatCode, setCombatCode] = useState(initialCombat.code);

  // Connect WebSocket
  useEffect(() => {
    if (!combatCode) return;
    const address = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`
    const socket = new WebSocket(address);
    console.log("FLAG 6", socket);

    socketRef.current = socket;

    socket.onopen = () => {
        console.log("Flag 6.1. onopen called. Sending Join with these paramenters:", combatCode, initialCharacter);
        // Join the combat room
        socket.send(JSON.stringify({ type: "join", code: combatCode, character: initialCharacter }));
        setConnected(true);
        console.log("Connected!")
    };

    socket.onmessage = (e) => {
        console.log("Flag 6.2. Message received!")
        const msg = JSON.parse(e.data);
        if (msg.type === "joined") {
            console.log(`Joined combat ${msg.combat.code}`);
            setCombat(msg.combat);
        }
        if (msg.type === "state") {
            setCombat(msg.combat);
        }
    };

    socket.onclose = () => setConnected(false);

    return () => socket.close();
  }, [combatCode, initialCharacter]);

  // Send updates to server
  function sendUpdate(update) {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "update", ...update }));
    }
  }

  return { combat, connected, sendUpdate, setCombatCode };
}

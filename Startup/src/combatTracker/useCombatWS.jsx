import { useEffect, useRef, useState } from "react";

export function UseCombatWS(initialCombatCode = null, initialCharacter = null) {
  const socketRef = useRef(null);
  const [combat, setCombat] = useState(null);
  const [connected, setConnected] = useState(false);
  const [combatCode, setCombatCode] = useState(initialCombatCode);

  // Connect WebSocket
  useEffect(() => {
    if (!combatCode) return;
    const address = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`
    const socket = new WebSocket(address);

    socketRef.current = socket;

    socket.onopen = () => {
      // Join the combat room
      socket.send(JSON.stringify({ type: "join", code: combatCode, character: initialCharacter }));
      setConnected(true);
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "joined") {
        console.log(`Joined combat ${msg.code}`);
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

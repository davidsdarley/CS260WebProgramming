const { WebSocketServer } = require('ws');

function CombatMessenger(httpServer, combats, rooms) { //pretty much stolen from Simon
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;
    socket.combatCode = null;   //no combat assigned when you enter

    // Forward messages to everyone except the sender

    //old on message
    socket.on('message', function message(data) {
      let parsed;
      try {
          parsed = JSON.parse(data);
        } catch {
          console.error("Invalid JSON from client");
          return;
        }
      if (parsed.type ==="join"){ //allow for joining combats
          const code = parsed.code;
          socket.combatCode = code;
          const combat = combats[code];
          if (!combat) {
            socket.send(JSON.stringify({ type: 'error', msg: 'Combat not found' }));
            return;
          }
          rooms[code] = rooms[code] || new Set();
          if (parsed.character ){
            combat.addPC(parsed.character); //Add the PC to the combat when a player joins.
          }
          rooms[code].add(socket);
          socket.send(JSON.stringify({ type: 'joined', code }));
          return
      }

      if (parsed.type === 'update' && socket.combatCode) {
        const room = socket.combatCode;
        const combat = combats[room];
        if (!combat) return;  //just to cover my base cases. Hopefully will never be useful.
  
        // simple example: update NPC HP by  index
        if (parsed.field === 'NPC') {  //DEBUG FLAG This needs testing still
          const index = parsed.targetIndex;
          const npc = combat.NPCs[index];
          if (npc){
            combat.NPCs[index] = parsed.updated;
          }
        }
        const payload = JSON.stringify({ type: 'state', combat });
        rooms[room].forEach(client => {
          if (client.readyState === client.OPEN) {
            client.send(payload);
          }
        });
      }

    });

    socket.on('close', () => {
      if (socket.combatCode && rooms[socket.combatCode]) {
        rooms[socket.combatCode].delete(socket);
        if (rooms[socket.combatCode].size === 0) {
          delete rooms[socket.combatCode];
        }
      }
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { CombatMessenger };

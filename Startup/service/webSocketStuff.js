const { WebSocketServer } = require('ws');

function CombatMessenger(httpServer, combats, rooms) { 
  console.log("CombatMessenger started!")
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
          console.log("join message recieved!");
          const code = parsed.code;
          socket.combatCode = code;
          const combat = combats[code];
          if (!combat) {
            socket.send(JSON.stringify({ type: 'error', msg: 'Combat not found' }));
            return;
          }
          rooms[code] = rooms[code] || new Set();
          if (parsed.character ){
            const char =  JSON.parse(parsed.character);
            //check if the PC is already in it
            if(!combat.PCs.some(pc => pc.id === char.id)){
              combat.addPC(char); //Add the PC to the combat when a player joins.
            }
          }
          else{
            console.log("no character included")
          }
          rooms[code].add(socket);
          //console.log("Room:", rooms[code])
          socket.send(JSON.stringify({ type: 'joined', combat: combat }));
          return
      }

      if (parsed.type === 'update' && socket.combatCode) { //update messages carry a new combat.
        console.log("update message received!")
        const room = socket.combatCode;
        let combat = combats[room];
        if (!combat) return;  //just to cover my base cases. Hopefully will never be useful.
  
        if (!parsed.combat){
          console.log("Update without combat object!");
          return;
        }
        combats[room] = parsed.combat;
        combat = combats[room];

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

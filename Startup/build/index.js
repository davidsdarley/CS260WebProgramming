const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { CombatMessenger } = require('./webSocketStuff.js');

const { Combat } = require('./Combat.js'); 
const authCookieName = 'token';


/////////////GENERAL APP SETUP STUFF. GOOD FOR OTHER PROJECTS///////////////////
  // The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;
  // JSON body parsing using built-in middleware
app.use(express.json());
  // Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());
  // Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Debugging messages
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
////////////////////////////////////////////////////////////////////////////////////


// CreateAuth a new user
apiRouter.post(`/auth/create`, async (req, res) => {
    if (await findUser('username', req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
      return;
    } else {
      const user = await createUser(req.body.username, req.body.password);
      setAuthCookie(res, user.token);
      res.send({ username: user.username, charIDs: user.characters });
      return;
    }
});

////////LOGIN LOGOUT STUFF stolen mostly from simon, then adapted to my site////////////////////////////////////////
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        await DB.updateUser(user);
        setAuthCookie(res, user.token);
        res.send({ username: user.username, charIDs: user.characters });
        return;
        }
        else{
          res.status(401).send({ msg: 'Incorrect username or password' });
          return;
        }
}
res.status(401).send({ msg: 'Unauthorized' });
return;
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user)
    }
    res.clearCookie(authCookieName);
    res.status(204).send();
});
////////////////////////////////////////////////////////////////////

////// CHARACTER SHEET STUFF ////////////////////////////////////////////
  //Get a character sheet from a character ID
apiRouter.post('/characters/getChar', async (req, res) =>{ 
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return 
  }
  const id = Number(req.body.charID);
  if (!id) {
    res.status(400).send({ msg: 'Missing character ID' });
    return;
  }
  //Add in here a check to make sure that the character ID is actually one of theirs

  const character = await DB.getCharacter(id);  //Database version
  if (!character){
    return res.status(404).send({ msg: 'Character not found', nonexistent: character });
  }
  res.status(200).send({ characterSheet: character });
  return;
});
  //get the IDs of the characters the User has access to.
apiRouter.post('/characters/getIDs', async (req, res) =>{ 
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return 
  }
  const idList = user.characters;
  res.status(200).send({charIDs: idList})
  return;
});
  //update an existing character in storage. Requires a charID and updated character.
apiRouter.post('/characters/update', async (req, res) =>{
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    return }

  const id = Number(req.body.charID);
  const updated = req.body.character;
  
  //Bunch of ways to fail
  if (!id || !updated) {
    res.status(400).send({ msg: "Missing charID or character data" });
    return
  }
  if (updated.id !== id){ //For some reason sometimes these two don't match, so I'm just fixing this here and now.
    updated.id = id;
    console.log("IDs don't match. Switched:", updated.id);
  }
  if (!user.characters.includes(id)){
    res.status(401).send( {msg: 'Unauthorized. This is not your character.', yourCharacters: user.characters});
    return
  }
  //Actually update the character
  const result = await DB.updateCharacter(updated);
  if (!result){
    res.status(500).send({msg: "character failed to update"})
    return;
  }
  const theChar = await DB.getCharacter(id);
  res.status(200).send({msg: "character updated", char: theChar});
});

  //get the next character ID
apiRouter.post('/characters/newID', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return }

  //Get the next id
  const newID = await DB.getNextId();
  if (typeof newID !== "number"){
    res.status(500).send({msg: 'Internal server error. Incorrect id type calculated.'});
    return
  }
  // add the new ID to the user
  user.characters.push(newID);
  await DB.updateUser(user);

  //send the response
  res.status(200).send({info: newID});
  return;
})


////// COMBAT STUFF /////////////////////////////////////////////////

//////// IN MEMORY COMBAT STUFF. These don't need to persist so I'm going to keep them here //////////////////
function fakeCombat(){//make me a fake combat for testing
  const PlaceholderCombat = new Combat();
  PlaceholderCombat.setCode("11111");
  PlaceholderCombat.addNPC("Spear Infantry");
  PlaceholderCombat.addNPC("Spear Infantry");
  PlaceholderCombat.addNPC("Spear Infantry");
  return PlaceholderCombat;
}

const sampleCombat = fakeCombat();
let combats = {
  "11111": sampleCombat
}
let rooms = {}
//////////////////////////////////////////////////////////////////////////////////////////////


  // add a new combat
apiRouter.post('/combat/new', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  const newC = newCombat();
  newC.owner = req.body.owner;
  res.status(200).send({combat: newC});
  return;
})
  // find and join a new combat
apiRouter.post('/combat/join', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  const combat = combats[req.body.code];
  if(!combat){
    res.status(400).send({msg : "combat not found"});
    return;
  }
  res.status(200).send({combat :combat});
  return;
})
apiRouter.post('/combat/update',async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  const updated = req.body.combat;
  const combat = combats[updated.code];
  if(!combat){
    res.status(400).send({msg : "combat not found"});
    return;
  }
  combats[updated.code] = updated;
  res.status(200).send({combat :combats[updated.code]});
  return;
})

///////////// FUNCTIONS FOR USE IN OTHER PLACES /////////////////
function combatKeyExists(key) {
  return Object.prototype.hasOwnProperty.call(combats, key);
}
function newCombat(){
  const combat = new Combat();
  let attempts = 0;
  while (combatKeyExists(combat.code)){
    combat.newCode();
    attempts ++;
    if (attempts > 50) {
      throw new Error("Unable to generate unique combat code after 50 attempts. How???? I dunno. Maybe I'm now REALLY popular.");
    }
  }
  combats[combat.code] = combat; 
  return combat;
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
      username: username,
      password: passwordHash,
      token: uuid.v4(),
      characters: [1] //automatically give them access to the newCharacter object.
  };
  await DB.addUser(user);
  return user;
}

async function findUser(field, value){
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
//////////Default app things. Important to keep at the end////////////
//Logging function.
app.use((req, res, next) => {
  console.log("LOG-incoming request:", req.method, req.url);
  next();
});
// Default error handler seemed good to have so I stole it.
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
    return;
  });
// Also seemed like a good default to take so `\ *_* /`
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
///////////////// And we officially start listening//////////////////
const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

CombatMessenger(httpService, combats, rooms);
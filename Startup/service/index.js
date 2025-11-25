const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

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


//Eventually replace as we get the database set up
let users = [];
let chars = {
  1: {
    "objType": "PC",
    "name": "New Character",
    "characterInfo": {
        "level": 1,
        "classes": [],
        "ancestry": "Human",
  
        "Purpose": "",
        "Obstacle": "",
        "Goals": [],
        "Expertises": [],
        "Picture": 1
    },
  
    "strength": 0,
    "speed": 0,
    "maxHP": 10,
    "currentHP": 10,
  
    "intellect": 0,
    "willpower": 0,
    "currentFocus": 0,
  
    "awareness": 0,
    "presence": 0,
    "currentInvestiture": 0,
  
    "skills": {
        "Agility": 0, 
        "Athletics": 0, 
        "Heavy Weapons": 0, 
        "Light Weapons": 0, 
        "Stealth": 0, 
        "Thievery": 0,
    
        "Crafting": 0, 
        "Deduction": 0, 
        "Discipline": 0, 
        "Intimidation": 0, 
        "Lore": 0, 
        "Medicine": 0,
    
        "Deception": 0, 
        "Insight": 0, 
        "Leadership": 0, 
        "Perception": 0, 
        "Persuasion": 0, 
        "Survival": 0
    },
  
    "talents": [],
  
    "inventory": {
        "Weapons":{
            "equipped": [],
            "allWeapons": []
        },
        "Armor":{
            "equipped": [],
            "allArmor": []
        },
        "Equipment": [],
        "Spheres": 20
    },
  
    "conditions": [],
  
    "user": ""},
  2: {
  "objType": "PC",
  "name": "Dannic",
  "characterInfo": {
      "level": 2,
      "classes": ["Warrior"],
      "ancestry": "Human",

      "Purpose": "Honor. Dannic believes wholeheartedly in the values of Honor, Loyalty, and Honesty. This has guided him in everything he does. He wants to live them, and hopes others can live them as well.",
      "Obstacle": "While Dannic is extremely willing to charge into battle, he is much more averse to ideological conflict. His response to seeing things in reality that he doesn’t like is to ignore them. If someone who he can’t fight is doing something dishonorable, he’ll do his best to ignore it. If there is injustice he isn’t authorized to respond to, he will very uncomfortably turn away. He avoids thinking about problems he doesn’t know how to fix.",
      "Goals": ["Find and stop the storming smugglers operating in my tower", "Protect Falkir"],
      "Expertises": ["Poleaxe", "Alethi"],
      "Picture": 10
  },

  "strength": 3,
  "speed": 3,
  "maxHP": 20,
  "currentHP": 9,

  "intellect": 0,
  "willpower": 3,
  "currentFocus": 2,

  "awareness": 1,
  "presence": 2,
  "currentInvestiture": 0,

  "skills": {
      "Agility": 0, 
      "Athletics": 3, 
      "Heavy Weapons": 3, 
      "Light Weapons": 1, 
      "Stealth": 0, 
      "Thievery": 0,
  
      "Crafting": 0, 
      "Deduction": 0, 
      "Discipline": 2, 
      "Intimidation": 1, 
      "Lore": 0, 
      "Medicine": 0,
  
      "Deception": 0, 
      "Insight": 0, 
      "Leadership": 1, 
      "Perception": 0, 
      "Persuasion": 0, 
      "Survival": 0
  },

  "talents": ["Stances", "Vigilant Stance"],

  "inventory": {
      "Weapons":{
          "equipped": ["Poleaxe"],
          "allWeapons": ["Poleaxe", "Shield", "Shardblade"]
      },
      "Armor":{
          "equipped": ["Chain"],
          "allArmor": ["Chain"]
      },
      "Equipment": [],
      "Spheres": 20
  },

  "conditions": [],

  "user": "davidsdarley"},
  3: {
    "objType": "PC",
    "name": "Jakamav Dohedal",
    "characterInfo": {
        "level": 5,
        "classes": ["Agent"],
        "ancestry": "Human",
  
        "Purpose": "",
        "Obstacle": "",
        "Goals": [""],
        "Expertises": [""],
        "Picture": 1
    },
  
    "strength": 0,
    "speed": 3,
    "maxHP": 25,
    "currentHP": 25,
  
    "intellect": 2,
    "willpower": 2,
    "currentFocus": 2,
  
    "awareness": 3,
    "presence": 1,
    "currentInvestiture": 0,
  
    "skills": {
        "Agility": 2, 
        "Athletics": 0, 
        "Heavy Weapons": 0, 
        "Light Weapons": 3, 
        "Stealth": 3, 
        "Thievery": 1,
    
        "Crafting": 0, 
        "Deduction": 1, 
        "Discipline": 3, 
        "Intimidation": 1, 
        "Lore": 0, 
        "Medicine": 0,
    
        "Deception": 3, 
        "Insight": 1, 
        "Leadership": 0, 
        "Perception": 2, 
        "Persuasion": 0, 
        "Survival": 0
    },
  
    "talents": [""],
  
    "inventory": {
        "Weapons":{
            "equipped": [],
            "allWeapons": []
        },
        "Armor":{
            "equipped": [],
            "allArmor": []
        },
        "Equipment": [],
        "Spheres": 20
    },
  
    "conditions": [],
  
    "user": ""}
};


// CreateAuth a new user
apiRouter.post(`/auth/create`, async (req, res) => {
    if (await findUser('username', req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.username, req.body.password);
  
      setAuthCookie(res, user.token);
      res.send({ username: user.username, charIDs: user.characters });
    }
});
  
////////LOGIN LOGOUT STUFF stolen mostly from simon, then adapted to my site////////////////////////////////////////
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ username: user.username, charIDs: user.characters });
        return;
        }
}
res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).send();
});
////////////////////////////////////////////////////////////////////

////// MY APP STUFF ////////////////////////////////////////////
  //Get a character sheet from a character ID
apiRouter.post('/characters/getChar', async (req, res) =>{ 
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return 
  }
  const id = req.body.charID;
  if (!id) {
    res.status(400).send({ msg: 'Missing character ID' });
  }
  //Add in here a check to make sure that the character ID is actually one of theirs
  const character = chars[Number(id)];
  if (!character){
    return res.status(404).send({ msg: 'Character not found', thing: chars[Number(id)], nonexistent: character, existingCharacterIDs: Object.keys(chars) });
  }
  res.status(200).send({ characterSheet: character });
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
});
  //update an existing character in storage. Requires a charID and updated character.
apiRouter.post('/characters/update', async (req, res) =>{
  const oldKeys = Object.keys(chars); //DEBUG
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return }
  
  const id = Number(req.body.charID);
  const updated = req.body.character;
  if (!id || !updated) {
    res.status(400).send({ msg: "Missing charID or character data" });
    return
  }
  if (!user.characters.includes(id)){

    res.status(401).send( {msg: 'Unauthorized. This is not your character.', yourCharacters: user.characters});
    return
  }
  chars[Number(id)] = updated; //eventually replace with DB update
  const theChar = chars.id;
  const newKeys = Object.keys(chars); //DEBUG
  res.status(200).send({msg: "character updated", char: theChar, oldkeys: oldKeys, newkeys: newKeys});
});
  //get the next character ID
apiRouter.post('/characters/newID', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return }

  const charIDs = Object.keys(chars).map(id => Number(id));
  const biggest = Math.max(...charIDs);
  const newID = biggest+1;
  user.characters.push(newID);
  res.status(200).send({info: newID});
  return
})


/////////////////////////////////////////////////////////////////

//Will need some fanangling to make it work but security is important and we definitely want this to work.
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
}
};

///////////// FUNCTIONS FOR USE IN OTHER PLACES /////////////////
async function createUser(username, password) {    //for login and create
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        characters: [1, 2] //automatically give them access to the newCharacter object. 2 is included for my default stuff, should be removed later.
    };
    users.push(user);   // replace with DB stuff

    return user;
}

async function findUser(field, value) {     // rewrite for DB
    if (!value) return null;
  
    return users.find((u) => u[field] === value);
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
  });
// Also seemed like a good default to take so `\ *_* /`
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
///////////////// And we officially start listening//////////////////
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
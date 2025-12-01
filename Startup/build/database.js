const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('radiant');    //for my startup application
const userCollection = db.collection('user'); //The users
const characterCollection = db.collection("characters"); //The character sheets

// This will asynchronously test the connection and exit the process if it fails. Stolen from Simon because it seem EXTREMELY good to have.
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

//What a user looks like
// user = {
//     username: username,
//     password: passwordHash,
//     token: uuid.v4(),
//     characters: [1] 
// }
function getUser(username) {
    return userCollection.findOne({ username: username });
}
function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}
async function addUser(user) {
    await userCollection.insertOne(user);
}
async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
}

//Character sheet things
const newChar = {
    "id": 1,
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
    "user": ""}

function getCharacter(id) {
    return characterCollection.findOne({ id: id})
}
async function updateCharacter(char) {
    const updated = {...char};
    delete updated._id;

    const xists = await characterCollection.findOne({id: char.id});
    if (xists === null){
        await addCharacter(updated);
        return true;
    }

    if (updated.id === 1){   //don't let ANYTHING touch the base default character
        return false;
    }
    await characterCollection.updateOne({ id: updated.id }, { $set: updated });
    return true;
}
async function addCharacter(char){
    await characterCollection.insertOne(char);
}
async function getNextId() {
    const options = {
      sort: { id: -1 },  // sort by id descending
      limit: 1,          // take the top one
    };
  
    const result = await characterCollection.find({}, options).toArray();
    if (result.length <= 0){// base case. I do want to make sure the newChar is always there.
        await addCharacter(newChar);
        return 2;       
    }
    const newID = result[0].id;
    
    return Number(newID)+1; // add one to the highest and return it
  }
//getNextId() //just make ABSOLUTELY CERTAIN that my base new character exists

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getNextId,
    updateCharacter,
    getCharacter
};


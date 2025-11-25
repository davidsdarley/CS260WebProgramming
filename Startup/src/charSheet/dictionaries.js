export const TalentsDict ={
    "":"",
    'Stances': "When you acquire the Vigilant Stance talent, you learn to use stances. You can enter a stance you know by using that talent’s stated number of actions. Your stance ends if you either end it as a free action, enter another stance, or end the scene. Whilein a stance, you temporarily gain any actions, bonuses,and other effects it grants; these effects end when thestance does. By default, you can only use stances during combat, not during other scenes.",
    "Vigilant Stance": "> While in this stance, reduce the focus cost of your Dodge and Reactive Strike reactions by 1. Additionally, you can enter another stance you know as a free action."
}
//inventory stuff
export const WeaponsDict = {
    "":"",
    "Javelin": "1d6 keen, Light Weapons, Melee, Thrown [30/120], Indirect, 2 lb. 20 mk",
    "Knife": "1d4 keen, Light Weapons,Melee, Discreet, Offhand Thrown (20/60), 1 lb. 8 mk",
    "Mace": "1d6 impact, Light Weapons, Melee, —, Momentum, 3 lb. 20 mk",
    "Rapier": "1d6 keen, Light Weapons, Melee, Quickdraw, Defensive, 2 lb. 100 mk",
    "Shortspear": "1d8 keen, Light Weapons, Melee, Two-Handed, Unique: loses Two-Handed trait, 3 lb. 10 mk",
    "Sidesword": "1d6 keen, Light Weapons, Melee, Quickdraw, Offhand, 2 lb. 40 mk",
    "Staff": "1d6 impact, Light Weapons, Melee, Discreet Two-Handed, Defensive, 4 lb. 1 mk",
    "Shortbow": "1d6 keen, Light Weapons, Ranged[80/320], Two-Handed, Quickdraw, 2 lb. 80 mk",
    "Sling": "Sling 1d4 impact, Light Weapons, Ranged[30/120], Discreet, Indirect, 1 lb. 2",

    "Axe": "1d6 keen, Heavy Weapons, Melee, Thrown [20/60], Offhand, 2 lb. 20 mk",
    "Greatsword": "1d10 keen, Heavy Weapons, Melee, Two-Handed, Deadly, 7 lb. 200 mk",
    "Hammer": "1d10 impact, Heavy Weapons, Melee, Two-Handed, Momentum, 8 lb. 40 mk",
    "Longspear": "1d8 keen, Heavy Weapons, Melee [+5], Two-Handed, Defensive, 9 lb. 15 mk",
    "Longsword": "1d8 keen, Heavy Weapons, Melee, Quickdraw Two-Handed, Unique: loses Two-Handed trait, 3 lb. 60 mk",
    "Poleaxe": "1d10 keen, Heavy Weapons, Melee, Two-Handed, Melee [+5], 5 lb. 40 mk",
    "Shield": "1d4 impact, Heavy Weapons, Melee, Defensive, Offhand, 2 lb. 10 mk",
    "Crossbow": "1d8 keen, Heavy Weapons,  Ranged[100/400], Loaded [1] Two-Handed, Deadly, 7 lb. 200 mk",
    "Longbow": "1d6 keen, Heavy Weapons, Ranged[150/600], Two-Handed, Indirect, 3 lb. 100 mk",

    "Shardblade": "2d8 spirit, Heavy Weapons, Melee, Dangerous/Deadly, loses Dangerous, 4 lb. -",
    "Shardblade (Radiant)": "2d* spirit, *, Melee, Deadly Unique, -, Weightless, -",
    "Half-Shard": "2d4 impact, Heavy Weapons, Melee, Defensive Two-Handed Unique, Momentum, 10 lb. 2,000 mk",
    "Warhammer": "2d10 impact, Heavy Weapons, Melee, Cumbersome[5] Two-Handed, Unique, 150 lb. 400 mk",
    "Grandbow": "2d6 keen Heavy Weapons, Ranged[200/800], Cumbersome [5] Two-Handed, Pierce 20 lb. 1,000 mk"
}

export const ArmorDict = {
    "":"",
    "Uniform": "0, Presentable, —, 5 lb. 40 mk",
    "Leather": "1, —, Presentable, 10 lb. 60 mk",
    "Chain": "2, Cumbersome[3], loses Cumbersome, 25 lb. 80 mk",
    "Breastplate": "2, Cumbersome[3], Presentable, 30 lb. 120 mk",
    "Half Plate": "3, Cumbersome[4], Unique: Cumbersome[3], instead of Cumbersome[4], 40 lb. 400 mk",
    "Full Plate": " 4, Cumbersome[5], —, 55 lb. 1,600 mk",
    "Shardplate": " 5, Dangerous, Unique, loses Dangerous trait, 1400 lb. -",
    "Shardplate (Radiant)": "5, Unique , —, Weightless -"
}

export const EquipmentDict = {
    "": " "
}


//stat information
export const CarryingCapacity = {
    0: 50,
    1: 100,
    2: 100,
    3: 250,
    4: 250,
    5: 500,
    6: 500,
    7: 2500,
    8: 2500,
    9: 5000
}
export const MovementSpeed = {
    0: 20,
    1: 25,
    2: 25,
    3: 30,
    4: 30,
    5: 40,
    6: 40,
    7: 60,
    8: 60,
    9: 80
}
export const RecoveryDie = {
    0: "1d4",
    1: "1d6",
    2: "1d6",
    3: "1d8",
    4: "1d8",
    5: "1d10",
    6: "1d10",
    7: "1d12",
    8: "1d12",
    9: "1d20"
}
export const SensesRange = {
    0: 5,
    1: 10,
    2: 10,
    3: 20,
    4: 20,
    5: 50,
    6: 50,
    7: 100,
    8: 100,
    9: Infinity
}

//Other
export const ConditionsDict = {
    "":"",
    "Afflicted": "While Afflicted, you slowly take damage over time. In combat, at the end of each of your turns, you take the amount and type of damage specified by the effect that gave you the condition; this information is typically stated in brackets. For example, if you’re Afflicted [1d4 vital], you take 1d4 damage at the end of each of your turns. Out of combat, you instead take that damage every 10 seconds and after each time someone attempts to remove the condition. Unlike most conditions, you can be Afflicted by multiple effects simultaneously. When this happens, resolve each effect separately.",
    "Determined": "While Determined, when you fail a test, you can add an Opportunity to the result. After you choose to do so, remove the Determined condition.",
    "Disoriented": "While Disoriented, your senses are disrupted, making most tasks difficult. You can’t use reactions, your senses always count as obscured, and Perception tests (and similar tests to use your senses) gain a disadvantage.",
    "Empowered": "When a Knight Radiant swears an Ideal, they become Empowered, granting a burst of unrestrained power. While Empowered, you gain an advantage on all tests and your Investiture refills to your maximum at the start of each of your turns. Remove this condition at the end of the current scene.",
    "Enhanced": "While Enhanced, one of your attributes temporarily increases, as specified in brackets when you gain that condition. The specified attribute gains a bonus equal to the specified number; however, this bonus doesn’t change your defenses, maximum health, maximum focus, or maximum Investiture. For example, if you have a Speed of 3 and become Enhanced [+2 Speed], you temporarily gain the following benefits:\n◆ Gain a +2 bonus to Agility, Light Weaponry, Stealth, and Thievery tests.\n◆ Gain a +2 bonus to any talents that directly use your Speed.\n◆ Increase your movement rate from 30 feet to 40 feet.\nEnhanced has a cumulative effect, and more than one of your attributes can be Enhanced at a time.",
    "Focused": "While Focused, you are engaged and intent on your task. When you use an ability that costs focus, its cost is reduced by 1."
}

export const SkillStats= {
    "Agility": "speed", 
    "Athletics": "strength", 
    "Heavy Weapons": "strength", 
    "Light Weapons": "speed", 
    "Stealth": "speed", 
    "Thievery": "speed",

    "Crafting": "intellect", 
    "Deduction": "intellect", 
    "Discipline": "willpower", 
    "Intimidation": "willpower", 
    "Lore": "intellect", 
    "Medicine": "intellect",

    "Deception": "presence", 
    "Insight": "awareness", 
    "Leadership": "presence", 
    "Perception": "awareness", 
    "Persuasion": "presence", 
    "Survival": "awareness"
}

export const oldPictures = {
    1: "https://uploads.coppermind.net/First_Ideal_poster.jpg",
    2: "https://static.wikia.nocookie.net/stormlightarchive/images/8/8c/Wr_SA.jpg/revision/latest?cb=20200731024223",
    3: "https://static.wikia.nocookie.net/stormlightarchive/images/2/20/SO_SA.jpg/revision/latest?cb=20200715020101",
    4: "https://static.wikia.nocookie.net/stormlightarchive/images/5/5c/Db_SA.jpg/revision/latest?cb=20200808220651",
    5: "https://static.wikia.nocookie.net/stormlightarchive/images/3/37/ED_SA.jpg/revision/latest?cb=20200815060427",
    6: "https://static.wikia.nocookie.net/stormlightarchive/images/1/19/Tw_SA.jpg/revision/latest?cb=20200804200353",
    7: "https://uploads.coppermind.net/thumb/WOKLB_-_KS_-_Lightweavers_by_Steve_Argyle.jpg/250px-WOKLB_-_KS_-_Lightweavers_by_Steve_Argyle.jpg",
    8: "https://beyondhogwarts.com/wp-content/uploads/2024/10/800px-WOKLB_-_KS_-_Elsecallers_by_Steve_Argyle-cosmere-stormlight.jpg",
    9: "https://static.wikia.nocookie.net/stormlightarchive/images/9/98/Ws_SA.jpg/revision/latest?cb=20200808215025",
    10: "https://uploads.coppermind.net/thumb/Stoneward_by_Petar_Penev.png/300px-Stoneward_by_Petar_Penev.png",
    11: "https://static.wikia.nocookie.net/stormlightarchive/images/d/d4/Bondsmiths_SA.jpg/revision/latest?cb=20200722042841"
}
export const Pictures = {
    1: "/profilePics/First_Ideal_poster.jpg",
    2: "/profilePics/windrunner.jpg",
    3: "/profilePics/skybreaker.jpg",
    4: "/profilePics/dustbringer.jpg",
    5: "/profilePics/edgedancer.jpg",
    6: "/profilePics/truthwatcher.jpg",
    7: "/profilePics/lightweaver.jpg",
    8: "/profilePics/elsecaller.jpg",
    9: "/profilePics/willshaper.jpg",
    10: "/profilePics/stoneward.jpg",
    11: "/profilePics/bondsmith.jpg"
}

export const Dannic = {
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
        "Picture": 1
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
        "Equipment": ["None"],
        "Spheres": 20
    },

    "conditions": ["None"],

    "user": "davidsdarley"
}


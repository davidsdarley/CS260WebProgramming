export const TalentsDict ={
    'Stances': "When you acquire the Vigilant Stance talent, you learn to use stances. You can enter a stance you know by using that talent’s stated number of actions. Your stance ends if you either end it as a free action, enter another stance, or end the scene. Whilein a stance, you temporarily gain any actions, bonuses,and other effects it grants; these effects end when thestance does. By default, you can only use stances during combat, not during other scenes.",
    "Vigilant Stance": "> While in this stance, reduce the focus cost of your Dodge and Reactive Strike reactions by 1. Additionally, you can enter another stance you know as a free action."
}
//inventory stuff
export const WeaponsDict = {
    "Poleaxe": "1d10 keen, Melee, Two-Handed, Melee [+5], 5 lb. 40 mk",
    "Shield": "1d4 impact, Melee, Defensive, Offhand, 2 lb. 10 mk",
    "Javelin": "1d6 keen, Melee, Thrown [30/120], Indirect, 2 lb. 20 mk",
    "Shardblade": "2d8 spirit, Melee, Dangerous/Deadly, loses Dangerous, 4 lb. Reward only"
}

export const ArmorDict = {
 "Chain": "2, Cumbersome [3], loses Cumbersome, 25 lb. 80 mk"
}

export const EquipmentDict = {

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

export const Dannic = {

    "characterInfo": {
        "name": "Dannic",
        "level": 2,
        "classes": ["Warrior"],
        "ancestry": "Human",

        "Purpose": "Honor. Dannic believes wholeheartedly in the values of Honor, Loyalty, and Honesty. This has guided him in everything he does. He wants to live them, and hopes others can live them as well.",
        "Obstacle": "While Dannic is extremely willing to charge into battle, he is much more averse to ideological conflict. His response to seeing things in reality that he doesn’t like is to ignore them. If someone who he can’t fight is doing something dishonorable, he’ll do his best to ignore it. If there is injustice he isn’t authorized to respond to, he will very uncomfortably turn away. He avoids thinking about problems he doesn’t know how to fix.",
        "Goals": ["Find and stop the storming smugglers operating in my tower", "Protect Falkir"],
        "Expertises": ["Poleaxe", "Alethi"]
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
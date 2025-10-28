import React from 'react';
import './charSheet.css';
import { Stats } from "./stats";

export function CharSheet({userData}) {

    const Dannic = {
        "strength": 3,
        "speed": 3,
        "maxHP": 20,
        "currentHP": 9,

        "intellect": 0,
        "willpower": 3,
        "currentFocus": 2,

        "awareness": 0,
        "presence": 2,
        "currentInvestiture": 0
    };

    const [character, setCharacter] = React.useState(Dannic);

  return (
    <main className = "sheetSections">
    
        <section className = "charInfo">
        <div className = "fillWidthTextbox">
            <p>Dannic</p>
            <p><span>Level 2</span><span> Human</span> Warrior</p>
        </div>
        <img id = "profilePic" alt="Taln" src="https://uploads.coppermind.net/thumb/Stoneward_by_Petar_Penev.png/300px-Stoneward_by_Petar_Penev.png" />
        
        <div className = "fillWidthTextbox">
            <h3>Purpose</h3>
            <ul>
                <li>None</li>
            </ul>
            <h3>Obstacle</h3>
            <ul>
                <li>None</li>
            </ul>
            <h3>Goals</h3>
            <ul>
                <li>None</li>
            </ul>
            <h3>Expertises</h3>
            <ul>
                <li>None</li>
            </ul>

        </div>
        </section>

        <section className = "gameplay" >

        
        <Stats
            character={character}
        />
        
        <hr></hr>

        <div id = "bottomSection"> 
        
            <div className = "list fillWidthTextbox" id = "talents">
                <h3>Talents</h3>
                <ul>
                <li>None</li>
                </ul>

            </div>

            <section id = "inventory">
                <div className="textbox" id="money">      
                    <span>Spheres: </span><input type="number"/>
                </div>
                
                <section className = "sheetSections">
                    <div className = "list evenSpacing textbox" id = "weapons">
                        <h3>Weapons</h3>
                        <ul>
                            <li>None</li>
                        </ul>
                    </div>

                    <div className = "list evenSpacing textbox" id = "ArmorAndEquipment">
                        <h3>Armor and Equipment</h3>
                        <ul>
                            <li>None</li>
                        </ul>
                    </div>
                </section>

            </section>
        
            <div className = "list textbox" id = "conditions">
                <h3>Conditions and Injuries</h3>
                <ul>
                    <li>None</li>
                </ul>
            </div>
        
        </div>

        </section>
  </main>
  );
}
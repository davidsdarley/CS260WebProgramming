import React from 'react';
import './charSheet.css'

export function CharSheet() {
  return (
    <main className = "sheetSections">
    
        <section class = "charInfo">
        <div class = "fillWidthTextbox">
            <p>Dannic</p>
            <p><span>Level 2</span><span> Human</span> Warrior</p>
        </div>
        <img id = "profilePic" alt="Taln" src="https://uploads.coppermind.net/thumb/Stoneward_by_Petar_Penev.png/300px-Stoneward_by_Petar_Penev.png" />
        
        <div class = "fillWidthTextbox">
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

        <section class = "gameplay" >

        <div class="stats">
            <section class = "textbox evenSpacing">
                <h3>Physical</h3>

                <table>
                    <tr>
                    <th>Strength</th>
                    <th>Defense</th>
                    <th>Speed</th>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>14</td>
                    <td>2</td>
                    </tr>
                </table>

            

                <div class = "meterAtribute"> 
                    <span>Health: 0 </span> <meter id="health" min="0" max="20" value="50" low="1" high = "15" optimum = "20"></meter> <span> 20</span>
                </div>
                <div class = "atribute">
                    <span>Deflect: </span><input type = "number"/>
                </div>

                <hr></hr>
                <div> 
                    <div class="skill">
                    <span>Agility</span>
                    <label><input type="checkbox" name="Agility-1"/></label>
                    <label><input type="checkbox" name="Agility-2"/></label>
                    <label><input type="checkbox" name="Agility-3"/></label>
                    <label><input type="checkbox" name="Agility-4"/></label>
                    <label><input type="checkbox" name="Agility-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Athletics</span>
                    <label><input type="checkbox" name="Athletics-1"/></label>
                    <label><input type="checkbox" name="Athletics-2"/></label>
                    <label><input type="checkbox" name="Athletics-3"/></label>
                    <label><input type="checkbox" name="Athletics-4"/></label>
                    <label><input type="checkbox" name="Athletics-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Heavy Weapons</span>
                    <label><input type="checkbox" name="HeavyWeapons-1"/></label>
                    <label><input type="checkbox" name="HeavyWeapons-2"/></label>
                    <label><input type="checkbox" name="HeavyWeapons-3"/></label>
                    <label><input type="checkbox" name="HeavyWeapons-4"/></label>
                    <label><input type="checkbox" name="HeavyWeapons-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Light Weapons</span>
                    <label><input type="checkbox" name="LightWeapons-1"/></label>
                    <label><input type="checkbox" name="LightWeapons-2"/></label>
                    <label><input type="checkbox" name="LightWeapons-3"/></label>
                    <label><input type="checkbox" name="LightWeapons-4"/></label>
                    <label><input type="checkbox" name="LightWeapons-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Stealth</span>
                    <label><input type="checkbox" name="Stealth-1"/></label>
                    <label><input type="checkbox" name="Stealth-2"/></label>
                    <label><input type="checkbox" name="Stealth-3"/></label>
                    <label><input type="checkbox" name="Stealth-4"/></label>
                    <label><input type="checkbox" name="Stealth-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Thievery</span>
                    <label><input type="checkbox" name="Thievery-1"/></label>
                    <label><input type="checkbox" name="Thievery-2"/></label>
                    <label><input type="checkbox" name="Thievery-3"/></label>
                    <label><input type="checkbox" name="Thievery-4"/></label>
                    <label><input type="checkbox" name="Thievery-5"/></label>
                    </div>
                </div>
            
            

                <div class= "atribute">
                <p>Carrying Capacity</p><input type = "number"/>
                </div>
                <div class= "atribute">
                <p>Movement</p><input type = "number"/>
                </div>

            </section>

            <hr></hr>

            <section class = "textbox evenSpacing">
            <h3>Cognitive</h3>
            <table>
                <tr>
                <th>Intellect</th>
                <th>Defense</th>
                <th>Willpower</th>
                </tr>
                <tr>
                <td>2</td>
                <td>14</td>
                <td>2</td>
                </tr>
            </table>

            <div class = "meterAtribute"> 
                <p>Focus: <span>0 </span> <meter id="focus" min="0" max="2" value="50" low="1" high = "2" optimum = "2"></meter> <span> 2</span></p>
            </div>

            <hr></hr>
            
                <div>
                    <div class="skill">
                    <span>Crafting</span>
                    <label><input type="checkbox" name="Crafting-1"/></label>
                    <label><input type="checkbox" name="Crafting-2"/></label>
                    <label><input type="checkbox" name="Crafting-3"/></label>
                    <label><input type="checkbox" name="Crafting-4"/></label>
                    <label><input type="checkbox" name="Crafting-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Deduction</span>
                    <label><input type="checkbox" name="Deduction-1"/></label>
                    <label><input type="checkbox" name="Deduction-2"/></label>
                    <label><input type="checkbox" name="Deduction-3"/></label>
                    <label><input type="checkbox" name="Deduction-4"/></label>
                    <label><input type="checkbox" name="Deduction-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Discipline</span>
                    <label><input type="checkbox" name="Discipline-1"/></label>
                    <label><input type="checkbox" name="Discipline-2"/></label>
                    <label><input type="checkbox" name="Discipline-3"/></label>
                    <label><input type="checkbox" name="Discipline-4"/></label>
                    <label><input type="checkbox" name="Discipline-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Intimidation</span>
                    <label><input type="checkbox" name="Intimidation-1"/></label>
                    <label><input type="checkbox" name="Intimidation-2"/></label>
                    <label><input type="checkbox" name="Intimidation-3"/></label>
                    <label><input type="checkbox" name="Intimidation-4"/></label>
                    <label><input type="checkbox" name="Intimidation-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Lore</span>
                    <label><input type="checkbox" name="Lore-1"/></label>
                    <label><input type="checkbox" name="Lore-2"/></label>
                    <label><input type="checkbox" name="Lore-3"/></label>
                    <label><input type="checkbox" name="Lore-4"/></label>
                    <label><input type="checkbox" name="Lore-5"/></label>
                    </div>

                    <div class="skill">
                    <span>Medicine</span>
                    <label><input type="checkbox" name="Medicine-1"/></label>
                    <label><input type="checkbox" name="Medicine-2"/></label>
                    <label><input type="checkbox" name="Medicine-3"/></label>
                    <label><input type="checkbox" name="Medicine-4"/></label>
                    <label><input type="checkbox" name="Medicine-5"/></label>
                    </div>
                </div>

                <hr></hr>

                <div class= "atribute">
                    <p>Recovery Die: </p><input type = "number"/>
                </div>

            </section>

            <hr></hr>

            <section class = "textbox evenSpacing">
                <h3>Spiritual</h3>
                <table>
                    <tr>
                    <th>Awareness</th>
                    <th>Defense</th>
                    <th>Presence</th>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>14</td>
                    <td>2</td>
                    </tr>
                </table>

                <div class = "meterAtribute"> 
                    <span>Investiture: 0 </span> <meter id="health" min="0" max="22" value="50" low="0" high = "1" optimum = "2"></meter> <span> 2</span>
                </div>

                <hr></hr>
            
                <div>
                    <div class="skill">
                        <span>Deception</span>
                        <label><input type="checkbox" name="Deception-1"/></label>
                        <label><input type="checkbox" name="Deception-2"/></label>
                        <label><input type="checkbox" name="Deception-3"/></label>
                        <label><input type="checkbox" name="Deception-4"/></label>
                        <label><input type="checkbox" name="Deception-5"/></label>
                    </div>

                    <div class="skill">
                        <span>Insight</span>
                        <label><input type="checkbox" name="Insight-1"/></label>
                        <label><input type="checkbox" name="Insight-2"/></label>
                        <label><input type="checkbox" name="Insight-3"/></label>
                        <label><input type="checkbox" name="Insight-4"/></label>
                        <label><input type="checkbox" name="Insight-5"/></label>
                    </div>

                    <div class="skill">
                        <span>Leadership</span>
                        <label><input type="checkbox" name="Leadership-1"/></label>
                        <label><input type="checkbox" name="Leadership-2"/></label>
                        <label><input type="checkbox" name="Leadership-3"/></label>
                        <label><input type="checkbox" name="Leadership-4"/></label>
                        <label><input type="checkbox" name="Leadership-5"/></label>
                    </div>

                    <div class="skill">
                        <span>Perception</span>
                        <label><input type="checkbox" name="Perception-1"/></label>
                        <label><input type="checkbox" name="Perception-2"/></label>
                        <label><input type="checkbox" name="Perception-3"/></label>
                        <label><input type="checkbox" name="Perception-4"/></label>
                        <label><input type="checkbox" name="Perception-5"/></label>
                    </div>

                    <div class="skill">
                        <span>Persuasion</span>
                        <label><input type="checkbox" name="Persuasion-1"/></label>
                        <label><input type="checkbox" name="Persuasion-2"/></label>
                        <label><input type="checkbox" name="Persuasion-3"/></label>
                        <label><input type="checkbox" name="Persuasion-4"/></label>
                        <label><input type="checkbox" name="Persuasion-5"/></label>
                    </div>

                    <div class="skill">
                        <span>Survival</span>
                        <label><input type="checkbox" name="Survival-1"/></label>
                        <label><input type="checkbox" name="Survival-2"/></label>
                        <label><input type="checkbox" name="Survival-3"/></label>
                        <label><input type="checkbox" name="Survival-4"/></label>
                        <label><input type="checkbox" name="Survival-5"/></label>
                    </div>
                </div>
                <hr></hr>
                <div class= "atribute">
                    <p>Senses Range: </p><input type = "number"/>
                </div>
            </section>
        </div>

        <hr></hr>

        <div id = "bottomSection"> 
        
            <div class = "list fillWidthTextbox" id = "talents">
                <h3>Talents</h3>
                <ul>
                <li>None</li>
                </ul>

            </div>

            <section id = "inventory">
                <div class="textbox" id="money">      
                    <span>Spheres: </span><input type="number"/>
                </div>
                
                <section class = "sheetSections">
                    <div class = "list evenSpacing textbox" id = "weapons">
                        <h3>Weapons</h3>
                        <ul>
                            <li>None</li>
                        </ul>
                    </div>

                    <div class = "list evenSpacing textbox" id = "ArmorAndEquipment">
                        <h3>Armor and Equipment</h3>
                        <ul>
                            <li>None</li>
                        </ul>
                    </div>
                </section>

            </section>
        
            <div class = "list textbox" id = "conditions">
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
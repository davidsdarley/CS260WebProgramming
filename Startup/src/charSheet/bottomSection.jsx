import React from 'react';
import './charSheet.css';
import { Lists } from './lists';
import { EditList } from './editList';
import { EditOptions } from './editOptions';
import { ArmorDict, ConditionsDict, EquipmentDict, TalentsDict, WeaponsDict } from './dictionaries';

export function BottomSection({talents, inventory, conditions, update = () => {}, edit}){

    const [inputSpheres, setInputSpheres] = React.useState(0);
    function updateSpheres(mode){
        const curspheres = inventory.Spheres;
        console.log("Update Spheres called. Initial count: ", curspheres);
        if(mode === "add"){
            update("inventory.Spheres", "replace", curspheres + inputSpheres);
        }
        else if(mode === "sub"){
            update("inventory.Spheres", "replace", curspheres - inputSpheres);
        }
        else{
            console.log("Update Spheres called invalidly: mode ", mode);
        }
        setInputSpheres(0);
        console.log("Final count: ", inventory.Spheres);
    }

    function doUpdate(field, mode, val, flag){
        console.log("FLAG DO UPDATE", flag);
        console.log(field, mode, val);
        update(field, mode, val);
    }
    if (edit){
        return(
            <div id = "bottomSection"> 
                <section className='textbox'>
                    <EditOptions
                        lst={talents}
                        str="Talent"
                        remove={(index)=>update("talents", "removeByIndex", index)}
                        add={(val)=>update("talents", "append", val)}
                        options={Object.keys(TalentsDict)}/>
                    
                </section>
            
                <br/>
    
                <section id = "inventory">
                    <section className = "sheetSections">
                        <div className='textbox' id="Weapons">
                        <EditOptions
                        lst={inventory.Weapons.allWeapons}
                        str="Weapon"
                        remove={(index)=>update("inventory.Weapons.allWeapons", "removeByIndex", index)}
                        add={(val)=>update("inventory.Weapons.allWeapons", "append", val)}
                        options={Object.keys(WeaponsDict)}
                        />
                        </div>

                        <div className='textbox' id="Armor">
                        <EditOptions
                        lst={inventory.Armor.allArmor}
                        str="Armor"
                        remove={(index)=>update("inventory.Armor.allArmor", "removeByIndex", index)}
                        add={(val)=>update("inventory.Armor.allArmor", "append", val)}
                        options={Object.keys(ArmorDict)}
                        />
                        </div>
                    </section>
    
                </section>
                <section className = "sheetSections">
                        
                        <div className='textbox' id="Equipment">
                        <EditOptions
                            lst={inventory.Equipment}
                            str="Equipment"
                            remove={(index)=>update("inventory.Equipment", "removeByIndex", index)}
                            add={(val)=>update("inventory.Equipment", "append", val)}
                            options={Object.keys(EquipmentDict)}
                        />
                        </div>

                        <div className='textbox' id="Conditions">
                        <EditOptions
                            lst={inventory.conditions}
                            str="Condition"
                            remove={(index)=>update("conditions", "removeByIndex", index)}
                            add={(val)=>update("conditions", "append", val)}
                            options={Object.keys(ConditionsDict)}
                        />
                        
                        </div>
                </section>
            </div>
    
        );
    }

    return(
        <div id = "bottomSection"> 
        
            <Lists
            title = "Talents"
            list={talents}
            update={(field, mode, val)=> doUpdate(field, mode, val, "talents")}
            />
            <br/>

            <section id = "inventory">

                <div className="textbox" id="money">      
                    <span>Spheres: </span><span>{inventory["Spheres"]} </span>
                    <br></br>
                    <span>Add/Subtract Spheres </span> 
                    <br/>

                    <input type="number"
                    value={inputSpheres} 
                    onChange={(e) => setInputSpheres(Number(e.target.value))} 
                    />
                    
                    <br></br>
                    <button onClick={() => updateSpheres('add')}> Add</button>
                    <button onClick={() => updateSpheres('sub')}> Subtract</button>
                </div>

                
                <section className = "sheetSections">
                    <Lists
                        title ="Weapons"
                        field="inventory.Weapons"
                        list={inventory["allWeapons"]}
                        inventory={inventory}
                        update={(field, mode, val)=>doUpdate(field, mode, val, "weapons")}
                    />

                    <Lists
                        title ="Armor"
                        field="inventory.Armor"
                        list={inventory["allArmor"]}
                        inventory={inventory}
                        update={(field, mode, val)=>doUpdate(field, mode, val, "armor")}
                    />

                </section>

            </section>
            <section className = "sheetSections">
                    <Lists
                        title ="Equipment"
                        field="Equipment"
                        list={[inventory["Equipment"]]}
                        inventory={inventory}
                        update={(field, mode, val)=>doUpdate(field, mode, val, "equipment")}
                    />
                    
                    
                    <Lists
                        title = "Conditions and Injuries"
                        field="conditions"
                        list={conditions}
                        inventory={inventory}
                        update={(field, mode, val)=>doUpdate(field, mode, val, "conds")}
                    />
                    
            </section>
        </div>

    );
}
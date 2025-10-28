import React from 'react';
import './charSheet.css';
import { Lists } from './lists';

export function BottomSection({talents, inventory, conditions, update = () => {}}){

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
    

    return(
        <div id = "bottomSection"> 
        
            <Lists
            title = "Talents"
            list={talents}
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
                        list={inventory["allWeapons"]}
                        inventory={inventory}
                    />

                    <Lists
                        title ="Armor"
                        list={inventory["allArmor"]}
                        inventory={inventory}
                    />

                </section>

            </section>
            <section className = "sheetSections">
                    <Lists
                        title ="Equipment"
                        list={[inventory["Equipment"]]}
                        inventory={inventory}
                    />
                    
                    
                    <Lists
                        title = "Conditions and Injuries"
                        list={conditions}
                        inventory={inventory}
                    />
            </section>
        </div>

    );
}
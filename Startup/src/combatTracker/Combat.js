import { StatBlocks } from "./statBlocks.js";

export class Combat{
    constructor() {
        this.code = this.generateCode();
        this.PCs = [];
        this.NPCs = [];
        this.owner = "";
    }
    newCode(){
        this.code = this.generateCode()
    }
    generateCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          code += chars[randomIndex];
        }
        return code;
      }
    
    addPC(character){
        if(!this.PCs.some(pc => pc.id === character.id)){
            this.PCs.push(character); //Add the PC to the combat when a player joins.
          }
    }
    setOwner(username){
        this.owner=username;
    }
    
    removePCbyName(name){   //removes the first one. Probably should make sure your PCs have different names.
        const index = this.PCs.findIndex(item => item.name === name);
        if (index !== -1) {
            this.PCs.splice(index, 1);  
            return true;          
        }
        return false;              // no match found
    }
    removePCbyIndex(i){
        if (i >= 0 && i < this.PCs.length) {
            this.PCs.splice(i, 1);   
            return true;
        }
        return false;               // index out of bounds
    }
    removeNPCbyIndex(i){
        if (i >= 0 && i < this.NPCs.length) {
            this.NPCs.splice(i, 1);   
            return true;
        }
        return false;               // index out of bounds
    }

    addNPC(name){
        this.NPCs.push(StatBlocks[name]);
    }
    setCode(c){
        this.code = c;
    }

}
import { StatBlocks } from "./statBlocks";

export class Combat{
    constructor() {
        this.code = this.generateCode();
        this.PCs = [];
        this.NPCs = [];
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
        this.PCs.push(character);
    }
    addNPC(name){
        this.NPCs.push(StatBlocks[name]);
    }
    setCode(c){
        this.code = c;
    }

}
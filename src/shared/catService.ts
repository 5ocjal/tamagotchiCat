import { CatColor, CatHealth } from './enums';
export class CatService {
  
  color: CatColor = CatColor.ORANGE;
  name: string = 'Kotek';
  happiness: number;
  hunger: number;
  energy: number;
  health: CatHealth;


  setCatName(name: string) {
    this.name = name;
  }

  getCatName(): string {
    return this.name;
  }

  setCatColor(color: CatColor){
    this.color = color;
  }

  getCatColor(): CatColor {
    return this.color;
  }



  saveGame(){
    
  }
}

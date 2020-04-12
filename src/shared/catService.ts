import { CatColor } from './enums';
export class CatService {
  catName: string = 'Kotek';
  catColor: CatColor = CatColor.ORANGE;

  setCatName(name: string) {
    this.catName = name;
  }

  getCatName(): string {
    return this.catName;
  }

  setCatColor(color: CatColor){
    this.catColor = color;
  }

  getCatColor(): CatColor {
    return this.catColor;
  }

  saveGame(){
    
  }
}

import { CatColor, CatHealth, CatActivity, CatDirection } from './enums';
export class CatService {
  
  cat = {
    name: 'Kotek',
    color: CatColor.ORANGE,
    activity: CatActivity.RUN,
    happiness: 100,
    hunger: 100,
    energy: 100,
    health: CatHealth.FIT,
    direction: CatDirection.RIGHT
  }


  setCatName(name: string) {
    this.cat.name = name;
  }

  getCatName(): string {
    return this.cat.name;
  }

  setCatColor(color: CatColor){
    this.cat.color = color;
  }

  getCatColor(): CatColor {
    return this.cat.color;
  }

  serCatActivity(activiti: CatActivity){
    this.cat.activity = activiti;
  }

  getCatActivity(): CatActivity {
    return this.cat.activity;
  }

  setCatHappiness(happines: number){
    this.cat.happiness = happines;
  }

  getCatHappiness(): number{
    return this.cat.happiness;
  }

  setCatHunger(hunger: number){
    this.cat.hunger = hunger;
  }

  getCatHunger(): number{
    return this.cat.hunger;
  }

  setCatEnergy(energy: number){
    this.cat.energy = energy;
  }

  getCatEnergy(): number{
    return this.cat.energy;
  }

  setCatHealth(health: CatHealth){
    this.cat.health = health;
  }

  getCatHealth(): CatHealth{
    return this.cat.health;
  }

  setCatDirection(direction: CatDirection) {
    this.cat.direction = direction;
  }

  getCatDirection(): CatDirection {
    return this.cat.direction;
  }


  loadCatState() {
    return this.cat;
  }

  saveCatState(){
    
  }
}

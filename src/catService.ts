export class CatService {
  catName: string = 'Kotek';

  setCatName(name) {
    this.catName = name;
  }

  getCatName() {
    return this.catName;
  }
}

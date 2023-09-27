export default class Player {
  
    constructor(name) {
     
      this.x =9;
      this.y = 0;
      this.name =name;
    }
  
    getPos() {
      return [this.x, this.y];
    }
    setPos(pos) {
      this.x = pos[0];
      this.y = pos[1];
    }
  }


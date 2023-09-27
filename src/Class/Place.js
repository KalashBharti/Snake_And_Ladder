export default class Place {
    constructor() {
      this.obstacle = false;
      this.x = 0;
      this.y = 0;
    }
  
    getTranfer() {
      return [this.x, this.y];
    }
    addTransfer(x, y) {
      this.obstacle = true;
      this.x = x;
      this.y = y;
    }
  
  }

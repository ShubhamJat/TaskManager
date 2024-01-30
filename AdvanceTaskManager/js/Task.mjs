export default class Task {
    id;
    name;
    isCompleted=false;
    getName() {
      return this.name;
    }

    isCompleted(){
        return this.isCompleted;
    }

    constructor(id,name){
        this.id=id;
        this.name=name;
    }
 }
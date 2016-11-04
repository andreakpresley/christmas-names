import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public myArray = [];
  public namesArray = [];
  public pairedArray = [];
  public duplicateNames = [];
  public number = 6;
  public duplicates = false;

  ngOnInit() {
    this.function();
    this.submitted();
  }
  public function() {
    this.myArray = [];
    for (let i = this.number; i > 0; i--) {
      this.myArray.push({ name: "" })
    }
    this.myArray=[{name: "Nick Saban"},{name: "Bret Bielema"},{name: "Gus Malzahn"},{name: "Jim McElwain"},{name: "Kirby Smart"},{name: "Hugh Freeze"}]
  };

  public submitted() {
    this.duplicates = false;
    this.namesArray = [];
    this.duplicateNames = [];
    for (let i = this.number - 1; i > -1; i--) {
      this.namesArray.push(this.myArray[i].name)
    }
    this.duplicateNames = this.namesArray.slice();
    if (this.checkUnique(this.namesArray)) {
      this.duplicates = true;
    } else {
      this.pairNames(this.namesArray, this.duplicateNames);
    }
    
  }

  public pairNames(array, duplicateArray) {
    this.pairedArray = [];
    for (let i = array.length - 1; i > -1; i--) {
      //let randomNumber = this.generateRandomNumber(array.length,indexUsed);
      let randomNumber = this.rand(array[i], duplicateArray);

      if (i === 1 && duplicateArray.includes(this.namesArray[0])) {// see if the  number has been used yet
        //make the second to last one be the last one to avoid the last one being the only option
        this.pairedArray.push({ "name": array[1], "got": this.namesArray[0] });
        let duplicateIndex = duplicateArray.indexOf(this.namesArray[0])
        duplicateArray.splice(duplicateIndex, 1);
        this.pairedArray.push({ "name": array[0], "got": duplicateArray[0] });
        duplicateArray.splice(randomNumber, 1);

        return this.pairedArray;
      }

      else {
        this.pairedArray.push({ "name": array[i], "got": duplicateArray[randomNumber] })
        duplicateArray.splice(randomNumber, 1);
      }


    }
  }

  public rand(name, duplicateArray) {
    let matching = true;
    let randomNumber = Math.floor(Math.random() * this.duplicateNames.length);
    while (matching) {
      randomNumber = Math.floor(Math.random() * this.duplicateNames.length);
      if (name != duplicateArray[randomNumber]) {
        matching = false;
      }
    }
    return randomNumber;
  }

  public checkUnique(array) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    if (array.length !== array.filter( onlyUnique ).length) {
      return true;
    } else {
      return false;
    }
  }
}


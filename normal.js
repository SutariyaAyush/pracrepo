const numbers = [1, 2, 3, 4];

numbers.forEach((number) => {
    console.log(number * 2);
});
//foreach can't modifiy original array and nop created new array
//shift - delete from front 
//unshift - add from front
//toString()
//push() pop()  
//flat flatMap() 
//key() index only 
//entries() 0,1 

const spilce = numbers.splice(1,2,4,5)
console.log(spilce);

console.log(numbers.slice(1,3));
console.log(numbers);  

const newarr = numbers.map(element => {return element*2})
console.log(newarr);

const filterarr = numbers.filter(element => {return element>2}) 
console.log(filterarr); 

const reduce = numbers.reduce((acc,element)=> {return element+acc},0)
console.log(reduce);

const search = numbers.find(element => {return element==2}) //findIndex //indexOf
console.log(search);
 
const every = numbers.every(element => {return (element%2==0)}) //some
console.log(every); 

//diff between arrow and normal 

// hello = function() {
//     document.getElementById("demo").innerHTML += this;
//   }
  
//   // The window object calls the function:
//   window.addEventListener("load", hello);
  
// A button object calls the function:
//   document.getElementById("btn").addEventListener("click", hello);
// in normal function this refer current context so the output is like window object and second for button object


//   hello = () => {
//     document.getElementById("demo").innerHTML += this;
//   }
  
//   // The window object calls the function:
//   window.addEventListener("load", hello);
  
//   // A button object calls the function:
//   document.getElementById("btn").addEventListener("click", hello);
//in arrow function this refer that object in which that created do output is like both time window object

let str="ayush"

//toLowerCase()
//toUpperCase()
//concat()
//trim()
//replace()
//split()
//indexOf()
  
for(let i=0;i<str.length;i++){
    console.log(str[i]);  //strcharAt at
}
 
let extract = str.slice(1,3) // lessthan 0 treated as 0 in subString otherwise both are similar
console.log("hello",str);

let padding = str.padEnd(10,"0") //ayush00000 padStart()
console.log(padding);

let searchstr = str.search("y")
console.log(searchstr);

let matchstr = str.match("u")
console.log(matchstr);

//pure function means it's not effect value of given argument it will create new varible and made changes into that varible instead given parameter value
//imperative: what to do and how to do
//declarative : what to do and what should be like array

const obj = {name:"ayush"}
// const obj2= obj
const obj2 = {...obj}
if(obj === obj2) {
    console.log(true);
}
obj2.name="meet"
console.log(obj);   

function Car(make,speed){
    this.make= make
    this.speed=speed
}

Car.prototype.accelerate = function(){
    this.speed += 10
    console.log(`'${this.make}' going at ${this.speed} km/h`);
}

Car.prototype.brake = function(){
    this.speed -= 5
    console.log(`'${this.make}' going at ${this.speed} km/h`);
}
 
const car1= new Car('bmw',120)
car1.accelerate()
car1.brake()

function Ev(charge){
    // Car.call(this,make,speed)
    this.charge=charge
}


// console.log(Ev.make);

Ev.prototype.chargeBattery = function(){
    return this.charge= 90
}

Ev.prototype.accelerate = function(){
    this.speed += 20
    this.charge -= 1
    console.log(`'${this.make}' going at ${this.speed} km/h,with a charge of ${this.charge}%`);
}



const ev1 = Ev(23)
// console.log(ev1.make);
// ev1.chargeBattery()
// ev1.brake()
// ev1.accelerate();

// .toString(2) convert into binary string
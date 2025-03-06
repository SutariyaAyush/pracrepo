// class charater{
//     constructor(name,weapone){
//         this.name=name;
//         this.weapone=weapone
//     }
//     attack(){
//         return 'attack with ' + this.weapone;
//     }
// }


// const peter = new elf('peter','gun')
// console.log(peter.attack());
// console.log(peter instanceof elf);


// class elf extends charater {
//     constructor(name,weapone,type){
//         super(name,weapone)
//         this.type = type
//     }
// }
// const peter = new elf('peter','gun')
// console.log(peter.attack());
// constructor function 
// function Person(name,age){

//     this.name = name 
//     this.age = age 
//     this.attack = function(){
//         return 'attack with '+ this.age
//     }
// }
// const peter = new Person('peter',3)
// console.log(peter.attack());

// function clickhandler(color){
//     // document.body.style.backgroundColor = `${color}`  bcz onclick need a function not direct value
//     return function(){
//         document.body.style.backgroundColor = `${color}` // lexical scoping and clouser 
//     }
// }

// document.getElementById('green').onclick = clickhandler('green')

// const user={
//     username: "ayush",
//     age:2,
//     getuser(){
//         console.log(this); //refer current object values..this is refer current context it return also those vlue,event and function which is lie in that contex 
//         console.log(this.username);
//     }
// }
  
// user.getuser()
// console.log(this);

// cunstructor function 
// function User(name,age){
//     this.name = name 
//     this.age = age 
//     return this; // update meet althought we call user1 that's why we use new keyword
// }

// const user1 =new User("ayush",21)
// const user2 = new User("meet",15)
// console.log(user1);

//prototype
// let num=[1,2,3]

// const obj = {
//     name:"ayush",
//     age: 2
// }

// Object.prototype.ayush = function(){
//     console.log("hello");
// }
// Array.prototype.heyayush = function(){
//     console.log("hey");
// }

// const obj1 ={
//     gender:"male",
// }

// Object.setPrototypeOf(obj1,obj) //obj1.__proto__ =obj //liking between two different object   
// console.log(obj1.name);
// obj.ayush()
// num.ayush()
// // obj.heyayush() //obj can't access prototye of array bcz arr is child of object
// num.heyayush()


// let str= "asfdfdsas   "

// String.prototype.truelength = function(){
//     console.log(`${this}`);
//     console.log(`${this.trim().length}`);
// }

// str.truelength()


// classes and bts of classes 
// ES6

// class User {
//     constructor(username, email, password){
//         this.username = username;
//         this.email = email;
//         this.password = password
//     }

//     encryptPassword(){
//         return `${this.password}abc`
//     }
//     changeUsername(){
//         return `${this.username.toUpperCase()}`
//     }

// }

// const chai = new User("chai", "chai@gmail.com", "123")

// console.log(chai.encryptPassword());
// console.log(chai.changeUsername());

// // behind the scene

// function User(username, email, password){
//     this.username = username;
//     this.email = email;
//     this.password = password
// }

// User.prototype.encryptPassword = function(){
//     return `${this.password}abc`
// }
// User.prototype.changeUsername = function(){
//     return `${this.username.toUpperCase()}`
// }


// const tea = new User("tea", "tea@gmail.com", "123")

// console.log(tea.encryptPassword());
// console.log(tea.changeUsername());

// (function(){
//     console.log("hello");
// })()

// const me = Object.create();

// me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
// me.isHuman = true; // Inherited properties can be overwritten

// console.log(me);

// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 8 };
// const merged = {...target,...source, a:3}
// console.log(merged);
// Object.assign(target, source);
// Object.setPrototypeOf(target,source)
// console.log(target);


// (shallow and deep copy) 
// A shallow copy of an object is a copy whose properties share the same references(point to the same underlying values) as those of the source object 
// from which the copy was made.As a result, when you change either the source or the copy, you may also cause the other object to change too.

// const obj1 = { 
// 	id: 1, 
// 	company: "GFG"
// }; 
// const obj2 = obj1; 
// obj2.id = 2; 
// console.log(obj1.id); 
// console.log(obj2.id); 

// A deep copy of an object is a copy whose properties do not share the same references (point to the same underlying values) as those of the source 
// object from which the copy was made. As a result, when you change either the source or the copy,you can be assured you're not causing the other object to change too.

// let employee = {
//     eid: "E102",
//     ename: "Jack",
//     eaddress: "New York",
//     salary: 50000
// }
// console.log("=========Deep Copy========");
// let newEmployee = JSON.parse(JSON.stringify(employee));
// console.log(newEmployee);
// console.log("Employee=> ", employee);
// console.log("New Employee=> ", newEmployee);
// console.log("---------After modification---------");
// newEmployee.ename = "Beck";
// newEmployee.salary = 70000;
// console.log("Employee=> ", employee);
// console.log("New Employee=> ", newEmployee);


// const person = {
//     name: 'Alice',
//     age: 30,
//     city: 'New York'
//   };
  
// person.gender = "male"
// Object.prototype.greet = function () { return 'Hello'; }; 


// for (let [key,value] of Object.entries(person)) {
//      console.log(value);
    
// }
  
// function Animal(type) { //object ni values or methods ne initialize karva 
//     this.type = type;
//   }
  
//   const dog = new Animal('Dog');  // Correct use with 'new'
//   const cat = Animal('Cat');      // Incorrect! Without 'new', 'this' is undefined.
//   console.log(dog.type);  // Output: "Dog"
//   console.log(typeof dog);

// function greeting(name){
//     console.log(`hello ${name}`);
// }
// console.log(object);
// const animal = {
//     speak: function() {
//       console.log('Animal speaks');
//     }
//   };
  
//   const dog = {};
//   Object.setPrototypeOf(dog, animal);
  
//   dog.speak();

// const obj1 = {name:"ayush"}
// const obj2= {...obj1}
// obj2.name="harsh";
// console.log(obj1);
                         

//bind() chill method ma parent na varible ni value use karva

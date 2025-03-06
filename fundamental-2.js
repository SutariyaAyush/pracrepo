const readlineSync = require('readline-sync');
// function describeCountry(country,population,capitalCity){
//     console.log(`${country} has ${population} million people and its capital city is ${capitalCity}`);
// }

// describeCountry("india",200,"Delhi")
// let total = 7900

// const percentageOfWorld1 = function(population){
//     const percentage = Math.round((population/total)*100)
//     return percentage
//     // console.log(`China has ${population} million people, so it's about ${percentage}% of the world population`);
// }
// percentageOfWorld1(2000)

// const percentageOfWorld3 = (population) => {
//     let percentage = Math.round((population/total)*100)
//     console.log(`China has ${population} million people, so it's about ${percentage}% of the world population`);
// }
// percentageOfWorld3(2000)

// const describePopulation= (country, population) =>{
//     let percentage = percentageOfWorld1(population)
//     console.log(`${country} has ${population} million people, which is about ${percentage}% of the world.`);
// } 
// describePopulation("india",2000)

// const population=[200,400,1000,5000]
// const countries =["india","china","usa","canada"]
// const percentage =[]
// for(let i=0;i<population.length;i++){

//     percentage[i]=percentageOfWorld1(population[i])
// }
// console.log(percentage);

// const myobject = {
//     name : "ayush",
//     age : 21
// }

// console.log(myobject["name"]);
// console.log(myobject.age);

// myobject.gender = "male"
// console.log(myobject);

// for(let i=1;i<=50;i++){
//     console.log(`Voter number ${i} is currently voting`);
// }

// for (let i = 0; i < listOfNeighbours.length; i++) {
//     for (let y = 0; y < listOfNeighbours[i].length; y++) {
//         console.log(`Neighbour: ${listOfNeighbours[i][y]}`)
//     }
// }

// const greet = (greeting) =>{
//     return function name(name){
//         console.log(`${greeting} ${name}`);
//     }
// }

// // const greetview = greet('hey')
// // greetview('ayush')
// greet('hey')('ayush')

// const greet = greeting => name => surname => {
//     console.log(`${greeting} ${name} ${surname}`);
// }

// greet('hey')('ayush')('sutariya')

// const account1 = {
//     owner: 'Jonas Schmedtmann',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
//   };
  
//   const account2 = {
//     owner: 'Sarah Smith',
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
//   };
  
//   const account3 = {
//     owner: 'Steven Thomas Williams',
//     movements: [200, -200, 340, -300, -20, 50, 400, -460],
//     interestRate: 0.7,
//     pin: 3333,
//   };
  
//   const account4 = {
//     owner: 'Sarah Smith',
//     movements: [430, 1000, 700, 50, 90],
//     interestRate: 1,
//     pin: 4444,
//   };
  
//   const accounts = [account1, account2, account3, account4];
  
//   const account = accounts.every(acc=> acc.owner == 'Sarah Smith')
//   console.log(account);
//   const arr = [[1,2,3],4,[5,[6,7]]]
//   console.log(arr.flat());
//   console.log(arr.flat(2));
  
//   const acco = accounts.map(acc => acc.movements).flat() //istead map we can write flatmap
//   console.log(acco);
  
//   // console.log(acco.sort()); only work in string 
  
//   // console.log(acco.sort((a,b)=> {if(a>b) return 1
//   //   if(b>a) return -1
//   // }));
  
//   console.log(acco.sort((a,b)=>a-b));

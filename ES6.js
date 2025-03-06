let number=[1,20,3,4,5,6]

// number.forEach(function(element){
//     element=element*2;
// })
// console.log(number);

// let products=[
//     {name:"cucumber",type:"vegetable",quntity:0,price:5},
//     {name:"cucumber",type:"fruit",quntity:5,price:9},
//     {name:"cucumber",type:"vegetable",quntity:10,price:15},
//     {name:"cucumber",type:"fruit",quntity:0,price:15},

// ]

// const newarr=products.filter((product)=> {return product.type=='fruit' && product.quntity>0 && product.price<10})
// console.log(newarr);

// const ispresent=number.find((number)=>{
//     return number==20;
// })

// console.log(ispresent);



// console.log(number.every(function(num){
//     return num>1
// }));
  
        
// console.log(number.reduce((sum,num)=>{
//     return sum += num 
// },0) );

// const body={
//     name:"ayush",
//     age:5,
//     marks:[5,4,6,4]
// }
// const [First,second,...rest]=body.marks //also we can destructure the porperties of array with curly 
// const {age} = body
// console.log(First);
// console.log(second);
// console.log(age);

// const details= ({name,age},{gender}) => {
//     return `the name of man is ${name}. his age is ${age}. he is a ${gender}`
// }


// console.log(details(body,{gender:"male"}));

// const promise= new Promise((resolve,reject)=>{
//    resolve()
// })

// promise
// .then(()=> console.log("hello"))
// .then(()=>console.log("promise execute successfully"))
// .catch(()=>console.log("rejected"))

// const whereAmi = (lat, lng) => {
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();  
//         })
//         .then(data => {
//             console.log(data); 
//         })
//         .catch(err => {
//             console.log('Error:', err); 
//         });
// };

// whereAmi(52.508, 13.381);
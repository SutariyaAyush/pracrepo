// const Urls=[
//     'https://jsonplaceholder.typicode.com/todos',
//     'https://jsonplaceholder.typicode.com/posts',
//     'https://jsonplaceholder.typicode.com/comments'
// ]

// const getdata2 = async function(){
//     try{
//         const response = await Promise.all(Urls.map(async (url)=>{ //in all it will only give response if all url promise resolved...otherwise catch blok will execute
//                                                                         // .allsetteld() will give all state which promise is resolved and what not
//         const data = await fetch(url)
//         return data.json()
//     }))
//         console.log(response);
//     }   
//     catch(error){
//         console.log("oops");   
//     }

//     //second method (not recomanded to use)
//     // const arrayofpromise = Urls.map(url => fetch(url))


//     // for await (let request of arrayofpromise){
//     //     const data = await request.json()
//     //     console.log(data);
//     // }

// }

// getdata2() 




// async function race(){
//     const promise = [a,b,c]
//     const Output1= await Promise.race(promise) //who ever run first output will be that... .all() run all in parallel
//     return Output1

// }

// race().then(console.log)

// async function sequence(){
//     const o1 = await a
//     const o2 = await b
//     const o3 = await c
//     return {o1,o2,o3}
// }

// sequence().then(console.log




// function setname(name){
//     console.log(this);
//     this.name=name 
// }

// function greeting(func){
//     func("ayush")
   
//      function person(){
//         // console.log(this.name);
//     }
//     return person()   
// }
// greeting(setname)
// console.log(this);
// console.log(this.name);

//complete shallow copy and deep copy , api fetching, promise and error handling

// greeting()
// function greeting(){
//     console.log(a);
//     console.log("hello");
//     var a = 10 // only declaration goes on the top of the scope but initialization stay as it is that's why output coming as undefine
// }
  

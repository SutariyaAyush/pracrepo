// try{}
// catch{}
// finally{}

// Promise.resolve('asyncfail')
//     .then(response=>{
//         throw new Error('#1')
//         return response
//     })
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         throw new Error('#2')
        
//     })
//     .then(response=>{
//         console.log(response.message);
//     })
//     .catch(error=>{
//         console.log(error.message);
//     })
//    .finally(()=>console.log())   

    


    // Promise.resolve('asyncfail')
    // .then(response=>{
    //     Promise.resolve('async').then(response=> {throw new Error()}).catch(error => console.log(error))
    //     return 5
        
    // })
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error=>{
    //     console.log(error.message);
    // })

    //alternative: using async await we can handle promise with try catch easy
    // (async function(){
    //     try{
    //         await Promise.resolve('resolved')
    //         await Promise.reject('error')
    //     }catch(error){
    //         console.log(error);
    //     }
    // }
    // )() 

//with the help of extending error we can protect some system call stack information from the users and we can create it as many as we want
// class AuthenticationError extends Error {
//     constructor(message){
//         super(message)
//         this.name = "AuthenticationError"
//         this.error= "token verification faild"
//     }

// }

// const a= new AuthenticationError("oops")
// console.log(a);
// console.log(a.error);

// var a= 12

// function print(){
//     console.log(a);
//     var a=5
//     console.log(a);  
// }

// print()
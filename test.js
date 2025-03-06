const mapper =
{
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
}
let str1 = "ICI" 
let arr=str1.split('')
let str=""
let temp;
let num = 0;


arr.forEach(element => {
    if(mapper[element]!=undefined) str+=element
});


function test(str) {
    if (str.length == 1) return mapper[str[0]];

    if (str.length == 2 && mapper[str[1]] > mapper[str[0]]) return mapper[str[1]] - mapper[str[0]]  
    
    for (let i = 0; i < str.length; i++) {
        if (mapper[str[i]] < mapper[str[i + 1]]) {
            temp = mapper[str[i + 1]] - mapper[str[i]]
            i++
            num += temp
            temp = 0
        }
        else {
            num += mapper[str[i]]
        }
    }          
    return num
}
   
console.log(test(str));   

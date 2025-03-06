// // let str1="my name is ayush sutariya"
// // function reversestr(){
// //     let arr=str1.split(" ");

// //     const revarr=arr.map((element)=>{
// //         return element.split("").reverse().join("")
        
// //     })
// //     console.log(revarr.reverse().join(" ")); 
// // }

// // reversestr(str1)



// h= [1,1]
// // Output: 49
// // Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

// let area = 0;
// for(let i=0;i<h.length;i++){
//     for(let j=1;j<h.length;j++){
//         let result = (h[i]>h[j]) ? (h[j] * (j-i)) : (h[i] * (j-i))
      
//         if( result > area ) {
//             area= result 
//         }
//     }
// }    
// console.log(area);




// // let str = "1x0 * 100 = 12000"
// // let [first,second] = str.split(" = ")
// // second.trim()
// // let num = Number(second)
// // const arr= first.split(" ")

// // let part;
// // (!arr[0].includes("x")) ? part = arr[0] : part = arr[2]
// // let xpart;
// // (arr[0].includes("x")) ? xpart = arr[0] : xpart = arr[2]

// // let partconvert=Number(part)

// // let ans ;
// // if(arr[1]=='+') ans= second - partconvert
// // else if(arr[1] == '-') ans = second + part 
// // else if(arr[1] == '*') ans = second / part 
// // else ans = second * part  
// // let compare = String(ans)


// // for (let i=0;i<first.length;i++){
// //     if(xpart.charAt(i)=='x'){
// //         console.log(compare.charAt(i));
// //     }
// // }




// Given string `num` representing a non-negative integer `num`, and an integer `k`, return the smallest possible integer after removing `k` digits from `num`.
// Examples
// - **Input:** num = "1432219", k = 3
// **Output:** "1219"
// **Explanation:** Remove the three digits 4, 3, and 2 to form the new number 1219.

// - **Input:** num = "10200", k = 1
// **Output:** "200"

// - **Input:** num = "10", k = 2
// **Output:** "0"

// ### Constraints
// - 1 <= k <= num.length <= 10⁵
// - num consists of only digits.


// let str = "10200"
// let arr = str.split('')
// let k=2
// let cnt=k
// if (arr.length == k) console.log("0");
// else {
//     for (let i = 0; i < arr.length; i++) {
//         if (cnt > 0) {
//             if (Number(arr[i + 1]) > Number(arr[i])) {
//                 let temp = arr[i];
//                 arr[i] = arr[i + 1]
//                 arr[i + 1] = temp
//                 cnt--;
//             }
//             else {
//                 cnt--
//             }
//         }

//         else { break; }
//     }
//     arr.splice(0,k)
//     console.log(Number(arr.join("")));
// }  

// console.log(str);
// console.log(solve("arrb6???4xxbl5???eee5"))// true
// console.log(solve("acc?7??sss?3rr1??????5")) // true
// console.log(solve("5??aaaaaaaaaaaaaaaaaaa?5?5")) // true
// console.log(solve("9???1???9???1???9")) // true
// console.log(solve("aa6?9")) // false
// console.log(solve("8???2???9")) // false
// console.log(solve("10???0???10")) // false
// console.log(solve("aa3??oiuqwer?7???2")
 
// function QuestionsMarks(str) { 

//     let first;
//     let cnt=0;
//     for(let i=0;i<str.length;i++){
//         if(str.charAt(i)>=0 && str.charAt(i)<=9 && cnt<3){
            
//             first=str.charAt(i)
            
//         }
//         if(str.charAt(i)=='?') cnt++;
//         if((str.charAt(i)>=0 && str.charAt(i)<=9) && cnt>=3){
            
//             if((Number(first)+Number(str.charAt(i)))<=10) {
//                 cnt=0;
//                 first=str.charAt(i);
//             }
//             else  { return false;}
            
//         }
//     }
  
//     if(1<=cnt && cnt<3) return false
//     return true 
//   }


//peak element 
//  return arr.indexOf(Math.max(...arr))

// class person {
//     name = "ayush"
//     age=21
//     greet(){
//         return "hello from person"
//     }
// }

// class prop extends person {
//     gender = "male"
// }

// const prop1= new prop()
// console.log(prop1.greet());


//count element
// let str = "abcdabcabcdfsadaabc"
// const mapper = new Map() 
// for(let i=0;i<str.length;i++){
    
//     if(mapper.has(str[i])){
//         let value = mapper.get(str[i])+1
//         mapper.set(str[i],value)  
//     }
//     else{
//         mapper.set(str[i],1)
//     }
// }

// console.log(mapper);



// function strrevers(str){
    
    
//     return str.split('').reverse().join('')
// }

// let str= "cbbd"
// let arr = str.split('')
// let temp= ""
// for(let i=0;i<str.length;i++){
//     temp += str[i]
//     for(let j=i+1 ; j<str.length;j++){
//         temp+= str[j]
//         arr.push(temp)
//     }
//     temp = ""
// }
// console.log(arr);
// let maxlength=0    
// for(let i=0;i<arr.length;i++){
//     if((arr[i]==strrevers(arr[i])) && (arr[i].length>=arr[maxlength].length)){
        
//         maxlength=i
//     }
// }
// console.log(arr[maxlength]);


// Given two strings s and t, determine if they are isomorphic.

// let s = "paper" 
// let t = "title"
// let temp=""
// let mapper = new Map()
// for(let i=0;i<s.length;i++){
     
//     if(mapper.has(s[i])){
//         let part = mapper.get(s[i])
//         if(part!=t[i]) return false;
//     }
//     else{
//         mapper.set(s[i],t[i])
//         if(temp.includes(t[i])) return false
//         temp+=t[i]
//     }
// }

// console.log(true);



//find the missing number from the array
// const arr=[1, 2, 5, 4, 6, 7, 8, 9, 10] //50 
// let n=1;
// for(let i=0;i<arr.length;i++){
//     if(!arr.includes(n)) console.log(n);  
//     n++; 
// }

//wordtonumber
/* 
Have the function MinWindowSubstring(strArr) take the array of strings stored in strArr,
which will contain only two strings, the first parameter being the string N and the second parameter being a string K of some characters,
and your goal is to determine the smallest substring of N that contains all the characters in K.

For example:
if strArr is ["aaabaaddae", "aed"] then the smallest substring of N that contains the characters a, e, and d is "dae" located at the end of the string.
So for this example your program should return the string dae.
*/

let strArr = ["aaabaaddae", "aed"]  
let window = strArr[1].length
let cnt=0;
let temp;
for(let i=0;i<strArr[0].length;i++){                                                                          
    temp += strArr[0][i]     
    if(cnt==window){
        if(str[1] ==temp) console.log("true"); 
        else cnt=0
    } 
    temp=""
}     
console.log("false");

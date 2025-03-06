// // 8)
// const game = {
//     team1: 'Bayern Munich',
//     team2: 'Borrussia Dortmund',
//     players: [
//         [
//             'Neuer',
//             'Pavard',
//             'Martinez',
//             'Alaba',
//             'Davies',
//             'Kimmich',
//             'Goretzka',
//             'Coman',
//             'Muller',
//             'Gnarby',
//             'Lewandowski',
//         ],
//         [
//             'Burki',
//             'Schulz',
//             'Hummels',
//             'Akanji',
//             'Hakimi',
//             'Weigl',
//             'Witsel',
//             'Hazard',
//             'Brandt',
//             'Sancho',
//             'Gotze',
//         ],
//     ],
//     score: '4:0',
//     scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
//         'Hummels'],
//     date: 'Nov 9th, 2037',
//     odds: {
//         team1: 1.33,
//         x: 3.25,
//         team2: 6.5,
//     },
// };

// const [player1,player2]= game.players
// // console.log(player1,player2);
// const [gk,...feildplayer] = player1
// const allplayer = [...player1,...player2]
// const playeronefinal=[...player1,'Thiago', 'Coutinho','Perisic']
// const {team1,draw,team2} = game.odds
// const odds=game.odds
// const printGoals = (...name)=>{
//     console.log(`${name.length} goal is scored`);
// }

// printGoals(...game.scored)

// team1<team2 && console.log("team1 is more likely win the match"); // first condition will false then && operator will not ceck for second condition
// team1>team2 && console.log("team2 is more likely win the match"); 
// let sum=0

// for(let odd in odds ){
//     sum+=odds[odd]
// }
// console.log(sum/3);

// 9)
// const gameEvents = new Map([
//     [17, '⚽ GOAL'],
//     [36, '🔁 Substitution'],
//     [47, '⚽ GOAL'],
//     [61, '🔁 Substitution'],
//     [64, '🔶 Yellow card'],
//     [69, '🔴 Red card'],
//     [70, '🔁 Substitution'],
//     [72, '🔁 Substitution'],
//     [76, '⚽ GOAL'],
//     [80, '⚽ GOAL'],
//     [92, '🔶 Yellow card'],
// ]);
// // let events=[...new Set(gameEvents.values())]
// let events = []
// gameEvents.delete(64);
// console.log(gameEvents);

// for(let [,value] of gameEvents){
    
//     if(!events.includes(value)) events.push(value)
// }

// console.log(`An event happened, on
// average, every ${90/gameEvents.size} minutes`);
// console.log(events);

// A peak element is an element that is strictly greater than its neighbors.

// Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

// You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

// You must write an algorithm that runs in O(log n) time.

 

// Example 1:

// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.
// Example 2:

// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.


// function ho(callback){
//     callback()
//     console.log("hello")
// }
// function greet(){
//     console.log("hey")
// }
// ho(greet)



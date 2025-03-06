// 1)
// let Marks_weights=78;
// let Marks_mass=78/9.8
// let Marks_heigth=1.69
// let John_weights=92
// let John_mass=92/9.8
// let John_heigth = 1.95

// let Marks_BMI = (Marks_mass/Math.pow(Marks_heigth,2)).toFixed(1)
// let John_BMI = (John_mass/Math.pow(John_heigth,2)).toFixed(1)

// let markHigherBMI;

// if(Marks_BMI<John_BMI){
//     markHigherBMI=false;
// }
// else{
//     markHigherBMI=true
// }
// console.log(markHigherBMI);

// 2)
// if(Marks_BMI>John_BMI){
//     console.log(`Mark's BMI (${Marks_BMI}) is higher than John's (${John_BMI})!`);
// }
// else{
//     console.log(`John's BMI (${John_BMI}) is higher than Mark's (${Marks_BMI})!`);

// }

// 4)
// const bill = 275
// const tip= (bill >= 50 && bill <= 300) ? bill*(15/100) : bill*(20/100)
// const totalbill = bill+tip
// console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${totalbill}`);

// const avg = (num1,num2,num3) => {
//     return (num1+num2+num3)/3;
//     console.log("dolphin is winner");
// } 
// const dolphin_avg=avg(44,23,71)
// const team2_avg=avg(65,54,49)

// if(dolphin_avg >= 2*team2_avg){
//     console.log("dolphin is winner");
// }
// else if(team2_avg>=2*dolphin_avg){
//     console.log("team2 is winner");
// }
// else{
//     console.log("no team is winner");
// }

// 5)
// let bills=[125,555,44]
// let tips=[]
// let total=[]

// function calcTip(bill){
//     const tip= (bill >= 50 && bill <= 300) ? bill*(15/100) : bill*(20/100)
//     return tip
// }

// for(let i=0;i<bills.length;i++){
//     tips[i]=calcTip(bills[i])
//     total[i]=bills[i]+tips[i]
// }
// console.log(tips);
// console.log(total);

// 7)
// let temp=[17,21,23,25,21,24]
// let str=""
// for(let i=0;i<temp.length;i++){
//     str += `...${temp[i]}ºC in ${i+1} days`
// }

    
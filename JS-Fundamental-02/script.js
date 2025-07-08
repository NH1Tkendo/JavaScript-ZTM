//Function
// function describeCountry(country, population, capitalCity) {
//     return console.log(`${country} has ${population} milion people and its capital city is ${capitalCity}`);
// }

// describeCountry("a", 5, "abc");
//=================================
//Function declarations and Expressions
// function percentageOfWorld1(population) {
//     return population / 7900 * 100;
// }

// const vn = percentageOfWorld1(100);
// const cn = percentageOfWorld1(2000);
// const usa = percentageOfWorld1(150);

// console.log(vn, cn, usa);

// const percentageOfWorld2 = function (population) {
//     return population / 7900 * 100;
// }
//=========================================
//Arrow function

// const percentageOfWorld3 = population => (population / 7900) * 100;
//=========================================
//Functions Calling Other Functions
// const describePopulation = function (country, population) {
//     const popu = percentageOfWorld1(population);
//     return console.log(`${country}, ${popu}`);
// }
//========================================
//Challenge 5:
// const calcAverage = (firstScore, secScore, thirdScore) => (firstScore + secScore + thirdScore) / 3;

// const scoreDolphins = calcAverage(85, 54, 41);
// const scoreKoalas = calcAverage(23, 34, 27);

// const checkWinner = (aveDolphins, aveKoalas) => {
//     if (aveDolphins >= aveKoalas * 2) {
//         return console.log(`Dolphins win (${aveDolphins} vs. ${aveKoalas})`);
//     } else if (aveKoalas >= aveDolphins * 2) {
//         return console.log(`Koalas win (${aveKoalas} vs. ${aveDolphins})`);
//     } else {
//         return console.log('No team win');
//     }
// };

// checkWinner(scoreDolphins, scoreKoalas);
//=================================================
//Array
// const populations = [10, 1441, 332, 83];

// console.log(populations.length === 4);

// const percentages = [
//   percentageOfWorld1(populations[0]),
//   percentageOfWorld1(populations[1]),
//   percentageOfWorld1(populations[2]),
//   percentageOfWorld1(populations[3])
// ];

// console.log(percentages);
//================================================
//Basic Array operator
// const neighbours = ["Lao", "Cambodia", "China"];

// neighbours.push('Utopia');
// neighbours.pop();

// if (neighbours.includes('Germany') === false) {
//     console.log('Probably not a central european country :D');
// }

// neighbours[neighbours.indexOf("Lao")] = "abcxyz";
// console.log(neighbours);
//================================================
//Challenge 6
// const calcTip = tip => tip >= 50 && tip <=300 ? tip * 0.15 : tip * 0.2

// const bills = [125, 555, 44];
// const tips = [calcTip(125), calcTip(555), calcTip(44)];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
//================================================
// Object
// const myCountry = {
//     country: "Vietnamese",
//     capital: "Ha Noi",
//     language: "Vietnamese",
//     population: 100,
//     neighbours: ['Lao', "Combodia", "China"],
//     describe() {
//         return `${this.country} has ${this.population} milion peoples, ${this.neighbours.length} neighbours country and a capital city called ${this.capital}`;
//     },
//     checkIsland() {
//         this.isIsland = this.neighbours.length > 0 ? false : true;
//     }
// }

// console.log(`My country has ${myCountry.neighbours.length} neighbours and they are ${myCountry.neighbours[0]}`)
//================================================
// dot vs bracket
// myCountry.population += 2;
// console.log(myCountry.population);

// myCountry['population'] -= 2;
// console.log(myCountry.population);
//================================================
// Object method
// console.log(myCountry.describe());
// console.log(myCountry.checkIsland());
// console.log(myCountry.isIsland);
//================================================
//Challenge 7
// const mark = {
//     fullName: "Mark Miller",
//     mass: 78,
//     height: 1.69,
//     calcBMI(){
//         this.bmi = this.mass / (this.height * this.height)
//         return this.bmi
//     }
// }

// const john = {
//     fullName: "John Smith",
//     mass: 92,
//     height: 1.95,
//     calcBMI(){
//         this.bmi = this.mass / (this.height * this.height)
//         return this.bmi;
//     }
// }

// mark.calcBMI();
// john.calcBMI();

// console.log(`${mark.fullName}'s (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`)
//======================================================================
//Vòng lặp for
// for (let i = 1; i <= 50; i++) {
//     console.log(`Voter number ${i} is currently voting`);
// }
//======================================================================
// Duyệt mảng, break và continue
// const percentage2 = []

// for (let i = 0; i < populations.length; i++) {
//     percentage2[i] = percentageOfWorld1(populations[i]);
// }

// console.log(percentage2);
//======================================================================
// Duyệt lùi và vòng lặp lồng nhau
// const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

// for (let i = 0; i <= 2; i++) {
//     for (let j = 0; j <= listOfNeighbours[i].length - 1; j++) {
//         console.log(`Neighbours: ${listOfNeighbours[i][j]}`)
//     }
// }
//======================================================================
// While
// const percentages3 = [];

// let i = 0;
// while (i < populations.length) {
//     const perc = percentageOfWorld1(populations[i]);
//     percentages3.push(perc);
//     i++;
// }

// console.log(percentages3);
//=======================================================================
// Challenge 8
// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

// const tips = [];
// const totals = [];

// const calvAverage = arr => {
//     let sum = 0;
//     for (let j = 0; j < arr.length; j++){
//         sum += arr[j];
//     }
//     return sum / arr.length;
// }

// for (let i = 0; i < 10; i++){
//     const tip = calcTip(bills[i]);
//     tips.push(tip);
//     totals.push(tip + bills[i]);
// }

// console.log(tips)
// console.log(totals)
// console.log(calvAverage(tips))
//==============================================================



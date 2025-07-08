let language = 'Vietnamese';
const country = 'VietNam';
const continent = 'Asia';
const isIsland = false;

//Basic operator
// let population = 100000000;
// let finPopulation = 6000000;
// const avePop = 33000000;

// console.log(population / 2);
// console.log(population + 1);
// console.log(population > finPopulation);
// console.log(population < avePop);
//========================================

//If/else statements
// if (population > 33) {
//   console.log(`${country}'s population is above average`);
// } else {
//   console.log(
//     `${country}'s population is ${33 - population} million
//     below average`
//   );
// }
//==================================

// Challenge 1
// const massMark = 78, heightMark = 1.69, massJohn = 92, heightJohn = 1.95;

// const BMIMark = massMark / (heightMark * heightMark);
// const BMIJohn = massJohn / (heightJohn * heightJohn);

// const markHigherBMI = BMIMark > BMIJohn;
// console.log(BMIMark, BMIJohn);
// console.log(markHigherBMI);

//Strings and template literals
//const description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
//==================================
//Challenge 2
// if (BMIMark > BMIJohn) {
//     console.log(`Mark's BMI ${BMIMark} is higher than John's ${BMIJohn}!`);
// } else {
//     console.log(`John's BMI ${BMIJohn} is higher than Mark's ${BMIMark}!`);
// }
//==================================
//Type conversion and coercion
// console.log('9' - '5'); // -> 4
// console.log('19' - '13' + '17'); // -> '617'
// console.log('19' - '13' + 17); // -> 23
// console.log('123' < 57); // -> False
// console.log(5 + 6 + '4' + 9 - 4 - 2); // -> 1143
//===================================
// == và ===
// let numNeighbours = Number(prompt('How many neighbour countries does your contry have?'));

// if (numNeighbours === 1) {
//     console.log('Only 1 border!')
// } else if (numNeighbours > 1) {
//     console.log("More than 1 border");
// } else {
//     console.log("No borders");
// }
//=====================================
//Logical operators
// if (language === 'english' && population < 50 && !isIsland) {
//   console.log(`You should live in ${country} :)`);
// } else {
//   console.log(`${country} does not meet your criteria :(`);
// }
//=====================================
//Challenge 3
// const scoreDolphins = (96 + 108 + 89) / 3;
// const scoreKoalas = (88 + 91 + 110) / 3;

// console.log(scoreDolphins);

// if (scoreDolphins > scoreKoalas) {
//     console.log("Dolphins win the trophy");
// } else if (scoreKoalas > scoreDolphins) {
//     console.log("Koalas win the trophy");
// } else {
//     console.log("Both win the trophy")
// }
//============================================
//Switch
// switch (language) {
//   case 'chinese':
//   case 'mandarin':
//     console.log('MOST number of native speakers!');
//     break;
//   case 'spanish':
//     console.log('2nd place in number of native speakers');
//     break;
//   case 'english':
//     console.log('3rd place');
//     break;
//   case 'hindi':
//     console.log('Number 4');
//     break;
//   case 'arabic':
//     console.log('5th most spoken language');
//     break;
//   default:
//     console.log('Great language too :D');
// }
//============================================
//Tenary condition
// console.log(
//     `${country}'s population is ${population > 33 ? 'above' : 'below'} average`
// );
//============================================
//Challenge 4
// const bill = 275;
// const tip = bill >= 50 && bill < 300 ? bill * 0.15 : bill * 0.2

// console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);
//============================================

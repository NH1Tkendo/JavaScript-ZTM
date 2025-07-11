'use strict';
// Scope test

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;
//   function printAge() {
//     const output = `${nameP}, you are ${age}, born in  ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 2000 && birthYear < 2025) {
//       const str = 'You are gen Z';
//       var s = 'hehe'; //function scope

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // return str;
//     console.log(s);
//     console.log(add(2, 4)); //function thuoc block scope
//   }
//   printAge();

//   return age;
// }

// const nameP = 'Tai';
// calcAge(2000);
//====================================
// this test
console.log(this); //{], tra ve doi tuong window tren browser

function a() {
  console.log(this); // this trong function, tra ve undefined
}

const b = () => {
  console.log(this); // this trong arrow function, tra ve {} do lay this tu scope cha
};

const myObject = {
  a: 1,
  add() {
    console.log(this); //this trong object, tra ve doi tuong goi no
  },
};

a();
b();
myObject.add();

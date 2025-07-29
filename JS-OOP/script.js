'use strict';
// Constructor functions
// const Person = function (name, age) {
//   this.name = name;
//   this.age = age;
// };

// const people1 = new Person('ABC', 30);
// const people2 = new Person('Tai', 20);

// console.log(typeof people1);
//=======================================
// Prototypes
// Person.prototype.calcAge = function (age) {
//   console.log(2055 - this.age);
// };

// people1.calcAge();

// console.log(people1.__proto__); // Hiển thị Person.prototype, chứa calcAge
// console.log(people1.__proto__ === Person.prototype); // true

// console.log(Person.prototype.isPrototypeOf(people1));

//-------------------------------------
// Them thuoc tinh moi vao prototype
// Person.prototype.species = 'Homo Sapiens';
// console.log(people1.species); // Kết quả: 'Homo Sapiens'
//-------------------------------------
// Kiem tra thuoc tinh
// console.log(people1.hasOwnProperty('name')); // true
// console.log(people1.hasOwnProperty('species')); // false
///////////////////////////////////////
// Prototypes
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// matilda.calcAge();

// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// .prototyeOfLinkedObjects

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
// console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} has increase speed to ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} has decrease speed to ${this.speed} km/h`);
// };

// const BMW = new Car('BMW', 120);
// const Mercedes = new Car('Mec', 95);

// BMW.accelerate();
// Mercedes.accelerate();
// Mercedes.accelerate();
// Mercedes.accelerate();
// BMW.accelerate();
// BMW.brake();
// BMW.brake();
// Mercedes.brake();
//============================================
// Classes
class Hello {
  // constructor(name, age) {
  //   this.name = name;
  //   this.age = age;
  // }

  static wave() {
    console.log('👋👋👋');
  }

  get birthYear() {
    return 2025 - this.age;
  }

  set fullName(name) {
    if (name === '') return console.log('Not a valid name');

    return (this.name = name);
  }

  sayHello() {
    console.log(
      `Hello, My name is ${this.name} and i am ${this.age} years old`
    );
  }
}

// const people10 = new Hello('abc', 30);

// people10.sayHello();

// console.log(people10.__proto__.sayHello() === Hello.prototype.sayHello());

// console.log(people10.birthYear);
//-------------
// Dung ham set
// people10.fullName = '';
//===================================
// Goi phuong thuc tinh
// Hello.wave();
//-----------------------------------
//Object.create
// init (initialize - khoi tao)

// const hi = Object.create(Hello);
// console.log(hi.__proto__);
// console.log(hi.__proto__.__proto__); //Class.prototype
// console.log(hi.__proto__.__proto__.__proto__); //Object.prototype
// console.log(hi.__proto__.__proto__.__proto__.__proto__); //NUll
//-----------------------------------
// Challenge 2
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} has increase speed to ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} has decrease speed to ${this.speed} km/h`);
//   }
// }

// const Ford = new Car('Ford', 120);

// console.log(`Ford is going at ${Ford.speedUS} km/h`);
// Ford.accelerate();
// Ford.accelerate();
// Ford.brake();
// console.log(`Ford is going at ${Ford.speedUS} km/h`);
// Ford.speedUS = 1000;
// console.log(`Ford is going at ${Ford.speedUS} km/h`);
//--------------------------------------------------------
// Inherit with constructor funcion
// const Person = function (name, birthYear) {
//   this.name = name;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   return 2025 - this.birthYear;
// };

// const Student = function (name, birthYear, course) {
//   Person.call(this, name, birthYear);
//   this.course = course;
// };

// Student.prototype = Object.create(Person.prototype);

// Student.prototype.sayHello = function () {
//   console.log(`My name is ${this.name} and i'm studying ${this.course}`);
// };

// const mike = new Student('Teo', 2004, 'JavaScript master');
// mike.sayHello();
// console.log(mike.calcAge());
//==========================================
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} is going at ${this.speed}, with a charge of ${this.charge}`
//   );
// };

// const eletricCar = new EV('Vinfast 8', 100, 50);

// eletricCar.chargeBattery(90);
// eletricCar.accelerate();
//-------------------------------------
// Inherit - ES6 classes
// class Person {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   calcAge() {
//     console.log(2025 - this.birthYear);
//   }
// }

// class Student extends Person {
//   constructor(fullName, birthYear, course) {
//     super(fullName, birthYear);
//     this.course = course;
//   }
//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }
// }

// // Tạo đối tượng Student
// const martha = new Student('Martha Jones', 2012, 'Computer Science');

// // Gọi phương thức từ lớp con
// martha.introduce(); // Kết quả: My name is Martha Jones and I study Computer Science

// // Gọi phương thức từ lớp cha (hoặc ghi đè)
// martha.calcAge(); // Kết quả: I'm 25 years old, but as a student, I feel more like 35
//===============================================
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movements = [];
//   }

//   deposit(amount) {
//     this.movements.push(amount);
//     return this;
//   }

//   withdraw(amount) {
//     this.movements.push(-amount);
//     return this;
//   }

//   #approveLoan(amount) {
//     return true;
//   }

//   requestLoan(amount) {
//     if (this.#approveLoan(amount)) {
//       this.movements.push(amount);
//       return this;
//     }
//     return this;
//   }

//   getMovements() {
//     return this.movements; // Không xâu chuỗi được
//   }
// }

// // Sử dụng xâu chuỗi
// const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(300).withdraw(100).withdraw(50).requestLoan(25000).withdraw(4000);
// console.log(acc1.getMovements()); // [300, -100, -50, 25000, -4000]
//=================================================
// Challenge 4
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class CarCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCL extends CarCL {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed}, with a charge of ${this.#charge}`
    );
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCL('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);

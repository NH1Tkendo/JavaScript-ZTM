'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Tao lich su giao dich
const displayMovement = function (movement, sort = false) {
  const movs = sort
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : movement;

  containerMovements.innerHTML = '';
  movs.forEach(function (value, index) {
    //Lam trong danh sach
    const type = value > 0 ? 'deposit' : 'withdrawal';
    //Tao phan tu html
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${value}€</div>
    </div>`;

    //Them phan tu html vao sau khi tao div
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// Tao ten nguoi dung cho tung tai khoan
const createUsername = function (acc) {
  acc.forEach(function (ele) {
    ele.userName = ele.owner
      .toLowerCase()
      .split(' ')
      .map(ele => ele[0])
      .join('');
  });
};

// Tinh so du
const calculateBalance = acc => {
  acc.balance = acc.movements.reduce((accu, ele) => accu + ele, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//Tinh tong hien thi
const calDisplaySummary = acc => {
  const inSummary = acc.movements
    .filter(cur => cur >= 0)
    .reduce((acc, cur) => acc + cur, 0);

  const outSummary = acc.movements
    .filter(cur => cur < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const intSummary = acc.movements
    .filter(cur => cur >= 0)
    .map(cur => (cur * acc.interestRate) / 100)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${inSummary}€`;
  labelSumOut.textContent = `${Math.abs(outSummary)}€`;
  labelSumInterest.textContent = `${intSummary}€`;
};
// Reset UI
const updateUI = currentAccount => {
  displayMovement(currentAccount.movements);
  calculateBalance(currentAccount);
  calDisplaySummary(currentAccount);
};
// Xu ly su kien dang nhap
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    cur => cur.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Xu ly UI co ban
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 1;
    // Xu ly cac o hien thi
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Xu ly giao dien lien quan toi giao dich
    updateUI(currentAccount);
  }
});
// Xu ly su kien chuyen tien
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const user = accounts.find(acc => acc.userName === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  console.log(user, amount);
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    user?.userName !== currentAccount.userName
  ) {
    // Xu ly chuyen khoan
    currentAccount.movements.push(-amount);
    user.movements.push(amount);
    updateUI(currentAccount);

    // Lam trong o nhap
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
  }
});
// Xu ly su kien xoa tai khoan
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const currentAccIndex = accounts.findIndex(
      cur => cur.userName === inputCloseUsername.value
    );

    accounts.splice(currentAccIndex, 1);

    inputCloseUsername = inputClosePin = '';
    inputClosePin.blur();

    containerApp.style.opacity = 100;
  }
});
// Xu ly su kien loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(
      cur => cur >= Number(inputLoanAmount.value) * 0.1
    )
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);

    inputLoanAmount = '';
    inputLoanAmount.blur();
  }
});

// Xu ly su kien sorting
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// Chay cac ham
createUsername(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Simple Array Methods
// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE
// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));

///////////////////////////////////////
// The new at Method
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('jonas'.at(0));
// console.log('jonas'.at(-1));

///////////////////////////////////////
// Looping Arrays: forEach
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('---- FOREACH ----');
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

///////////////////////////////////////
// forEach With Maps and Sets
// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const checkDogs = (dogsJulia, dogsKate) => {
//   //Shallow copy
//   const correctDataJulia = dogsJulia.slice();
//   correctDataJulia.splice(0);
//   correctDataJulia.splice(-1);
//   //=============
//   const trueData = [...dogsJulia, ...dogsKate];

//   trueData.forEach(function (value, index) {
//     if (value >= 3) {
//       console.log(
//         `Dog number ${index + 1} is an adult, and is ${value} years old`
//       );
//     } else {
//       console.log(`Dog number ${index + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////
// The map Method
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

///////////////////////////////////////
// The filter Method
// const deposits = movements.filter(function (mov, i, arr) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

///////////////////////////////////////
// The reduce Method
// console.log(movements);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// // Maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/
// const calcAverageHumanAge = ages => {
//   const cal =
//     ages
//       .map(cur => (cur <= 2 ? cur * 2 : 16 + cur * 4))
//       .filter(cur => cur >= 18)
//       .reduce((acc, cur) => acc + cur, 0) / ages.length;

//   return cal;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
///////////////////////////////////////
// The Magic of Chaining Methods
// const eurToUsd = 1.1;
// console.log(movements);

// // PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * eurToUsd;
//   })
//   // .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const calcAverageHumanAge = ages => {
//   const cal =
//     ages
//       .map(cur => (cur <= 2 ? cur * 2 : 16 + cur * 4))
//       .filter(cur => cur >= 18)
//       .reduce((acc, cur) => acc + cur, 0) / ages.length;

//   return cal;
// };
//============================================
///////////////////////////////////////
// The find Method
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

///////////////////////////////////////
// The New findLast and findLastIndex Methods

// console.log(movements);
// const lastWithdrawal = movements.findLast(mov => mov < 0);
// console.log(lastWithdrawal);

// // 'Your latest large movement was X movements ago'

// const latestLargeMovementIndex = movements.findLastIndex(
//   mov => Math.abs(mov) > 1000
// );
// console.log(latestLargeMovementIndex);
// console.log(
//   `Your latest large movement was ${
//     movements.length - latestLargeMovementIndex
//   } movements ago`
// );

///////////////////////////////////////
// some and every
// console.log(movements);

// // EQUALITY
// console.log(movements.includes(-130));

// // SOME: CONDITION
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // EVERY
// console.log(movements.every(mov => mov > 0));
// // console.log(account4.movements.every(mov => mov > 0));

// Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

///////////////////////////////////////
// flat and flatMap
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// flat
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// flatMap
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
// const breeds = [
//   {
//     breed: 'German Shepherd',
//     averageWeight: 32,
//     activities: ['fetch', 'swimming'],
//   },
//   {
//     breed: 'Dalmatian',
//     averageWeight: 24,
//     activities: ['running', 'fetch', 'agility'],
//   },
//   {
//     breed: 'Labrador',
//     averageWeight: 28,
//     activities: ['swimming', 'fetch'],
//   },
//   {
//     breed: 'Beagle',
//     averageWeight: 12,
//     activities: ['digging', 'fetch'],
//   },
//   {
//     breed: 'Husky',
//     averageWeight: 26,
//     activities: ['running', 'agility', 'swimming'],
//   },
//   {
//     breed: 'Bulldog',
//     averageWeight: 36,
//     activities: ['sleeping'],
//   },
//   {
//     breed: 'Poodle',
//     averageWeight: 18,
//     activities: ['agility', 'fetch'],
//   },
// ];

// 1.
// const huskyWeight = breeds.find(cur => cur.breed === 'Husky').averageWeight;
// console.log(huskyWeight);
//--------------------------
// 2.
// const dogBothActivities = breeds.find(
//   cur => cur.activities.includes('running') && cur.activities.includes('fetch')
// ).breed;
// console.log(dogBothActivities);
//-------------------------
// 3.
// const allActivities = breeds.flatMap(cur => cur.activities);
// console.log(allActivities);
//-------------------------
//4.
// const uniqueActivities = [...new Set(allActivities)];
// console.log(uniqueActivities);
// 5.
// const swimmingAdjacent = [
//   ...new Set(
//     breeds
//       .filter(cur => cur.activities.includes('swimming'))
//       .flatMap(cur => cur.activities)
//       .filter(cur => cur !== 'swimming')
//   ),
// ];

// console.log(swimmingAdjacent);
//---------------------------------------
// 6.
// console.log(breeds.every(cur => cur.averageWeight > 10));
//---------------------------------------
// 7.
// console.log(breeds.some(cur => cur.activities.length >= 3));
//========================================
///////////////////////////////////////
// Sorting Arrays

// Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// movements.sort((a, b) => a - b);
// console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// movements.sort((a, b) => b - a);
// console.log(movements);

///////////////////////////////////////
// Array Grouping

// console.log(movements);

// const groupedMovements = Object.groupBy(movements, movement =>
//   movement > 0 ? 'deposits' : 'withdrawals'
// );
// console.log(groupedMovements);

// const groupedByActivity = Object.groupBy(accounts, account => {
//   const movementCount = account.movements.length;

//   if (movementCount >= 8) return 'very active';
//   if (movementCount >= 4) return 'active';
//   if (movementCount >= 1) return 'moderate';
//   return 'inactive';
// });
// console.log(groupedByActivity);

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
// const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
// console.log(groupedAccounts);

///////////////////////////////////////
// More Ways of Creating and Filling Arrays
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
// const x = new Array(7);
// console.log(x);
// console.log(x.map(() => 5));
// x.fill(1, 3, 5);
// x.fill(1);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);

//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
// });

///////////////////////////////////////
// Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with

// console.log(movements);
// const reversedMov = movements.toReversed();
// console.log(reversedMov);

// // toSorted (sort), toSpliced (splice)

// // movements[1] = 2000;
// const newMovements = movements.with(1, 2000);
// console.log(newMovements);

// console.log(movements);
//======================================
// Array practice
// 1.
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);
//---------------------------------------
// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// console.log(numDeposits1000);
// 3. Create an object with sum of deposit and withdrawals
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur >= 0 ? (sums.deposit += cur) : (sums.withdrawals += cur);
//       sums[cur >= 0 ? 'deposit' : 'withdrawals'] += cur;
//       return sums;
//     },
//     {
//       deposit: 0,
//       withdrawals: 0,
//     }
//   );

// console.log(sums);
//-----------------------------------------
// 4.
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  
  const titleArr = title
    .toLowerCase()
    .split(' ')
    .map(cur => cur[0].toUpperCase() + cur.slice(1))
    .join(' ');

  console.log(titleArr);
};

convertTitleCase('this is a nice title case');
convertTitleCase('this is a LONG title but not too long');

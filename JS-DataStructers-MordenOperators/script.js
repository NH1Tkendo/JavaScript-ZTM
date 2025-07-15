'use strict';
// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const books = [
  {
    title: 'abc',
    author: 'Tai',
    ISBN: 100,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    printBookInfo({ title, author, year = 'unknown' }) {
      console.log(`${title} by ${author}, ${year}`);
    },
  },
  'book1',
  'book2',
  'book3',
];

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];

const ratingStars = [63405, 1808];
//======================================
// Destructuring array
// 1. Lay 2 phan tu dau tien
// const [a, b] = books;
// console.log(a, b);
// 2. Lay phan tu cuoi
// const [, , c] = books;
// console.log(c);
// 3. Phan ra mang long nhau
// const [[, rating], [, ratingsCount]] = ratings;
// console.log(rating, ratingsCount);
// 4. phan ra mang voi gia tri mac dinh
// const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
// console.log(fiveStarRatings, oneStarRatings, threeStarRatings);
//===============================================================
// Phan ra doi tuong
// 1. Phan ra doi tuong
// const { title, author, ISBN } = books[0];
// console.log(title, author, ISBN);
// 2. Thay doi ten key
// const { author: tags } = books[0];
// console.log(tags);
// 3. Gia tri mac dinh
// const {language, programmingLanguage = 'unknown'} = books[6];
// 4. Ghi de gia tri
// let bookTitle = 'unknown';
// let bookAuthor = 'unknown';

// ({ title: bookTitle, author: bookAuthor } = books[0]);
// console.log(bookTitle, bookAuthor);
// 5. Phan ra doi tuong long nhau
// const {
//   thirdParty: {
//     goodreads: { rating: bookRating },
//   },
// } = books[0];

// console.log(bookRating);
// 6. Dung phan ra doi tuong lam doi so
// books[0].printBookInfo({
//   title: 'Algorithms',
//   author: 'Robert Sedgewick',
//   year: '2011',
// });

// books[0].printBookInfo({ title: 'Algorithms', author: 'Robert Sedgewick' });
//=================================================
// 3. Toan tu trai
// const bookAuthors = [...books[0].author, ...books[1].author];

// function spellWord(word) {
//   console.log(...word);
// }
// spellWord('JavaScript');
//=================================================
// 4. Toan tu gom nhom
// const { fri, ...rest } = restaurant.openingHours;
// console.log(fri, rest);

//1. Rest binh thuong
// const [mainKeyword, ...rest] = books[0].keywords;

//2. Rest object
// const {publisher: bookPublisher, ...restOfTheBook} = books[1];

//3. Rest dung lam parameters
// function printBookAuthorsCount(title, ...authors) {
//   console.log(`The book "${title}" has ${authors.length} authors`);
// }

// printBookAuthorsCount('Algorithms', 'Robert Sedgewick', 'Kevin Wayne');
//===============================================================
// || va &&
// 1. OR
const book2 = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    programmingLanguage: 'Java', // <-- HERE\
    pages: 70,
    keywords: ['algorithms', 'data structures'],
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Algorithms1',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    programmingLanguage: 'Python', // <-- HERE
    onlineContent: true,
    pages: 23,
    keywords: ['computer science', 'programming'],
    thirdParty: {
      goodreads: {
        rating: 4,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
];

// function hasExamplesInJava(book) {
//   return book.programmingLanguage === 'Java' || 'No data found';
// }

// console.log(hasExamplesInJava(book2[0]));
// console.log(hasExamplesInJava(book2[1]));

// 2. AND
// for (let i = 0; i < book2.length; i++) {
//   book2[i].onlineContent &&
//     console.log(`${book2[i].title} provides online content`);
// }

//=============================================================
// Nullish coalecsing operator
// for (let i = 0; i < book2.length; i++) {
//   book2[i].onlineContent ??
//     console.log(`${book2[i].title} provides no data about online content`);
// }
//===============================================================
// Logical assignment operator
// for (let i = 0; i < book2.length; i++) {
//   book2[i].edition ??= 1;
// }
// console.log(book2);

// for (let i = 0; i < book2.length; i++) {
//   book2[i].highlighted &&= !(book2[i].thirdParty.goodreads.rating < 4.2);
// }

// console.log(book2);

//===============================================================
// Challenge 1

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:
// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// 1.
// const players1 = [...game.players[0]],
//   players2 = [...game.players[1]];

// 2.
// const [gk] = players1;
// const [, ...fieldPlayers] = players1;

// console.log(gk);
// console.log(fieldPlayers);

// 3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// 4.
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// 5.
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

// 6.
// function printGoals(...players) {
//   for (let i = 0; i < players.length; i++) {
//     console.log(players[i]);
//   }
//   console.log(`Scored: ${players.length}`);
// }

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);
// 7.
// team1 > team2 && console.log("Team 2 thang");
// team1 < team2 && console.log("Team 1 thang");
//=============================================
// For-of
// let pageSum = 0;

// for (const page of book2) {
//   pageSum += page.pages;
// }
// console.log(pageSum);
//============
// const allAuthors = [];

// for (const author of book2) {
//   typeof author.author === 'string' && allAuthors.push(author.author);
//   typeof author.author === 'object' && allAuthors.push(...author.author);
// }

// console.log(allAuthors);
//===========
// for (const [key, value] of allAuthors.entries()) {
//   console.log(`${key + 1}: ${value}`);
// }
//==========================================
// Enhanced object literals
// const bookData = [
//   ['title', 'Computer Networking: A Top-Down Approach'],
//   ['author', ['James F. Kurose', 'Keith W. Ross']],
//   ['publisher', 'Addison Wesley'],
// ];

// // Do the rest
// const newBook = {
//   [bookData[0][0]]: bookData[0][1],
//   [bookData[1][0]]: bookData[1][1],
//   [bookData[2][0]]: bookData[2][1],
// };

// console.log(newBook);
//=====================
// const pages = 880;

// const newBook2 = {
//   title: 'The C Programming Language',
//   author: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
//   pages,
// };
//=========================================
// Optional chaining
// function getFirstKeyword(bookObj) {
//   console.log(bookObj.keywords?.[0]);
// }

// getFirstKeyword(book2[0]);
// getFirstKeyword(book2[1]);
//==========================================
// Object.keys(), .values(), .entries()
// const entries = [];

// for (const key of Object.keys(book2[0].thirdParty.goodreads))
//   entries.push([key]);

// console.log(entries);
//----------------------
// for (const [key, value] of Object.values(
//   book2[0].thirdParty.goodreads
// ).entries()) {
//   entries[key].push(value);
// }

// console.log(entries);
//--------------------------------
// const entries2 = Object.entries(book2[0].thirdParty.goodreads);
// console.log(entries2);
//======================================
// Challenge 2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
// for (const [index, value] of Object.entries(game.scored)) {
//   console.log(`Goal ${Number(index) + 1}: ${value}`);
// }
//--------------------------
// 2.
// let odds = Object.values(game.odds);
// let ave = 0;

// for (const i of odds) ave += i;

// ave /= odds.length;
// console.log(ave);
//---------------------------
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }
//---------------------------
// const scored = {};

// for (const value of game.scored) {
//   scored[value] ? scored[value]++ : (scored[value] = 1);
// }
// console.log(scored);
//===========================================
// Set
// const allKeywords = ['computer science'];

// for (const i of book2) {
//   allKeywords.push(...i.keywords);
// }

// const uniqueKeywords = new Set(allKeywords);
// // console.log(allKeywords);

// uniqueKeywords.add('coding');
// uniqueKeywords.add('science');

// uniqueKeywords.delete('coding');
// // console.log(uniqueKeywords);

// const uniqueKeywordsArr = [...uniqueKeywords];
// uniqueKeywords.clear();

// console.log(uniqueKeywordsArr);
//================================================
// Map
// const bookMap = new Map([
//   ['title', 'Clean Code'],
//   ['author', 'Robert C. Martin'],
// ]);

// bookMap.set('pages', 464);

// console.log(`${bookMap.get('title')} by ${bookMap.get('author')}`);

// console.log(bookMap.size);

// bookMap.has('author') && console.log('The author of the book is known');

// const firstBookMap = new Map(Object.entries(book2[0]));
// console.log(firstBookMap);

// for (const [key, value] of firstBookMap) {
//   if (typeof value === 'number') console.log(key);
// }
//===========================================================
// Challenge 3
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
// const events = [...new Set(gameEvents.values())];

// 2.
// gameEvents.delete(64);
// console.log(gameEvents);

// 3.
// const time = [...gameEvents.keys()].pop();
// console.log(time);
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// 4.
// for (const [min, event] of gameEvents) {
//   const half = min <= 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${min}: ${event}`);
// }
//=========================================================
// String
// 1. Truy cap string bang index
// const title = book2[0].title;

// console.log(title[6], title[4], title[9], title[8], title[100]);
//-------------------------------
// 2. indexOf()
const quote =
  'A computer once beat me at chess, but it was no match for me at kick boxing';
// console.log(quote.indexOf('chess'));
//-------------------------------
// 3. Extract string
// console.log(quote.slice(quote.indexOf('boxing')));
//-------------------------------
// 4. contains
// function isContributor(name) {
//   return name.endsWith('(Contributor)');
// }

// console.log(isContributor('Julie Sussman (Contributor)'));
//--------------------------------
// 5. normalizeAuthorName
// function normalizeAuthorName(name) {
//   const onlyName = name
//     .slice(0, name.lastIndexOf('(Contributor)'))
//     .trim()
//     .toLowerCase()
//     .split(' ');
//   const trueName = [];

//   for (const n of onlyName) {
//     trueName.push(n[0].toUpperCase() + n.slice(1));
//   }

//   return trueName.join(' ');
// }

// console.log(normalizeAuthorName('  JuliE sussMan (Contributor)'));
//------------------------------
// 6. replace
// const newBookTitle = books[1].title.replace('Programs', 'Software');
//------------------------------
// 7. startWith, endWith, include
// function logBookTheme(title) {
//   title = title.toLowerCase();

//   if (title.startsWith('computer')) {
//     console.log('This book is about computers');
//   } else if (title.includes('algorithms') && title.includes('structures')) {
//     console.log('This book is about algorithms and data structures');
//   } else if ((title.endsWith('system') || title.endsWith('systems')) && !title.includes('operating')) {
//     console.log('This book is about some systems, but definitely not about operating systems');
//   }
// }
//------------------------------
// 8. Split
// const bookCategories =
//   'science;computing;computer science;algorithms;business;operating systems;networking;electronics';

// function logBookCategories(bookCategories) {
//   const categories = bookCategories.split(';');
//   for (const cate of categories) {
//     console.log(cate);
//   }
// }
// logBookCategories(bookCategories);
//-----------------------------
// 9. set, join
// function getKeywordsAsString(bookArr) {
//   const keywordArr = [];

//   for (const key of bookArr) {
//     keywordArr.push(...key.keywords);
//   }

//   keywordArr = [...new Set(keywordArr)];

//   return keywordArr.join(';');
// }

// console.log(getKeywordsAsString(book2));
//-----------------------------------------
// 10. Padding
// const bookChapters = [
//   ['The Basics', 14],
//   ['Sorting', 254],
//   ['Searching', 372],
//   ['Graphs', 526],
//   ['Strings', 706],
// ];
// logBookChapters(bookChapters);

// function logBookChapters(bookChapters) {
//   for (const [chapter, page] of bookChapters) {
//     console.log(`${chapter.padEnd(15, '_')} ${page}`);
//   }
// }

// logBookChapters(bookChapters);
//===========================================
// Challenge 4
/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
// function convertToCamelCase(arr) {
//   const abc = [];
//   for (const [index, a] of arr.entries()) {
//     let [first, second] = a.trim().toLowerCase().split('_');
//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;

//     console.log(`${output.padEnd(20)}${'✅'.repeat(index + 1)}`);
//   }
// }

// const abc = [
//   'underscore_case',
//   ' first_name',
//   'Some_Variable',
//   '  calculate_AGE',
//   'delayed_departure',
// ];

// convertToCamelCase(abc);
//==============================
// Practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const track = flights.split('+');

function printMessage(track) {
  for (let i of track) {
    const a = i.split(';');
    console.log(
      `${a[0].replaceAll('_', ' ').trimStart()} from ${a[1]
        .slice(0, 3)
        .toUpperCase()} to ${a[2].slice(0, 3).toUpperCase()} (${a[3].replace(
        ':',
        'h'
      )})`
    );
  }
}

printMessage(track);

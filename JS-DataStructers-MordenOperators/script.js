'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

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
    programmingLanguage: 'Java', // <-- HERE
  },
  {
    title: 'Algorithms1',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    programmingLanguage: 'Python', // <-- HERE
    onlineContent: true,
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

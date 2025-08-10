console.log('Exporting moduile');

const list = [];

export const shoppingCart = function (item, quantity) {
  list.push({ item, quantity });
  console.log(`Add ${quantity} of ${item} to the cart`);
};

const doNothing = () => console.log('Ham nay khong lam gi het');

//Top-Level await
// console.log('start fetching');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('done');

export { doNothing };

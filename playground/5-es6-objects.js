// Object Property ShortHand
const name = "test";
const age = 16;

const user = {
  name,
  age,
  location: undefined,
};
console.log(user);

// Object Destructuing
const product = {
  label: "Book",
  price: 200,
  author: "test_author",
};

const { label, price: prodPrice, author = "test" } = product;
console.log(label, author, prodPrice);

const transaction = (type, { label, author }) => {
  console.log(label, author);
};

transaction("test", product);

/* const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("this is resolved..!");
    reject("this is reject..!");
  }, 2000);
});

doWorkPromise
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
 */

// Promise Chaining
const add = (val1, val2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val1 + val2);
    }, 2000);
  });
};

add(1, 2)
  .then((sum) => {
    console.log(sum);
    return add(sum, 3);
  })
  .then((sum2) => {
    console.log("final:", sum2);
  })
  .catch((e) => {
    console.log(e);
  });

const add = (val1, val2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (val1 < 0 || val2 < 0) {
        return reject("Both numbers must be positive");
      }
      resolve(val1 + val2);
    }, 2000);
  });
};

const doRun = async () => {
  const sum = await add(1, 2);
  const sum2 = await add(sum, -2);
  const sum3 = await add(-1, sum2);
  return sum3;
};

doRun()
  .then((res) => {
    console.log("result", res);
  })
  .catch((e) => {
    console.log("e", e);
  });

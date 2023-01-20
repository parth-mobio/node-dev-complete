setTimeout(() => {
  console.log("2 seconds passed...!");
}, 2000);

const geoCode = (address, callback) => {
  setTimeout(() => {
    const data = {
      lat: 0,
      lon: 0,
    };

    callback(data);
  }, 2000);
};

const test = geoCode("Dhoraji", (data) => {
  console.log(data);
});

const add = (val1, val2, callback) => {
  setTimeout(() => {
    const sum = val1 + val2;
    callback(sum);
  }, 2000);
};

add(1.6, 4.5, (sum) => {
  console.log(sum); // Should print: 5
});

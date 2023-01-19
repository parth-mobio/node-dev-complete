const fs = require("fs");

// const user = {
//   name: "ABC XYZ",
//   designation: "student",
// };

// const userJson = JSON.stringify(user);
// fs.writeFileSync("1-josn.json", userJson);
// console.log(userJson);

// const parsedUserJson = JSON.parse(userJson);
// console.log(parsedUserJson);

const dataBUffer = fs.readFileSync("1-josn.json");
const dataJson = dataBUffer.toString();
const data = JSON.parse(dataJson);

data.name = "Parth";
data.planet = "Earth";
data.age = 28;

const userJson = JSON.stringify(data);
fs.writeFileSync("1-josn.json", userJson);

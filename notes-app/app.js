const validator = require("validator");
const chalk = require("chalk");
const notes = require("./notes.js");

const getNot = notes.getNotes();

console.log(getNot);
// console.log(validator.isEmail("test@mailinator.com"));
// console.log(validator.isURL("test/mailinator.com"));
console.log(chalk.red.strikethrough.inverse("Success!"));

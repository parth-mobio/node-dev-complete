const validator = require("validator");
const yargs = require("yargs");
const notes = require("./notes.js");

// const getNot = notes.getNotes();

// console.log(getNot);
// console.log(validator.isEmail("test@mailinator.com"));
// console.log(validator.isURL("test/mailinator.com"));

// const command = process.argv[2];

// if (command === "add") {
//   console.log("Addinggg Note..!!");
// } else if (command === "remove") {
//   console.log("Removinggg Note..!!");
// }

yargs.command({
  command: "addNote",
  describe: "This is command for adding a note.",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.addNote(argv.title, argv.body),
});

yargs.command({
  command: "removeNote",
  describe: "This is command for removing a note.",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "listNote",
  describe: "This is command for listing notes.",
  handler() {
    notes.listNote();
  },
});

yargs.command({
  command: "readNote",
  describe: "This is command for reading a note.",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

// console.log(yargs.argv);  --use parse instead
yargs.parse();

const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  // console.log(title);
  // console.log(body);
  const notes = loadNotes();

  // const duplicateNote = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);
  // console.log(duplicateNote);
  // console.log(!duplicateNote);
  // return false;
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNote(notes);
    console.log(chalk.green.bold.inverse("New Note Added..!"));
  } else {
    console.log(chalk.red.bold.inverse("Duplicate Note Title Found..!"));
  }
};

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const noteDataJson = notesBuffer.toString();
    return JSON.parse(noteDataJson);
  } catch (error) {
    return [];
  }
};

const saveNote = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

const removeNote = (title) => {
  const notes = loadNotes();

  const notesToSaveAfterRemove = notes.filter((note) => note.title !== title);

  if (notes.length > notesToSaveAfterRemove.length) {
    saveNote(notesToSaveAfterRemove);
    console.log(chalk.green.bold.inverse("Note Removed..!"));
  } else {
    console.log(
      chalk.red.bold.inverse("No note found matching the title to remove..!")
    );
  }
};

const listNote = () => {
  const notes = loadNotes();

  console.log(chalk.blue.bold.inverse("Your Notes"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const readNote = notes.find((note) => note.title === title);

  if (readNote) {
    console.log(chalk.blue.bold.inverse(readNote.title));
    console.log(readNote.body);
  } else {
    console.log(
      chalk.red.bold.inverse("No Note found matching provided title..!")
    );
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};

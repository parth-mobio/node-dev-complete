// const square = function (x) {
//   return x * x;
// };

// const square = (x) => {
//   return x * x;
// };

// const square = (x) => x * x;

// console.log(square(3));

const event = {
  name: "Birthday",
  guests: ["manu", "test", "trujal"],
  printGuestList() {
    console.log(`Guests are attending ${this.name}`);

    this.guests.forEach((guest) => {
      console.log(`${guest} is attending ${this.name}`);
    });
  },
};

event.printGuestList();

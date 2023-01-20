const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

const location = process.argv[2];

if (location === undefined) {
  return console.log("Please provide the location as the command argument...!");
}

const geoCodeResponse = geoCode(
  location,
  (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }

    foreCast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log("Lat:", latitude);
      console.log("Lon:", longitude);
      console.log(foreCastData);
    });
  }
);

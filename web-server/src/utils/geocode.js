const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGFydGhtb2JpbyIsImEiOiJjbGQzMXU1ZWYwZHpzM3Bqcnpwa2h2MXhwIn0.pNKrJI3iwLOZBKqpvcGd-g&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        `Unable to connect to Location Service..! Please try again later`
      );
    } else if (body.features.length === 0) {
      callback(
        `Unable to get location data for given search term. Please check the search term!`,
        undefined
      );
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;

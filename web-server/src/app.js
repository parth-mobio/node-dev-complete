const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// getting and defining patha for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set Express js setting for Handlebars and view directory
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Main",
    name: "Parth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Parth",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Parth",
  });
});

app.get("/weather", (req, res) => {
  res.send("Your Weather");
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Parth",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Parth",
    errorMessage: "Page Not Found..!",
  });
});

app.listen(3000, () => {
  console.log("Server Started...!");
});

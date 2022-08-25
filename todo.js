const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");



const app = express();


var items = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


app.get("/", (req, res) => {

  var today = new Date();
  var options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };
  var day = today.toLocaleDateString("en-Us", options);
  res.render("list", {
    userday: day,
    newitem: items
  });



});

app.post("/", (req, res) => {

  var item = req.body.Additem;

  items.push(item);

  res.redirect("/");


});


app.listen(3000, () => {
  console.log("server running at 3000");
});

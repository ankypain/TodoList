const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");



const app = express();


var items = ["groceries", "medicines", "water"];
var workitems = ["laptop", "pen", "Mobile"];

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
    newitem: items,

  });



});

app.post("/", (req, res) => {

  let item = req.body.Additem;

  console.log(req.body);

  if(req.body.list === "worklist"){
    workitems.push(item);
    res.redirect("/work");

  }else{

    items.push(item);

    res.redirect("/");


  }




});

app.get("/work",(req,res)=>{
  res.render("list",{
    userday:"worklist",
    newitem:workitems
  });
});






app.listen(3000, () => {
  console.log("server running at 3000");
});

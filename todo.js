const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const date = require(__dirname+"/date.js");



const app = express();


const items = ["groceries", "medicines", "water"];
const  workitems = ["laptop", "pen", "Mobile"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


app.get("/", (req, res) => {

  const day = date.getDay();

  
  res.render("list", {
    userday: day,
    newitem: items,

  });



});

app.post("/", (req, res) => {

  let item = req.body.Additem;

  

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

const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const _ = require("lodash");

const port = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://todolist:todolist@todolist.h0yzkga.mongodb.net/todolistDB",
  { useNewUrlParser: true }
);

const itemSchema = new mongoose.Schema({
  item: String,
});

const Item = new mongoose.model("Item", itemSchema);

let item = [
  { item: "Entry your todolist" },
  { item: "use '+' to add " },
  { item: "<--- check this to remove" },
];
const newItemSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

const newList = new mongoose.model("newList", newItemSchema);

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(item, function (err) {});
      res.redirect("/");
    } else {
      res.render("list", {
        userday: "Today",
        newitem: foundItems,
      });
    }
  });
});

//creating a dynamic route
app.get("/other/:newListName", function (req, res) {
  const newListName = _.capitalize(req.params.newListName);

  if (newListName === "Favicon.ico" || newListName === "Todo.js") {
    return res.status(404);
  } else {
    newList.findOne({ name: newListName }, function (err, foundItem) {
      if (!err) {
        if (!foundItem) {
          const newlist = new newList({
            name: newListName,
            items: item,
          });

          newlist.save();

          res.redirect("/other/" + newListName);
        } else {
          res.render("list", {
            userday: foundItem.name,
            newitem: foundItem.items,
          });
          //checking the value
          // console.log(foundItem.name);
        }
      }
    });
  }
});

app.post("/", (req, res) => {
  const listName = req.body.list;
  const itemName = req.body.Additem;

  const item = new Item({
    item: itemName,
  });

  if (listName === "Today") {
    item.save();

    res.redirect("/");
  } else {
    newList.findOne({ name: listName }, function (err, foundData) {
      foundData.items.push(item);
      foundData.save();

      res.redirect("/other/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const itemId = req.body.deleteItem;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(itemId, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("deleted");
      }
    });

    res.redirect("/");
  } else {
    newList.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: itemId } } },
      function (err, result) {
        if (!err) {
          res.redirect("/other/" + listName);
        }
      }
    );
  }
});

app.listen(port, () => {
  console.log("server running");
});

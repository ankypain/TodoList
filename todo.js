const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/todoDB", { useNewUrlParser: true });

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

app.listen(3000, () => {
  console.log("server running at 3000");
});

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
app.get("/:newListName", function (req, res) {
  const newListName = req.params.newListName;

  newList.findOne({ name: newListName }, function (err, foundItem) {
    if (!err) {
      if (!foundItem) {
        const newlist = new newList({
          name: newListName,
          items: item,
        });

        newlist.save();

        res.redirect("/" + newListName);
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

      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  itemId = req.body.deleteItem;
  console.log(itemId);
  Item.findByIdAndRemove(itemId, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("deleted");
    }
  });
  res.redirect("/");
});

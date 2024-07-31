const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
let workItems = [];
let items = ["WakeUp", "Do Exercise", "Eat"];
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        year: 'numeric',
        month: 'long',
    };
    let day = today.toLocaleDateString("en-us", options);
    res.render('list', { ListTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.List === 'Work') {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function (req, res) {
    res.render('list', { ListTitle: "Work List", newListItems: workItems });
});

app.get("/about", function(req, res){
    res.render('about');
})

app.listen("3000", function () {
    console.log("Port 3000 started");
    console.log("Eyvallah");
});
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");



const app =  express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{

    var today = new Date();
    var day = today.getDay();
    var dateIs = today.toISOString().slice(0,10);
    // var daylight = {
    //     whichdate:dateIs,
    //     whichday:day
    // };

    // var jsonDate = JSON.stringify(daylight);
    
    // console.log(jsonDate);

   

    switch (day) {
        case 0:
            res.render("list",{userday: "Sunday",userdate:dateIsteIs});
            
            break;

        case 1:
            res.render("list",{userday: "Monday",userdate:dateIs});
            
            
            break;

        case 2:
            res.render("list",{userday:"Tuesday",userdate:dateIs});
            
            break;
        case 3:
            res.render("list",{userday: "Wednesday",userdate:dateIs});
            
            break;
        case 4:
            res.render("list",{userday: "Thursday",userdate:dateIs});
            
            break;
        case 5:
            res.render("list",{userday: "Friday",userdate:dateIs});
            
            break;
        case 6:
            res.render("list",{userday: "Saturday",userdate:dateIs});
            
            break;
        default:
            res.render("list",{userday:"Wrong day"});
            
            break;
    }



});

app.listen(3000,()=>{
    console.log("server running at 3000");
});
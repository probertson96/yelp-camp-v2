// Setup //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema setup //
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Granite Hill",
//   image: "http://photosforclass.com/download/3844623716",
//   description: "This is a huge granite hill, no bathrooms, no water. Cool granite"
// }, function(err, campground) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("New campground");
//         console.log(campground);
//     }
// });

// ROUTES //
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX Route
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds) {
       if(err) {
           console.log(err);
       } else {
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
});

// CREATE Route
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW Route
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

// SHOW Route - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

// Listener //
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});
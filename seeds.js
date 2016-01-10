var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "http://photosforclass.com/download/3844623716",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel felis tempus, tincidunt eros quis, condimentum diam. Ut eget quam rutrum erat tincidunt posuere sed ac sem. Sed ut dolor felis. Morbi lorem sapien, vestibulum sed efficitur non, posuere ut ante. Pellentesque a ante vitae ante feugiat elementum. Praesent aliquet venenatis pulvinar. Praesent eget bibendum libero."
        },
        {
            name: "Devil's Basin",
            image: "http://photosforclass.com/download/3694344957",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel felis tempus, tincidunt eros quis, condimentum diam. Ut eget quam rutrum erat tincidunt posuere sed ac sem. Sed ut dolor felis. Morbi lorem sapien, vestibulum sed efficitur non, posuere ut ante. Pellentesque a ante vitae ante feugiat elementum. Praesent aliquet venenatis pulvinar. Praesent eget bibendum libero."
        },
        {
            name: "Deep Space 9",
            image: "http://photosforclass.com/download/4344237662",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel felis tempus, tincidunt eros quis, condimentum diam. Ut eget quam rutrum erat tincidunt posuere sed ac sem. Sed ut dolor felis. Morbi lorem sapien, vestibulum sed efficitur non, posuere ut ante. Pellentesque a ante vitae ante feugiat elementum. Praesent aliquet venenatis pulvinar. Praesent eget bibendum libero."
        }
    ];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
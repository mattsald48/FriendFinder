var express = require('express');
var friends = require("../data/friends");
//var chosen = require("chosen-js");
var router = express.Router()


module.exports = function(app){
  //posting friends info
  app.get("/api/friends", function(req, res) {
      res.json(friends);
  });//end of get 


  app.post("/api/friends", function(req, res, next){
     //pushing to friends.js
     friends.push(req.body);
     console.log(friends+" New User added");
     //moving to the new function
     next();
  }, function(req, res){

    
    //this creates an array of the users answers and also makes sure the numbers are integers
    var current = friends[friends.length-1].scores.map(function(x){
        return parseInt(x);
    });
    
    var totalA = 0;
    var totalB = 50;
    var bestMatch = 0;
    
    //First loop iterates through the different users. Second loop iterates through their score.
     for(var i = 0; i < friends.length-1; i++){
       for(var j = 0; j < 10; j++){
           //The difference is calculated if the answer numbers are different
           if (friends[i].scores[j] !== current[j]){
             totalA +=Math.abs(friends[i].scores[j] - current[j]);
             
           }//end of if         
       }//end of j for loop
      console.log("User "+i+" total difference in compatibility score:  "+totalA);
      //compares the total difference with previous total diff
      //totalA is current total diff and totalB is the previous.  totalA is reset after comparison
      if(totalA <= totalB){
          totalB = totalA;
          totalA = 0;
          bestMatch = i;
         }else{ 
          totalA = 0;
         };
         //console.log("Current Best Match: "+bestMatch);
     }//end of i for loop
     
     //finding the best match in the friends object using the bestMatch.
     //Setting var back to initial
     res.json(friends[bestMatch]);
     totalA = 0;
     totalB = 50;
     bestMatch = 0;

  });
};//end of module.exports function 
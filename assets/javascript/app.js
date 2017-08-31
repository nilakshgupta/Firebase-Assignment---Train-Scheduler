$(document).ready(function(){
  //Initialize Firebase
    var config = {
    apiKey: "AIzaSyBJPGUWVgMBnR_tJ_VTu8HXDgEJnPBm6aM",
    authDomain: "train-scheduler-5d821.firebaseapp.com",
    databaseURL: "https://train-scheduler-5d821.firebaseio.com",
    projectId: "train-scheduler-5d821",
    storageBucket: "train-scheduler-5d821.appspot.com",
    messagingSenderId: "573658994008"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
//  Button for adding Trains
  $("#submit").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#trainName").val().trim();
      var trainDestination = $("#trainDestination").val().trim();
      var trainFrequency = $("#trainFrequency").val().trim();
      var trainFirstTime = moment($("#trainFirstTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
// Creates local "temporary" object for holding train data
      var newTrainDatabase = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        firstTime: trainFirstTime,
      };
// Uploads train data to the database
      database.ref().push(newTrainDatabase);

      console.log(newTrainDatabase.name);
      console.log(newTrainDatabase.destination);
      console.log(newTrainDatabase.frequency);
      console.log(newTrainDatabase.firstTime);
// Alert
  alert("Train successfully added");
// Clears all of the text-boxes
      $("#trainName").val("");
      $("#trainDestination").val("");
      $("#trainFrequency").val("");
      $("#trainFirstTime").val("");
      
    });
// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry       
       database.ref().on("child_added", function(childSnapshot,prevChildKey) {
       console.log(childSnapshot.val());
// Store everything into a variable
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        var trainFirstTime = childSnapshot.val().firstTime;
// Train info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainFrequency);
        console.log(trainFirstTime);
// Difference between the times/Time remaining/Minutes Away
        var timeDiff = moment().diff(moment.unix(trainFirstTime), "minutes");
        var timeRemaining = timeDiff % trainFrequency ;
        var minutesAway = trainFrequency - timeRemaining;

// To calculate next Arrival
       var nextArrival = moment().add(minutesAway, "m").format("hh:mm"); 
         
        $("#addTrain > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
      
      });
  });
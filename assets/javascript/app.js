  $(document).ready(function() {

      function runProgram() {

          var database;


// firebase api key
          var config = {
              apiKey: "AIzaSyC16dFr-JCQ5HpTL2ndW6bPjPQpArYt_vo",
              authDomain: "bws-anytime-train.firebaseapp.com",
              databaseURL: "https://bws-anytime-train.firebaseio.com",
              projectId: "bws-anytime-train",
              storageBucket: "bws-anytime-train.appspot.com",
              messagingSenderId: "77875475122"
          };

//firebase initalizer
          firebase.initializeApp(config);


          var database = firebase.database();

// add train on click fuction
          $("#add-loco").on("click", function() {
// do not clear entry
              event.preventDefault();

// take in input form user and remove extra spacing
              var train = $("#train-input").val().trim();
              var destination = $("#destination-input").val().trim();
              var nextTrain = $("#nextTrain-input").val().trim();
              var frequency = $("#frequency-input").val().trim();

// variables for train fields
              var newTrain = {
                  trainName: train,
                  trainDestination: destination,
                  trainNextTrain: nextTrain,
                  trainFrequency: frequency
              };

// push fields into form table
              database.ref().push(newTrain);

              console.log(newTrain.trainName);
              console.log(newTrain.trainDestination);
              console.log(newTrain.trainNextTrain);
              console.log(newTrain.trainFrequency);

// alert after submit train info
              alert("Next Train Now In Route");

// clear form field
              $("#train-input").val("");
              $("#destination-input").val("");
              $("#nextTrain-input").val("");
              $("#frequency-input").val("");

          });

// variable for firebase input
          database.ref().on("value", function(snapshot) {
              console.log(snapshot.val());

            var UpdateHtml = {
              train: snapshot.val().trainName,
              destination: snapshot.val().trainDestination,
              nextTrain: snapshot.val().trainNextTrain,
              frequency: snapshot.val().trainFrequency,
          }

          });

      }


      function UpdateHtml(trian, destination, frequency, nextTrain) {

          var row;
          var train;
          var tDestination;
          var tFrequency;
          var tArrival;
          var tMinsOut;
          var nextArrival;
          var minsOut;

          nextArrival = calcNextArrival(nextTrain, frequency);
          tMinsOut = calacMInAway(nextArrival);
          row = $("<tr>");
          train = $("<td>").text(name);
          tDestination = $("<td>").text(destination);
          tFrequency = $("<td>").text(frequency);
          tArrival = $("<td>").text(nextArrival);
          minsOut = $("<td>").text(tMinsOut);

          row.append(train);
          row.append(tDestination);
          row.append(tFrequency);
          row.append(minsOut);
          row.append(tArrival)
          $("#train-info-section").append(row);
      }

      function calcNextArrival(nextTrain, frequency) {

          var firstTrainIn;
          var currentTime;
          var diffTime;
          var tRemaining;
          var tMinutesNextTrain;

          firstTrainIn = moment(nextTrain, "hh:mm").substact(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTrainIn), "minutes");
          tRemaining = diffTime % frequency;
          tMinutesNextTrain = frequency - tRemaining;

          return tMinutesNextTrain;

      }

      function CalcMinsAway(tMinutesNextTrain) {

          var minsOut;

          minsOut = moment().add(tMinutesNextTrain, "minutes");
          moment(minsOut).format("hh:mm");

          return minsOut;
      }

  runProgram();


  });
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
                  train: trainName,
                  destination: trainDestination,
                  nextTrain: trainNextTrain,
                  frequency: trainFrequency
              };

              // push fields into form table
              database.ref().push(newTrain);

              // alert after submit train info
              alert("Next Train Now In Route");

              // clear form field
              $("#train-input").val("");
              $("#destination-input").val("");
              $("#nextTrain-input").val("");
              $("#frequency-input").val("");

          });

          // creat firebase event for adding train to database and a row in html
          database.ref().on("child_added", function(snapshot) {

              var train = snapshot.val().trainName;
              var destination = snapshot.val().trainDestination;
              var nextTrain = snapshot.val().trainNextTrain;
              var frequency = snapshot.val().trainFrequency;

              console.log(train);
              console.log(destination);
              console.log(nextTrain);
              console.log(frequency);


          });

      }

      function UpdateHtml(train, destination, frequency, nextTrain) {



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

        var config = {
            apiKey: "AIzaSyAFMJEQA-6_HuaxNNYyN8DY3Flc8RGCeh8",
            authDomain: "fadynaguib-homework.firebaseapp.com",
            databaseURL: "https://fadynaguib-homework.firebaseio.com",
            projectId: "fadynaguib-homework",
            storageBucket: "fadynaguib-homework.appspot.com",
            messagingSenderId: "187429100011"
        };
        firebase.initializeApp(config);

        var train = "";
        var destination = "";
        var trainTime = "";
        var frequency = "";

        var database = firebase.database()

        $("#add-train").on("click", function () {


            event.preventDefault();

            train = $("#trainName").val().trim();
            destination = $("#destination").val().trim();
            trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("HH:mm")
            frequency = $("#frequency").val().trim();

            database.ref().push({
                trainName: train,
                Destin: destination,
                nextArrival: trainTime,
                Freq: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            })

            $("#trainName").html("");
            $("#destination").html("");
            $("#trainTime").html("");
            $("#frequency").html("");

        })


        database.ref().on("child_added", function (childSnapshot) {

            var traDate = childSnapshot.val().nextArrival;
            console.log(traDate)


            var traFreq = childSnapshot.val().Freq;


            var convertedDate = moment(traDate, "HH:mm").subtract(1, "years");
            console.log(convertedDate)


            var diffTime = moment().diff(moment(convertedDate), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            var now = moment();
            console.log(now)

            var tRemainder = diffTime % traFreq;
            console.log(tRemainder);

            var tMinutesTillTrain = traFreq - tRemainder;
            console.log(tMinutesTillTrain)

            var nextTrain;

            console.log(moment(now, "milliseconds"))
            console.log(moment(traDate, "millisecond"))


            if (moment(now, "HH:mm") < moment(traDate, "HH:mm")) {
                nextTrain  = traDate
            }

            else {
                nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

            }


            var newRow = $("<tr>")

            var newTrain = $("<td>")
            newTrain.text(childSnapshot.val().trainName)

            var newDestination = $("<td>")
            newDestination.text(childSnapshot.val().Destin)

            var newFrequency = $("<td>")
            newFrequency.text(childSnapshot.val().Freq)

            var arrival = $("<td>")
            arrival.text(nextTrain)

            var minRemaining = $("<td>")
            minRemaining.text(tMinutesTillTrain)

            


            newRow.append(newTrain, newDestination, newFrequency, arrival, minRemaining)

            $("#tab").prepend(newRow)

        


        }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });



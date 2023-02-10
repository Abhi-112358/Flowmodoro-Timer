
document.getElementById("stop-button").addEventListener("click", () => {
    
    function format_time(time) {
      min = Math.round(time / 60)
      sec = time % 60

      min_format = ""
      sec_format = ""

      if (min < 9) {
        min_format = "0" + String(min);
      }
      else {
        min_format = String(min)
      }

      if (sec < 9) {
        sec_format = "0" + String(sec);
      }
      else {
        sec_format = String(sec)
      }

      return min_format + ":" + sec_format;
    }
    let last_10 = sessionHistory.splice(sessionHistory.length - 10).reverse();
    
    console.log(last_10);

    var table = document.getElementById("table");
    for (let i = 1; i < last_10.length; i++) {
        let curr_date = new Date(last_10[i - 1].date)
        let getDate = "date" + String(i)
        let getCycle = "cycle" + String(i)
        let getFocus = "focus" + String(i)
        let getBreak = "break" + String(i)
        
        document.getElementById(getDate).innerHTML = curr_date.toDateString();
        document.getElementById(getCycle).innerHTML = format_time(last_10[i - 1].cycle);
        document.getElementById(getFocus).innerHTML = format_time(last_10[i - 1].focusDuration);
        document.getElementById(getBreak).innerHTML = format_time(last_10[i - 1].breakDuration);
        document.getElementById(String(i)).style.display = "table-row";
    }
});



//const { MongoClient, ServerApiVersion } = require('mongodb');


// Import the MongoDB driver
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = "mongodb+srv://Abhi12345:Abhiroop112358@cluster0.gmxba0d.mongodb.net/?retryWrites=true&w=majority";

// Database name
const dbName = 'test';

// Collection name
const collectionName = 'sessionHistory';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  if (err) throw err;
  console.log("Connected successfully to server");
  
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  
  // Search for the sessionHistory array and update it
  collection.updateOne({}, {$set: {sessionHistory: [{time: "2022-01-01T12:00:00Z", activity: "Logged in"}]}}, function(err, res) {
    if (err) throw err;
    console.log("Array updated successfully");
    client.close();
  });
});

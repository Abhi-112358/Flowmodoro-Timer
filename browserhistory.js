
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
        document.getElementById(getCycle).innerHTML = String(last_10[i - 1].cycle);
        document.getElementById(getFocus).innerHTML = format_time(last_10[i - 1].focusDuration);
        document.getElementById(getBreak).innerHTML = format_time(last_10[i - 1].breakDuration);
        document.getElementById(String(i)).style.display = "table-row";
    }
});

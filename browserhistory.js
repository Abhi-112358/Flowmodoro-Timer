
document.getElementById("stop-button").addEventListener("click", () => {
    

    let last_3 = sessionHistory.splice(sessionHistory.length - 4);
    
    console.log(last_3[0].date);

    var table = document.getElementById("table");
    for (let i = 1; i < last_3.length; i++) {
        let curr_date = new Date(last_3[i - 1].date)
        let getDate = "date" + String(i)
        let getCycle = "cycle" + String(i)
        let getFocus = "focus" + String(i)
        let getBreak = "break" + String(i)
        
        document.getElementById(getDate).innerHTML = curr_date.toDateString();
        document.getElementById(getCycle).innerHTML = String(last_3[i - 1].cycle);
        document.getElementById(getFocus).innerHTML = String(last_3[i - 1].focusDuration);
        document.getElementById(getBreak).innerHTML = String(last_3[i - 1].breakDuration);
    }
});
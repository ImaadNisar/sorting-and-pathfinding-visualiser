function timeInterval() {
    var time = parseInt(sessionStorage.getItem('time'))  // gets seconds
    time++
    if (time >= 60) {  // changes time in database after 60s
        changeTime()
        time = 0 // resets seconds counter
    }
    sessionStorage.setItem('time', time)

    setTimeout(timeInterval, 1000) // function repeats after 1s
}

if (typeof sessionStorage.getItem('time') == "string") { // time starts when time initialised on login 
    timeInterval()
}

function changeTime() {
    let data = new FormData()  // new ajax
    data.append('time', 1)

    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'accounts/change-time.php', true)  
    xhr.send(data) // send data via POST
}
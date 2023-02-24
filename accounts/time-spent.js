function timeInterval() {
    var time = parseInt(sessionStorage.getItem('time'))
    time++
    if (time >= 60) {
        changeTime()
        time = 0
    }
    sessionStorage.setItem('time', time)

    setTimeout(timeInterval, 1000)
}

if (typeof sessionStorage.getItem('time') == "string") {
    timeInterval()
}

function changeTime() {
    let data = new FormData()
    data.append('time', 1)

    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'accounts/change-time.php', true)
    xhr.send(data)
}
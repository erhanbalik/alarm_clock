const currentTime = document.querySelector('h1');
selectMenu = document.querySelectorAll('select');
setAlarmBtn = document.querySelector('button');
content = document.querySelector('.content');

let alarmTime, 
alarmSet = false;
alarmTone = new Audio('./alarm_sound.mp3');

function options () {
    for (let i = 12; i > 0; i--) {
        i = i < 10 ? "0" + i : i;
    
        let option = `<option value=${i}>${i}</option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option);
    };
    
    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? "0" + i : i;
    
        let option = `<option value=${i}>${i}</option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option);
    };
    
    for (let i = 2; i > 0; i--) {
        let ampm = i == 1 ? "PM" : "AM";
        let option = `<option value=${ampm}>${ampm}</option>`;
    
        selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option);
    };
}
options();



function setAlarm() {
    // When alarmset is true it will stop the alarm
    if(alarmSet) { 
        alarmTime = "";
        setAlarmBtn.innerText = "Set Alarm";
        content.classList.remove('disable');
        alarmTone.pause();
        return alarmSet = false;
    }
    // Display time in h1
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    
    if(time.includes("AM/PM") || time.includes("Hour") || time.includes("Minute")){
        return alert("Please enter a valid time");
    }

    content.classList.add('disable');
    alarmSet = true;
    alarmTime = time;
    setAlarmBtn.innerText = "Clear Alarm";

}

setAlarmBtn.addEventListener('click', setAlarm);

setInterval(() => {
    // Get Dates
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();

    ampm = "AM";

    // Make 12 hour format
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // display current time
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Play sound when times is equal
    if (alarmTime === `${h}:${m} ${ampm}`) {
        alarmTone.play();
        alarmTone.loop = true;
    }
});
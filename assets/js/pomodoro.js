const estado = document.getElementById('estado');
const counter = document.getElementById('counter');
const counterDescansos = document.getElementById('counter-descansos');

const botonAlarma = document.getElementById("pause_alarm");
const botonSkipBreak = document.getElementById('skip_break');

const minutosPomodoro = "00";
const segundosPomodoro = "25";

const minutosDescanso = "00";
const segundosDescanso = "25";

const minutosDescansoLargo = "20";
const segundosDescansoLargo = "00";

const audio = new Audio('./assets/sounds/alarm.mp3');
let played = false;

let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');

let wm = document.getElementById('w_minutes');
let ws = document.getElementById('w_seconds');

let bm = document.getElementById('b_minutes');
let bs = document.getElementById('b_seconds');

//store a reference to a timer variable
let startTimer;

let startPomodoro = true;


function disableStart(){
    start.disabled = true;
    start.classList.add('disabled');
    estado.innerHTML = "";
}

function enableStart(){
    start.disabled = false;
    start.classList.remove('disabled');
    estado.innerHTML = "Estado: Pausado";
}

function disableStop(){
    stop.disabled = true;
    stop.classList.add('disabled');
}

function enableStop(){
    stop.disabled = false;
    stop.classList.remove('disabled');
    estado.innerHTML = "Estado: En progreso";
}

function playAlarm(){
    // Play the music just if is not currently playing
    if(audio.paused && !played){
        startPomodoro = false;
        audio.play();
        played = true;
        stopTimer();
    }
}


function stopAlarm(){
    audio.pause();
    audio.currentTime = 0;
    startPomodoro = true;
    startPomodoroTimer();
    
}


function skipBreak(){
    if(wm.innerText !== 0 || ws.innerText !== 0){
        wm.innerText = minutosPomodoro;
        ws.innerText = segundosPomodoro;
        
        bm.innerText = minutosDescanso;
        bs.innerText = segundosDescanso;
        counter.innerText--;
        counterDescansos.innerText++;
        startPomodoroTimer();
    }
}


//Start Timer Function
function timer(){
    disableStart();
    enableStop();
    //Work Timer Countdown
    if(ws.innerText != 0){
        ws.innerText--;
        ws.innerText = ws.innerText.padStart(2, '0');
    } else if(wm.innerText != 0 && ws.innerText == 0){
        ws.innerText = segundosDescanso;
        wm.innerText--;
        wm.innerText = wm.innerText.padStart(2, '0');
    }
    
    //Break Timer Countdown
    if(wm.innerText == 0 && ws.innerText == 0 && startPomodoro === true){
        playAlarm();
        if(bs.innerText != 0 && startPomodoro === true){
            bs.innerText--;
            bs.innerText = bs.innerText.padStart(2, '0');
        } else if(bm.innerText != 0 && bs.innerText == 0 && startPomodoro === true){
            bs.innerText = segundosDescansoLargo;
            bm.innerText--;
            bm.innerText = bm.innerText.padStart(2, '0');
            
        }
    }
    
    //Increment Counter by one if one full cycle is completed
    if(wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0){
        played = false;
        if(counter.innerText == 1){
            wm.innerText = minutosPomodoro;
            ws.innerText = segundosDescanso;
            
            bm.innerText = minutosDescansoLargo;
            bs.innerText = segundosDescansoLargo;
        }else{
            wm.innerText = minutosPomodoro;
            ws.innerText = segundosDescanso;
            
            bm.innerText = minutosDescanso;
            bs.innerText = segundosDescanso;
            
        }
        
        playAlarm();
        
        counter.innerText--;
        counterDescansos.innerText++;
        if(counter.innerText == 0){
            counter.innerText = 5;
            counterDescansos.innerText = 0;
        }
        played = false;
        
    }
}


//Stop Timer Function
function stopInterval(){
    if(startPomodoro === true){
        enableStartButton();
    }
    disableStop()
    clearInterval(startTimer);
}


function enableStartButton() {
    if(document.getElementById('list-2').children.length-1 > 0){
        enableStart();
    }else{
        disableStart();
    }
}


function stopTimer(){
    stopInterval();
    startTimer = undefined;
}


function startPomodoroTimer(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    } else {
        alert("Timer is already running");
    }
}


botonAlarma.addEventListener('click', stopAlarm);


start.addEventListener('click',startPomodoroTimer);


botonSkipBreak.addEventListener('click', skipBreak);


reset.addEventListener('click', function(){
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, reiniciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            wm.innerText = minutosPomodoro;
            ws.innerText = segundosPomodoro;
            
            bm.innerText = minutosDescanso;
            bs.innerText = segundosDescanso;
            
            counter.innerText = 4;
            counterDescansos.innerText = 0;
            stopInterval()
            startTimer = undefined;
        }
    });

        
});


stop.addEventListener('click', stopTimer);

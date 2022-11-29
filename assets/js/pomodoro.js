const estado = document.getElementById('estado');
const counter = document.getElementById('counter');
const counterDescansos = document.getElementById('counter-descansos');

const botonAlarma = document.getElementById("pause_alarm");
const botonSkipBreak = document.getElementById('skip_break');

const minutosPomodoro = "00";
const segundosPomodoro = "10";

const minutosDescanso = "00";
const segundosDescanso = "10";

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

let descansoLargo = false;
let detenido = false;
let primerPomodoro = true;


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

function stopPomodoro(){
    if(!played){
        console.log('miau')
        startPomodoro = false;
        stopTimer();
        detenido = true;
    }
}

function playAlarm(){
    // Play the music just if is not currently playing
    if(audio.paused && !played){
        audio.play();
        played = true;
    }
}


function stopAlarm(){
    audio.pause();
    audio.currentTime = 0;
    played=false;
}

function stopAlarmButton(){
    stopAlarm();
    startPomodoro = true;
    detenido=false;
    startPomodoroTimer('stop');
    toggleSkipButton()
}




async function skipBreak(){
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, saltar descanso!'
    })

    if (result.isConfirmed) {
        wm.innerText = minutosPomodoro;
        ws.innerText = segundosPomodoro;
        
        bm.innerText = minutosDescanso;
        bs.innerText = segundosDescanso;
        counter.innerText = 4;
        counterDescansos.innerText = 0;
        descansoLargo = false;
        startPomodoroTimer('skip');
        stopAlarm();
    }

    
}

function toggleSkipButton(){

    botonSkipBreak.disabled = (counter.innerText !== '0');

    // if((wm.innerText !== 0 || ws.innerText !== 0) && descansoLargo === true){
    //     botonSkipBreak.disabled = false;
    // } else {
    //     botonSkipBreak.disabled = true;
    // }
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
        ws.innerText = 59;
        wm.innerText--;
        wm.innerText = wm.innerText.padStart(2, '0');
    }else{
        if(primerPomodoro){
            stopPomodoro();
        }
        primerPomodoro = false;
    }
    
    //Break Timer Countdown
    if(ws.innerText == 5 || bs.innerText == 5){
        playAlarm();
    }
    if(wm.innerText == 0 && ws.innerText == 0 && startPomodoro === true){
        if(bm.innerText == 0 && bs.innerText == 0 && startPomodoro === true){
            stopPomodoro();
        }
        if(bs.innerText != 0 && startPomodoro === true){
            bs.innerText--;
            bs.innerText = bs.innerText.padStart(2, '0');
        } else if(bm.innerText != 0 && bs.innerText == 0 && startPomodoro === true){
            bs.innerText = 59;
            bm.innerText--;
            bm.innerText = bm.innerText.padStart(2, '0');
        }
    }
    
    //Increment Counter by one if one full cycle is completed
    if(ws.innerText == 5 || bs.innerText == 5){
        playAlarm();
    }
    if(wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0){
        played = false;
        if(counter.innerText == 1){
            wm.innerText = minutosPomodoro;
            ws.innerText = segundosDescanso;
            
            bm.innerText = minutosDescansoLargo;
            bs.innerText = segundosDescansoLargo;
            descansoLargo = true;
        }else{
            wm.innerText = minutosPomodoro;
            ws.innerText = segundosDescanso;
            
            bm.innerText = minutosDescanso;
            bs.innerText = segundosDescanso;
            
        }
        
        stopPomodoro();
        
        counter.innerText--;
        counterDescansos.innerText++;
        if(counter.innerText == 0){
            counter.innerText = 4;
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


function startPomodoroTimer(mode='Start'){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    } else if(mode === 'Start') {
        alert("Timer is already running");
    }
}


botonAlarma.addEventListener('click', stopAlarmButton);


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
            primerPomodoro = true;
            stopInterval()
            startTimer = undefined;
            stopAlarm();
        }
    });

        
});


stop.addEventListener('click', stopTimer);

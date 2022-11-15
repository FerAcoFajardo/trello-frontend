let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');

let wm = document.getElementById('w_minutes');
let ws = document.getElementById('w_seconds');

let bm = document.getElementById('b_minutes');
let bs = document.getElementById('b_seconds');
const estado = document.getElementById('estado');


function disableStart(){
    start.disabled = true;
    start.classList.add('disabled');
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


//store a reference to a timer variable
let startTimer;

start.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    } else {
        alert("Timer is already running");
    }
});

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
                wm.innerText = 25;
                ws.innerText = "00";

                bm.innerText = 5;
                bs.innerText = "00";

                document.getElementById('counter').innerText = 0;
                stopInterval()
                startTimer = undefined;
            }
        });

    
});

stop.addEventListener('click', function(){
    stopInterval()
    startTimer = undefined;
});

let audio = new Audio('./assets/sounds/alarm.mp3');
let played = false;


function playAlarm(){
    // Play the music just if is not currently playing
    if(audio.paused && !played){
        audio.play();
        played = true;
        // Stop music in 5 seconds
        setTimeout(function() {
            audio.pause();
        }, 10000);
    }
}

function stopAlarm(){
    audio.pause();
    audio.currentTime = 0;
}

//Start Timer Function
function timer(){
    disableStart();
    enableStop();
    //Work Timer Countdown
    if(ws.innerText != 0){
        ws.innerText--;
    } else if(wm.innerText != 0 && ws.innerText == 0){
        ws.innerText = 59;
        wm.innerText--;
    }

    //Break Timer Countdown
    if(wm.innerText == 0 && ws.innerText == 0){
        if(bs.innerText != 0){
            bs.innerText--;
            playAlarm()
        } else if(bm.innerText != 0 && bs.innerText == 0){
            bs.innerText = 59;
            bm.innerText--;
            
        }
    }

    //Increment Counter by one if one full cycle is completed
    if(wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0){
        played = false;
        playAlarm()
        wm.innerText = 25;
        ws.innerText = "00";

        bm.innerText = 5;
        bs.innerText = "00";

        document.getElementById('counter').innerText++;
        played = false;

    }
}

//Stop Timer Function
function stopInterval(){
    stopAlarm();
    enableStartButton();
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

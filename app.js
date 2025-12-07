let gameSeq = [];
let userSeq = [];
let colors = ["voilet","red","blue","green"];
let started = false;
let highScore = 0;

document.getElementById("startBtn").addEventListener("click", () => {
    if (!started) {
        startGame();
    }
});

function startGame() {
    setTimeout( () => {
        if(!started) {
        started = true;
        document.getElementById("startBtn").style.display = "none";
        levelUp();
    }
    },500)
}

let level = 0;
let gameInfo = document.querySelector(".game-info");

function levelUp() {
    level++;
    if(highScore < level){
        highScore = level;
    }
    userSeq = [];
    gameInfo.innerText = `Level ${level}`;
    let rndm = Math.floor(Math.random() * 4);
    let color = colors[rndm];
    gameSeq.push(color);
    gameFlash(color);
}

function gameFlash(color){
    let btn = document.querySelector(`.${color}`);
    btn.classList.add("gameFlash");
    setTimeout( () => {
        btn.classList.remove("gameFlash");
    },500)
}

function userFlash(btn){
    if(started == false){
        return;
    }
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

let highScoreInfo = document.querySelector(".high-score");

function checkAns(idx) {
    console.log(level);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(()=>{
                levelUp();
            }, 500)
        }
    }
    else{
        gameInfo.innerHTML = `Game over! <b>Your score is ${level}`;
        userSeq = [];
        gameSeq = [];
        started = false;
        level = 0;
        highScoreInfo.innerText = `High Score ${highScore}`;
        document.getElementById("startBtn").style.display = "block";
    }
}

function btnPress(){
    if(started == false){
        return;
    }
    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userFlash(btn);
    checkAns(userSeq.length-1);
}

let btns = document.querySelectorAll(".box");

for(btn of btns){
    btn.addEventListener("click", btnPress);
}
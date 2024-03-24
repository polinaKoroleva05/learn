"use strict";
import Board from './board.js';
import {COLS, ROWS, BLOCK_SIZE, account, time} from "./const.js";


const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    UP: 38
}

Object.freeze(KEY);

const moves = {
    [KEY.RIGHT]: (obj) => ({ ...obj, x: obj.x + 1 }), //в фигурных скобках создается объект, 
                                                      //чтобы вернуть его из стрелочной функции, 
                                                      //обрамляем объект в круглые скобки
    [KEY.LEFT]: (obj) => ({ ...obj, x: obj.x - 1 }),
    [KEY.DOWN]: (obj) => ({ ...obj, y: obj.y + 1 }),
    [KEY.SPACE]: (obj) => ({ ...obj, y: obj.y + 1 }),
    [KEY.UP]: (obj) => board.rotate(obj)
}

Object.freeze(KEY);


const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('nextTetrino');
const ctxNext = canvasNext.getContext('2d');


ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board(ctx, ctxNext);
let requestId;

function animate(now = 0) {
    time.passed = now - time.start;
    if (time.passed > time.timePerFrame) {
        time.start = now;
        // опустить вниз на 1 активную фигурк
        if(!board.drop()){
            GameOver();
            return;
        }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.tetrino.clone(board.proection);
    proect(board.proection);
    board.draw();

    requestId = requestAnimationFrame(animate);
}

function play() {
    account.score = 0;
    account.level = 1;
    account.lines = 0;
    time.start = 0;
    time.passed = 0;
    time.timePerFrame = 1000;
    board.reset();
    animate();
}


function proect(proection){
    while (board.valid(proection)) {
        proection.y += 1;
    }
    proection.y -= 1;
    proection.draw();
}

function GameOver(){
    cancelAnimationFrame(requestId);
    saveScore();
    ctx.fillStyle = '#f4f0edbb';
    ctx.fillRect(1.5, 5, 7, 2);
    ctx.fillStyle = '#55473a';
    ctx.font = '1px Lucida console';
    ctx.fillText("GameOver!", 2.5, 6.3);
    board.sound("gameOver");
    setTimeout(openResult, 2150);
}

function saveScore(){
    let listNames = JSON.parse(localStorage.getItem("name"))
    let allScores = listNames.at(0); //взяли наш объект с именами
    if(allScores[listNames.at(1)] < account.level){
        allScores[listNames.at(1)] = account.level;
        localStorage.setItem("name", JSON.stringify([allScores, listNames.at(1)]));
    }
}

document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {
        // отмена действий по умолчанию
        event.preventDefault();
        // получение новых координат фигурки
        let obj = moves[event.keyCode](board.tetrino);

        if (event.keyCode === KEY.SPACE) {
            while (board.valid(obj)) {
                board.tetrino.move(obj);
                obj = moves[KEY.DOWN](board.tetrino);
            }
        }
        else if (board.valid(obj)) {
            board.tetrino.move(obj);
        }
    }
});

document.getElementById('startButton').addEventListener('click', () => {
    play(); // Вызываем функцию из модуля
  });
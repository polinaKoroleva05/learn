import Tetrino from './tetrino.js';
import {ROWS, COLS, linePerLvl, account, time, LevelSpeed} from './const.js';

export default class Board {
    constructor(ctx, ctxNext) {
        this.tetrino = null;
        this.proection = null;
        this.nextTetrino = null;
        this.ctx = ctx;
        this.ctxNext = ctxNext;
    }

    // Сбрасывает игровое поле перед началом новой игры
    reset() {
        this.grid = this.getEmptyBoard();
        this.tetrino = new Tetrino(this.ctx);
        this.getNextTetrino();
        let proection = new Tetrino(this.ctx);
        proection.color = '#bbdc9c';
        this.proection = proection;
    }

    getNextTetrino(){
        this.nextTetrino = new Tetrino(this.ctxNext);
        this.ctxNext.clearRect(0,0,this.ctxNext.canvas.width, this.ctxNext.canvas.height);
        this.nextTetrino.drawTetrino(true);
    }
    // Создает матрицу нужного размера, заполненную нулями
    getEmptyBoard() {
        return Array.from(
            { length: ROWS }, () => Array(COLS).fill(0)
        );
    }

    isInField(x, y) {
        return x >= 0 && x < COLS && y <= ROWS;
    }

    isFree(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    valid(obj) {
        return obj.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = obj.x + dx;
                let y = obj.y + dy;
                return value === 0 ||
                    (this.isInField(x, y) && this.isFree(x, y));
            });
        });
    }

    rotate(p) {
        // Клонирование матрицы
        let clone = JSON.parse(JSON.stringify(p));
        // алгоритм вращения
        // Транспонирование матрицы тетрамино
        for (let y = 0; y < clone.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [clone.shape[x][y], clone.shape[y][x]] =
                    [clone.shape[y][x], clone.shape[x][y]];
            }
        }
        clone.shape.forEach(row => row.reverse());
        clone.rotation = (clone.rotation + 1) % 4;
        return clone;
    }

    draw() {
        this.proection.draw();
        //this.tetrino.draw();
        this.tetrino.drawTetrino();
        this.drawBoard();
    }

    drop() {
        let p = { ...this.tetrino, y: this.tetrino.y + 1 };
        if (this.valid(p)) {
            this.tetrino.move(p);
        } else {
            this.writeInGrid();
            this.clearLines();

            if (!this.tetrino.y){
                return false;
            }

            this.tetrino = this.nextTetrino;
            this.tetrino.ctx = this.ctx;
            this.getNextTetrino();
        }
        return true;
    }

    writeInGrid() {
        this.sound('drop');
        this.tetrino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.tetrino.y][x + this.tetrino.x] = value*10 + this.tetrino.rotation;
                }
            });
        });
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    let img = new Image();
                    let src = 'image/' + value + '.png'
                    img.src = src;
                    this.ctx.drawImage(img, x, y, 1, 1);
                    //this.ctx.fillStyle = COLORS[value - 1];
                    //this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    clearLines() {
        let lines = 0;

        this.grid.forEach((row, y) => {
            // Если все клетки в ряду заполнены
            if (row.every(value => value > 0)) {
                lines++;
                // Удалить этот ряд
                this.grid.splice(y, 1);
                // Добавить наверх поля новый пустой ряд клеток
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
        if (lines > 0) {   
            account.score += this.getLineClearPoints(lines);
            account.lines += lines;
            this.sound("pip");
            if(account.lines >= account.level * linePerLvl){ //если собранных линий больше чем ожидалось исходя из уровня. 
                                                            //Раньше было !(account.lines % lPL), но если мы например
                                                            //на 2м уровне (и lpL = 2) с 4х линий вдруг перескочим на 7 линий, 
                                                            //то уровень не поменяется! Теперь мы увидим что 7 > 2*2 и увеличим на 3 // 2 = 1
                account.level = ~~(account.lines/linePerLvl) + 1; //см листочек
                time.timePerFrame = LevelSpeed[account.level];

            } }
    }

    getLineClearPoints(lines) {
        return  lines === 1 ? 100 :
                lines === 2 ? 300 :
                lines === 3 ? 500 :
                lines === 4 ? 800 :
                          0;
    }

    sound(name){
        let audio = new Audio();
        audio.src = 'sound/' + name + '.mp3';
        audio.play();
    }
}
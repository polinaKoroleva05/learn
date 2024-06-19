import {SHAPES, POINTS} from "./const.js"

export default class Tetrino {
    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    draw(next = false) {
        let Sx = next ? 0 : this.x;
        let Sy = next ? 0 : this.y;
        this.ctx.fillStyle = "#b9c881";
        this.shape.forEach(
            (row, y) => {
                row.forEach((num, x) => {
                    if (num) this.ctx.fillRect(Sx + x, Sy + y, 1, 1);
                });
            });

    }

    drawTetrino(next = false) {
        let Sx = next ? 0 : this.x;
        let Sy = next ? 0 : this.y;
        if (next) {                         //если собираемся отрисовать следующую фигурку
            let scale = this.typeId == 0 ? 4 :
                        this.typeId == 3 ? 2 : 3;
            let img = new Image();
            let src = 'image/' + this.typeId + '.png'
            img.src = src;
            let ctx = this.ctx;
            img.onload = function(){
                ctx.drawImage(img, 0, 0, scale, scale);
            }
            return;
        }
        this.shape.forEach(                 //если собираемся нарисовать активную фигурку
            (row, y) => {
                row.forEach((num, x) => {
                    if (num) {
                        let img = new Image();
                        let src = 'image/' + num + this.rotation + '.png'
                        img.src = src;
                        this.ctx.drawImage(img, Sx + x, Sy + y, 1, 1);
                    }
                });
            });
    }

    move(obj) {
        this.shape = obj.shape;
        this.x = obj.x;
        this.y = obj.y;
        this.rotation = obj.rotation;
    }

    // параметр noOfTypes - количество вариантов
    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
    }

    spawn() {
        this.typeId = this.randomizeTetrominoType(SHAPES.length);
        this.shape = SHAPES[this.typeId];
        this.y = 0;
        this.x = this.typeId === 3 ? 4 : 3;
        this.rotation = 0;
    }

    clone(proection) {
        proection.x = this.x;
        proection.y = this.y;
        proection.shape = this.shape;
    }
}
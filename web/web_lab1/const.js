export const SHAPES = [
    [[0, 0, 0, 0],
    [10, 11, 12, 13],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],
    
    [[20, 0, 0],
    [21, 22, 23],
    [0, 0, 0]],
    
    [[0, 0, 33],
    [30, 31, 32],
    [0, 0, 0]],
    
    [[40, 41],
    [42, 43]],
    
    [[0, 52, 53],
    [50, 51, 0],
    [0, 0, 0]],
    
    [[0, 60, 0],
    [61, 62, 63],
    [0, 0, 0]],
    
    [[70, 71, 0],
    [0, 72, 73],
    [0, 0, 0]]
];

export const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    HARD_DROP: 5
}

export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export const linePerLvl = 2;

Object.freeze(POINTS);

let accountValues = {
    score: 0,
    lines: 0,
    level: 1
}

export const time = {
    start: 0, 
    passed: 0, 
    timePerFrame: 1000
};

export const LevelSpeed = {
    1: 1000,
    2: 800,
    3: 600,
    4: 400,
    5: 300,
    6: 230,
    7: 150,
    8: 130,
    9: 110,
    10: 100
}


Object.freeze(LevelSpeed);

// Обновление данных на экране
function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
        element.textContent = value;
    }
}

// Проксирование доступа к свойствам accountValues
export let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true;
    }
});

const gameSettings = {    field: {        width: 400,        height: 400,    },    speed: 100,    cell: {        size: 20,        color: '#333333'    }}const mouseHandler = (e) => {    switch (e.key) {        case 'ArrowUp': {            if (Snake.dY !== -1 && Snake.dY !== 1) {                Snake.dY = -1                Snake.dX = 0            }            break        }        case 'ArrowDown': {            if (Snake.dY !== 1 && Snake.dY !== -1) {                Snake.dY = 1                Snake.dX = 0            }            break        }        case 'ArrowRight': {            if (Snake.dX !== 1 && Snake.dX !== -1) {                Snake.dY = 0                Snake.dX = 1            }        }            break        case 'ArrowLeft': {            if (Snake.dX !== -1 && Snake.dX !== 1) {                Snake.dY = 0                Snake.dX = -1            }            break        }    }}class GameClass {    constructor({field, speed, cell}) {        const gameField = document.getElementById('canvas')        const context = gameField.getContext('2d')        gameField.width = field.width        gameField.height = field.height        this.gameField = gameField        this.ctx = context        this.speed = speed        this.field = field        this.cell = cell    }    clear() {        this.gameField.width = this.field.width    }    render(data, cellSize, cellColor) {        if (Array.isArray(data)) {            for (const pos of data) {                this.ctx.beginPath()                this.ctx.rect(pos.x, pos.y, cellSize, cellSize)                this.ctx.fillStyle = cellColor                this.ctx.fill()            }        } else {            this.ctx.beginPath()            this.ctx.rect(data.x, data.y, cellSize, cellSize)            this.ctx.fillStyle = cellColor            this.ctx.fill()        }    }}class SnakeClass {    constructor({size = 10, color}, field) {        this.cellSize = size        this.cellColor = color        this.field = field    }    dX = 0    dY = 0    head = {x: 0, y: 0}    tail = []    move() {        this.head.x += this.dX * this.cellSize        this.head.y += this.dY * this.cellSize    }    isBorder() {        if (this.head.x >= this.field.width) {            this.head.x = 0        }        if (this.head.y >= this.field.height) {            this.head.y = 0        }        if (this.head.x < 0) {            this.head.x = this.field.width        }        if (this.head.y < 0) {            this.head.y = this.field.height        }    }}class FruitClass {    constructor(color, size, field) {        this.color = color        this.size = size        this.field = field    }    getPos() {        return {            x: Math.floor(Math.random() * (this.field.width - this.size)),            y: Math.floor(Math.random() * (this.field.height - this.size)),        }    }}/*=====================================================================*/const Game = new GameClass(gameSettings)const Snake = new SnakeClass(Game.cell, Game.field)const Fruit = new FruitClass('red', Game.cell.size, Game.field)window.addEventListener('keydown', mouseHandler)setInterval(() => {    Game.clear()    Snake.move()    Snake.isBorder()    Game.render(Snake.head, Snake.cellSize, Snake.cellColor)}, Game.speed)
class LivingCreater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiplay = 0

        //direction
        //for tarr 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found
    }
}

class Grass extends LivingCreater {
    constructor(x, y) {
        super(x,y)
        matrix[y][x] = 1
        grassArr.push(this)
    }
  
    mul() {
        let cell = this.chooseCell(0)
        if (cell.length > 0) {
            let randomCellIndex = Math.round(Math.random() * (cell.length - 1))
            let x = cell[randomCellIndex][0]
            let y = cell[randomCellIndex][1]
            matrix[y][x] = 1
            new Grass(x, y)
        }



    }

}
class GrassEater extends LivingCreater {
    constructor(x, y) {
        super(x,y)
        this.energy = 9
        grassEaterArr.push(this)
        matrix[y][x] = 2
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    move() { //this.energy 
        // this.getNewCoordinates()
        var Cempty = this.chooseCell(0)
        var RanC = Math.round(Math.random() * (Cempty.length - 1))
        let x2 = Cempty[RanC][0];
        let y2 = Cempty[RanC][1];
        matrix[this.y][this.x] = 0
        matrix[y2][x2] = 2

        this.x = x2
        this.y = y2

        this.energy--
    }
    eat() {
        var CeEmpty = this.chooseCell(1)
        var RanC = Math.round(Math.random() * (CeEmpty.length - 1))

        let x3 = CeEmpty[RanC][0];
        let y3 = CeEmpty[RanC][1];

        matrix[this.y][this.x] = 0
        matrix[y3][x3] = 2

        this.x = x3
        this.y = y3

        this.energy += 2
        for (var i in grassArr) {
            if (x3 == grassArr[i].x && y3 == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }

    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }

    }
    mul() {
        if (this.energy >= 15) {

            var Ceell = this.chooseCell(0)

            if (Ceell.length > 0) {
                var Rdom = Math.round(Math.random() * (Ceell.length - 1))
                let x4 = Ceell[Rdom][0]
                let y4 = Ceell[Rdom][1]
                matrix[this.y][this.x] = 2
                new GrassEater(x4, y4)
                this.energy = 10

            }

        }

    }


    start() {

        if (this.chooseCell(1).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move()
        }
        if (this.energy >= 20) {


            this.mul()
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
}

class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 6
        this.directions = [

        ]
        predatorArr.push(this)
        matrix[y][x] = 3
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found
    }
    start() {
        if (this.chooseCell(2).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move()
        }
        if (this.energy >= 20) {
            this.mul()
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    move() {
        var Cempty = this.chooseCell(0)
        var RanC = Math.round(Math.random() * (Cempty.length - 1))

        let x2 = Cempty[RanC][0];
        let y2 = Cempty[RanC][1];

        matrix[this.y][this.x] = 0
        matrix[y2][x2] = 3

        this.x = x2
        this.y = y2

        this.energy--
    }
    eat() {
        var CeEmpty = this.chooseCell(2)
        var RanC = Math.round(Math.random() * (CeEmpty.length - 1))

        let x3 = CeEmpty[RanC][0]
        let y3 = CeEmpty[RanC][1]

        matrix[this.y][this.x] = 0
        matrix[y3][x3] = 3

        this.x = x3
        this.y = y3

        this.energy += 1
        for (var i in grassEaterArr) {
            if (x3 == grassEaterArr[i].x && y3 == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }

    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }

    }
    mul() {
        if (this.energy >= 60) {

            var Ceell = this.chooseCell(0)

            if (Ceell.length > 0) {
                var Rdom = Math.round(Math.random() * (Ceell.length - 1))

                let x4 = Ceell[Rdom][0]
                let y4 = Ceell[Rdom][1]

                matrix[this.y][this.x] = 3
                new Predator(x4, y4)

                this.energy = 6

            }

        }

    }

}
class Water {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiplay = 0

        //direction
        //for tarr 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
        matrix[y][x] = 4
        grassArr.push(this)
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found

    }
    mul() {
        let cell = this.chooseCell(0)
        if (cell.length > 0) {
            let randomCellIndex = Math.round(Math.random() * (cell.length - 1))
            let x = cell[randomCellIndex][0]
            let y = cell[randomCellIndex][1]
            matrix[y][x] = 1
            new Grass(x, y)
        }



    }


}
class Gluttonous {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 6
        this.directions = [

        ]
        GluttonousArr.push(this)
        matrix[y][x] = 5
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found
    }
    start() {

        if (this.chooseCell(1).length > 0) {
            this.eat()
        } else if (this.chooseCell(2).length > 0) {
            this.eat()
        } else if (this.chooseCell(3).length > 0) {
            this.eat()
        } else if (this.chooseCell(0).length > 0) {
            this.move()
        }

        if (this.energy >= 20) {
            this.mul()
        }

    }
    move() {
        var Cempty = this.chooseCell(0)
        var RanC = Math.round(Math.random() * (Cempty.length - 1))

        let x2 = Cempty[RanC][0];
        let y2 = Cempty[RanC][1];

        matrix[this.y][this.x] = 0
        matrix[y2][x2] = 5

        this.x = x2
        this.y = y2

        this.energy--
    }
    eat() {
        var CeEmpty1 = this.chooseCell(1)
        var RanC1 = CeEmpty1[Math.round(Math.random() * (CeEmpty1.length))]

        var CeEmpty2 = this.chooseCell(2)
        var RanC2 = CeEmpty2[Math.round(Math.random() * (CeEmpty2.length))]

        var CeEmpty3 = this.chooseCell(3)
        var RanC3 = CeEmpty3[Math.round(Math.random() * (CeEmpty3.length))]


        if (RanC1) {
            let x3 = RanC1[0];
            let y3 = RanC1[1];

            matrix[this.y][this.x] = 0
            matrix[y3][x3] = 5

            this.x = x3
            this.y = y3
            // CeEmpty3
            this.energy += 1
            for (var i in grassArr) {
                if (x3 == grassArr[i].x && y3 == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        } else if (RanC2) {
            let x3 = RanC2[0];
            let y3 = RanC2[1];

            matrix[this.y][this.x] = 0
            matrix[y3][x3] = 5

            this.x = x3
            this.y = y3

            this.energy += 1
            for (var i in grassEaterArr) {
                if (x3 == grassEaterArr[i].x && y3 == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        } else if (RanC3) {
            let x3 = RanC3[0];
            let y3 = RanC3[1];

            matrix[this.y][this.x] = 0
            matrix[y3][x3] = 5

            this.x = x3
            this.y = y3

            this.energy += 1
            for (var i in predatorArr) {
                if (x3 == predatorArr[i].x && y3 == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

        }
    }



    mul() {
        if (this.energy >= 70) {

            var Ceell = this.chooseCell(0)

            if (Ceell.length > 0) {
                var Rdom = Math.round(Math.random() * (Ceell.length - 1))

                let x4 = Ceell[Rdom][0]
                let y4 = Ceell[Rdom][1]

                matrix[this.y][this.x] = 5
                new Predator(x4, y4)

                this.energy = 10

            }

        }

    }
}

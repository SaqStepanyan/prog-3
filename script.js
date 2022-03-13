matrix = [

]
grassArr = []
grassEaterArr = []
predatorArr = []
waterArr = []
GluttonousArr = []

let side = 10
function generateMatrix(size, grassCount, grassEaterCount,predatorCount,waterCount,gluttonousCount) {
    for (let y = 0; y < size; y++) {
        matrix[y] = []
        for (let x = 0; x < size; x++) {
            let num = Math.round(Math.random() * 0)
            matrix[y].push(num)
        }
    }
    for (let i = 0; i < grassCount; i++) {

        let x = Math.round(Math.random() * (size - 1))
        let y = Math.round(Math.random() * (size - 1))
        if (matrix[y][x] == 0) {
            new Grass(x, y)
        } else {
            i--
        }

    }
    for (let i = 0; i < grassEaterCount; i++) {

        let x = Math.round(Math.random() * (size - 1))
        let y = Math.round(Math.random() * (size - 1))
        if (matrix[y][x] == 0) {
            new GrassEater(x, y)
        } else {
            i--
        }
        
    }
    for (let i = 0; i < predatorCount; i++) {

        let x = Math.round(Math.random() * (size - 1))
        let y = Math.round(Math.random() * (size - 1))
        if (matrix[y][x] == 0) {
            new Predator(x, y)
        } else {
            i--
        }

    }
    for (let i = 0; i < waterCount; i++) {

        let x = Math.round(Math.random() * (size - 1))
        let y = Math.round(Math.random() * (size - 1))
        if (matrix[y][x] == 0) {
            new Water(x, y)
        } else {
            i--
        }

    }
    for (let i = 0; i < gluttonousCount; i++) {

        let x = Math.round(Math.random() * (size - 1))
        let y = Math.round(Math.random() * (size - 1))
        if (matrix[y][x] == 0) {
            new Gluttonous(x, y)
        } else {
            i--
        }

    }
    
}

    generateMatrix(50, 20, 10, 2, 15, 1)
    function setup() {


        frameRate(10);
        createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
        background('#acacac');
    }
    function draw() {
        // console.log(grassEaterArr[0].energy)

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] == 1) {
                    fill("green");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 4) {
                    fill("blue");
                }
                else if (matrix[y][x] == 5) {
                    fill("black");
                }
                
                rect(x * side, y * side, side, side);

                /*
                fill("blue")
                text(x+" "+y, x*side+side/2,y*side+side/2)
                */
            }
        }





        for (let i in grassArr) {
            grassArr[i].mul()
        }
        for (let i in grassEaterArr) {
            grassEaterArr[i].start()
        }
        for (let i in predatorArr) {
            predatorArr[i].start()
        }
        for(let i in waterArr) {
            waterArr[i].start()
        }for(let i in GluttonousArr) {
            GluttonousArr[i].start()
        }

    }

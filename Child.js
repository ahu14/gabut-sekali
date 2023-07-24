class Chess{
    constructor(){
        this.chess_pos = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]
        this.prevColor = null;
        this.imageClick = null;
        this.moves = [];
    }

    getBox(x, y){
        let chess_row = document.querySelectorAll('.chess-row');

        for (let i = 0; i < chess_row[y].children.length; i++){
            if (x == i){
                return chess_row[y].children[i];
            }
        }
    }

    changePos(x, y, target){
        this.chess_pos[y][x] = target;
    }


    possibleMoves(y, x, type, color){
        this.moves = [];

        let moveLikePlus = (y, x) => {
            let moveBackward = (item, type) => {
                for (let y2 = item; y2 >= 0; y2--){
                    if (y2 >= 0 && y2 < 8 && y2 != item){
                        let variable = type == 'y' 
                            ? this.chess_pos[y2][x] 
                            : this.chess_pos[y][y2] 
                        
                        let savePlaces = type == 'y'
                            ? this.moves.push({y: y2, x: x})
                            : this.moves.push({y: y, x: y2})

                        if (variable != '0'){
                            savePlaces;
                            break;
                        }

                        else{
                            savePlaces;
                        }
                    }
                }
            }

            let moveForward = (item, type) => {
                for (let y2 = item; y2 < 8; y2++){
                    if (y2 >= 0 && y2 < 8 && y2 != item){
                        let variable = type == 'y' 
                            ? this.chess_pos[y2][x] 
                            : this.chess_pos[y][y2] 
                        
                        let savePlaces = type == 'y'
                            ? this.moves.push({y: y2, x: x})
                            : this.moves.push({y: y, x: y2})
                        
                        if (variable != '0'){
                            savePlaces;
                            break;
                        }
        
                        else{
                            savePlaces
                        }
                    }
                }
            }

            moveBackward(y, 'y');
            moveBackward(x, 'x');
            moveForward(y, 'y');
            moveForward(x, 'x');
        }

        let moveLikeX = (y, x, type2, color) => {
            let moveForward2 = (y2, x2, type) => {
                let polaY = (i) => [y2+i, y2-i];
                let polaX = (i) => [x2+i, x2-i];

                let polaY2, polaX2;

                for (let i = 0; i <= 7; i++){
                    switch (type) {
                        case '1':
                            polaY2 = polaY(i)[1];
                            polaX2 = polaX(i)[1];
                            break;

                        case '3':
                            polaY2 = polaY(i)[0];
                            polaX2 = polaX(i)[1];
                            break;

                        case '4':
                            polaY2 = polaY(i)[0];
                            polaX2 = polaX(i)[0];
                            break;

                        default:
                            polaY2 = polaY(i)[1];
                            polaX2 = polaX(i)[0];
                            break;
                    }

                    if (polaY2 >= 0 && polaY2 < 8 && polaY2 != y &&
                        polaX2 >= 0 && polaX2 < 8 && polaX2 != x){
                        if (this.chess_pos[polaY2][polaX2] != '0' && polaY2 != y){
                            this.moves.push({y: polaY2, x: polaX2});
                            break;
                        }

                        else{
                            this.moves.push({y: polaY2, x: polaX2});
                        }
                    }
                }
            }

            if (color != 'black'){
                moveForward2(y, x, '1');
                moveForward2(y, x, '2');
            }

            if (type2 == 'ratu' || color == 'black'){
                moveForward2(y, x, '3');
                moveForward2(y, x, '4');
            }
        }

        switch (type){
            case 'benteng':
                moveLikePlus(y, x);
                break;

            case 'kuda':
                let pola = [
                    [2, 1], [1, 2], [-1, 2], [-2, 1],
                    [-2, -1], [-1, -2], [1, -2], [2,-1]
                ]

                for (let [y2, x2] of pola){
                    let y3 = y + y2
                    let x3 = x + x2;

                    if (y3 >= 0 && y3 < 8 && x3 >= 0 && x3 < 8){
                        this.moves.push({y: y3, x: x3});
                    }
                }
                break;

            case 'anak':
                let getColor = color == 'white' ? [y-1, y-2] : [y+1, y+2];

                if (y == 1 && color == 'black' || y == 6 && color == 'white'){
                    if (this.chess_pos[getColor[0]][x] == ''){
                        this.moves.push({y: getColor[0], x});
                    }

                    if (this.chess_pos[getColor[1]][x] == ''){
                        this.moves.push({y: getColor[1], x});
                    }
                }

                else{
                    if (this.chess_pos[getColor[0]][x] == ''){
                        this.moves.push({y: getColor[0], x});
                    }
                }                
                break;
            
            case 'gajah':
                moveLikeX(y, x, type, color);
                break;

            case 'ratu':
                moveLikePlus(y, x);
                moveLikeX(y, x, type, color);
                break;

            case 'raja':
                let pola2 = [
                    [0, 1], [0, -1], [1, 1], [1, -1],
                    [-1, 0], [1, 0], [-1, -1], [-1, 1]
                ]

                for (let [y2, x2] of pola2){
                    let y3 = y + y2;
                    let x3 = x + x2;

                    if (y3 >= 0 && y3 < 8 && x3 >= 0 && x3 < 8){
                        if (this.chess_pos[y3][x3] == '0'){
                            this.moves.push({y: y3, x: x3})
                        }

                        else{
                            this.moves.push({y: y3, x: x3})
                            break;
                        }
                    }
                }
                break;
        
            default:
                break;
        }
    }

    deleteCircle(){
        let circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            circle.style.display = "none";
        });
    }

    detectCircle(e, y, x, yprev, xprev, prevtype, type, color){
        this.deleteCircle();

        /*console.log(this.chess_pos);
        console.log('current pos: ' + y + ' ' + x);
        console.log('previous pos: ' + yprev + ' ' + xprev);
        console.log('current type : ' + type);
        console.log('previous type : ' + prevtype);
        console.log('image click : ' + this.imageClick.id);
        console.log('color : ' + color);
        console.log('');*/

        
        if (prevtype == type){
            prevtype = 0;
        }

        this.chess_pos[y][x] = type;
        this.chess_pos[yprev][xprev] = prevtype;

        let chessBox = document.querySelector('.chess-box');
        chessBox.children[y].children[x].appendChild(this.imageClick);

        this.imageClick.onclick = (e) => {
            this.detectImgClick(e, x, y, type, color);
        }
    }

    addCircles(e, x, y, type, color){
        let chess_row = document.querySelectorAll('.chess-row');

        for (let data of this.moves){
            let item = chess_row[data['y']].children[data['x']];

            if (item.children.length <= 1){
                item.children[0].style.display = 'flex';
                item.children[0].onclick = (e) => {
                    this.detectCircle(
                        e, data['y'], data['x'], y, x, 
                        type, this.imageClick.id, color
                    )
                }
            }

            else{
                let eatTarget = chess_row[data['y']].children[data['x']].children[1];
                let theEater = chess_row[y].children[x].children[1];

                eatTarget.onclick = (e) => {
                    e.target.remove();
                    item.append(theEater);
                    this.detectCircle(
                        e, data['y'], data['x'], y, x, 
                        type, this.imageClick.id, color
                    );

                    /*else{
                        this.imageClick = e.target;
                        this.imageClick.onclick = (e) => {
                            this.detectImgClick(e, data['x'], data['y'], this.imageClick.id, color)
                        }
                    }*/
                }
            }
        }
    }  

    detectImgClick(e, x, y, type, color){
        /*console.log(e.target);
        console.log(this.imageClick);
        console.log('');*/

        if (this.prevColor == null || this.prevColor != color){
            this.prevColor = color;
            this.imageClick = e.target;
            this.possibleMoves(y, x, type, color);
            this.addCircles(e, x, y, type, color);
        }
        

        //this.addCircle(x, y, type, color);

        //this.imageClick = e.target;
        
        /*if (this.lastClick != null){
            this.deleteCircle();
        }

        if (this.lastClick == e.target){
            this.deleteCircle();
            this.lastClick = null;
        }

        else{
            this.lastClick = e.target;
            this.addCircle(x, y, type);
        }*/
    }

    addItem(img, x, y, type){
        let img2 = document.createElement('img');
        img2.id = type;
        img2.src = `./images/${img}`;
        img2.style.width = '6.3vh';
        img2.style.height = '6.3vh';
        img2.style.mixBlendMode = 'multiply';

        let color = img.includes('white') ? 'white' : 'black';
        img2.onclick = (e) => this.detectImgClick(e, x, y, type, color)

        this.changePos(x, y, type);
        this.getBox(x, y).appendChild(img2);
    }
}



let chess = new Chess();

for (let i = 0; i < 8; i++){
    chess.addItem('./black_anak.jpg', i, 1, 'anak');
    chess.addItem('./white_anak.jpg', i, 6, 'anak');
}

chess.addItem('./white_benteng.jpg', 0, 7, 'benteng');
chess.addItem('./white_kuda.jpg', 1, 7, 'kuda');
chess.addItem('./white_gajah.jpg', 2, 7, 'gajah');
chess.addItem('./white_raja.jpg', 3, 7, 'raja');
chess.addItem('./white_ratu.jpg', 4, 7, 'ratu');
chess.addItem('./white_gajah.jpg', 5, 7, 'gajah');
chess.addItem('./white_kuda.jpg', 6, 7, 'kuda');
chess.addItem('./white_benteng.jpg', 7, 7, 'benteng');


chess.addItem('./black_benteng.jpg', 0, 0, 'benteng');
chess.addItem('./black_kuda.jpg', 1, 0, 'kuda');
chess.addItem('./black_gajah.jpg', 2, 0, 'gajah');
chess.addItem('./black_raja.jpg', 3, 0, 'raja');
chess.addItem('./black_ratu.jpg', 4, 0, 'ratu');
chess.addItem('./black_gajah.jpg', 5, 0, 'gajah');
chess.addItem('./black_kuda.jpg', 6, 0, 'kuda');
chess.addItem('./black_benteng.jpg', 7, 0, 'benteng');
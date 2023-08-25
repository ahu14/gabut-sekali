export default class ChessBoard{
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
        this.code = null;
        this.prevColor = null;
        this.imageClick = null;
        this.circleActive = false;
        this.moves = [];
        this.status = null;
        this.pos = {y: '', x: ''};
    }

    checkPos(color){
        let newColor = color == 'white' ? 'black' : 'white';
        let enemyKingPos = this.getKingPos(newColor);
        let allMoves = this.getAllMoves(color);        let kingPos = this.getKingPos(color);


        for (let i of allMoves){
            if (i.y == enemyKingPos.y && i.x == enemyKingPos.x && this.prevColor != color){
                this.pos = {y: i.y, x: i.x}
            }
        }
    }

    winStatus(y, x, color){
        if (this.pos.y == y && this.pos.x == x){
            this.status = color + ' ' + 'win';
        }
    }


    getBox(x, y){
        let chess_row = document.querySelectorAll('#chess-row');

        for (let i = 0; i < chess_row[y].children.length; i++){
            if (x == i){
                return chess_row[y].children[i];
            }
        }
    }

    getItem(target, color){
        let data = []

        for (let y = 0; y < this.chess_pos.length; y++){
            for (let x = 0; x < this.chess_pos[y].length; x++){
                if (this.chess_pos[y][x] == `${target}-${color}`){
                    data.push({y: y, x: x, type: target, color: color});
                }
            }
        }

        return data;
    }

    changePos(x, y, target, color){
        this.chess_pos[y][x] = `${target}-${color}`;
    }

    getKingPos(color){
        let king = this.getItem('king', color)[0];
        return {y: king.y, x: king.x}
    }

    getAllMoves(color){
        let fullData = [];

        let bishop = this.getItem('bishop', color);
        let queen = this.getItem('queen', color);
        let rook = this.getItem('rook', color);
        let pawn = this.getItem('pawn', color);
        let king = this.getItem('king', color);
        let knight = this.getItem('knight', color);

        let detectColor2 = (data, color) => {
            for (let d of data){
                let item = this.chess_pos[d.y][d.x];
                
                if (item == '0'){
                    fullData.push({y: d.y, x: d.x})
                }

                else{
                    if (!item.includes(color)){
                        fullData.push({y: d.y, x: d.x});
                    }
                }
            }

            return fullData;
        }

        let splitData = (item) => {
            let data = [];

            for (let b of item){
                let moves = this.possibleMoves(b.y, b.x, b.type, b.color);
                
                for (let i of moves){
                    data.push(i);
                }
            }

            return data;
        }

        detectColor2(splitData(pawn), color);
        detectColor2(splitData(bishop), color);
        detectColor2(splitData(rook), color);
        detectColor2(splitData(pawn), color);
        detectColor2(splitData(knight), color);
        detectColor2(splitData(queen), color);
        detectColor2(splitData(king), color);

        return fullData;
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

                return this.moves;
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

                return this.moves;
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

                return this.moves;
            }

            moveForward2(y, x, '1');
            moveForward2(y, x, '2');
            moveForward2(y, x, '3');
            moveForward2(y, x, '4');
        }

        switch (type){
            case 'rook':
                moveLikePlus(y, x);
                return this.moves;

            case 'knight':
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
                return this.moves;

            case 'pawn':
                let getColor = color == 'white' ? [y-1, y-2] : [y+1, y+2];

                if (y == 1 && color == 'black' || y == 6 && color == 'white'){
                    if (this.chess_pos[getColor[0]][x] == ''){
                        this.moves.push({y: getColor[0], x: x});
                        this.moves.push({y: getColor[1], x: x});
                        return this.moves;
                    }
                }

                else{
                    if (getColor[0] >= 0 && getColor[0] < 8){
                        if (this.chess_pos[getColor[0]][x] == ''){
                            this.moves.push({y: getColor[0], x: x});
                        }
    
                        if (this.chess_pos[getColor[0]][x + 1] != '' && x + 1 >= 0 && x + 1 < 8){
                            this.moves.push({y: getColor[0], x: x+1});
                        }
    
                        if (this.chess_pos[getColor[0]][x - 1] != '' && x - 1 >= 0 && x - 1 < 8){
                            this.moves.push({y: getColor[0], x: x-1});
                        }
                    }

                    return this.moves;
                }
            
            case 'bishop':
                moveLikeX(y, x, type, color);
                return this.moves;

            case 'queen':
                moveLikePlus(y, x);
                moveLikeX(y, x, type, color);
                return this.moves;

            case 'king':
                let pola2 = [
                    [0, 1], [0, -1], [1, 1], [1, -1],
                    [-1, 0], [1, 0], [-1, -1], [-1, 1]
                ]

                for (let [y2, x2] of pola2){
                    let y3 = y + y2;
                    let x3 = x + x2;

                    if (y3 >= 0 && y3 < 8 && x3 >= 0 && x3 < 8){
                        if (this.chess_pos[y3][x3] == '0' ||
                            !this.chess_pos[y3][x3].includes(color)){
                            this.moves.push({y: y3, x: x3})
                        }
                    }
                }

                return this.moves;
        
            default:
                return this.moves;
        }
    }

    getNewPiece(target, x, y, type, color){
        let makeBox = () => {
            let chess_row = document.querySelectorAll('#chess-row');
            let addCondition = color == 'white' ? y-1 : y+1;
            let item = chess_row[addCondition].children[x].getBoundingClientRect();
            let posData = { x: item.x, y: item.y }


            let target2 = document.createElement('div');
            target2.style.width = "27vh";
            target2.style.height = "6.5vh";
            target2.style.border = "2px solid #333";

            target2.style.position = "absolute";
            target2.style.left = `${posData.x}px`;
            target2.style.top = `${posData.y}px`;


            let img_data = [
                `${color}_rook`, `${color}_knight`, 
                `${color}_bishop`, `${color}_queen`
            ]

            for (let i = 0; i < img_data.length; i++){
                let img = document.createElement('img');
                img.src = `./images/${img_data[i]}.png`;
                img.style.width = "6.3vh";
                img.style.height = "6.3vh";
                img.onclick = (e) => {
                    target2.remove();
                    chess_row[addCondition].children[x].children[1].remove();

                    let type2 = img_data[i].replace(`${color}_`, '');
                    this.chess_pos[addCondition][x] = img_data[i].replace('_', '-');
                    this.addItem(`${img_data[i]}.png`, x, addCondition, type2);
                }

                target2.append(img);
            }

            document.body.append(target2);
        }


        for (let i = 0; i < this.chess_pos.length; i++){
            if (this.chess_pos[0][i] == 'pawn-white' || 
                this.chess_pos[7][i] == 'pawn-black'){
                makeBox();
            }
        }
    }

    detectColor(color){
        let newMoves = [];

        for (let data of this.moves){
            let item = this.chess_pos[data.y][data.x];

            if (item == '0'){
                newMoves.push({y: data.y, x: data.x})
            }

            else{
                if (!item.includes(`${color}`)){
                    newMoves.push({y: data.y, x: data.x});
                }
            }
        }

        this.moves = newMoves;
        return this.moves;
    }

    deleteCircle(){
        this.circleActive = false;
        let circles = document.querySelectorAll('#circle');

        circles.forEach(circle => {
            circle.style.display = "none";
        });
    }

    detectCircle(e, y, x, yprev, xprev, prevtype, type, color, eat){
        this.deleteCircle();
        
        if (prevtype == type){
            prevtype = 0;
        }

        this.chess_pos[y][x] = `${type}-${color}`;
        this.chess_pos[yprev][xprev] = prevtype;

        this.prevColor = color;

        let chessBox = document.querySelector('#chess-box');
        chessBox.children[y].children[x].appendChild(this.imageClick);

        this.imageClick.onclick = (e) => {
            this.detectImgClick(e, x, y, type, color);
        }
    }

    addCircles(e, x, y, type, color, status){
        this.deleteCircle();
        let chess_row = document.querySelectorAll('#chess-row');

        for (let data of this.moves){
            let item = chess_row[data['y']].children[data['x']];

            if (item.children.length <= 1){
                item.children[0].style.display = 'flex';
                item.children[0].onclick = (e) => {
                    this.detectCircle(
                        e, data['y'], data['x'], y, x, 
                        type, this.imageClick.id, color, false
                    )
                    this.getNewPiece(item, x, y, type, color);
                }
            }

            else{
                let eatTarget = chess_row[data['y']].children[data['x']].children[1];
                let theEater = chess_row[y].children[x].children[1];
                item.children[0].style.display = 'flex';

                item.children[0].onclick = (e) => {
                    item.children[0].style.display = "none";
                    let eatTargetColor = eatTarget.src.includes('black') ? 'black' : 'white';

                    if (this.circleActive && eatTargetColor != color){
                        eatTarget.remove();
                        item.append(theEater);

                        if (this.pos.y != '' && this.pos.x != ''){
                            this.win = color;
                        }

                        this.detectCircle(
                            e, data['y'], data['x'], y, x, 
                            type, this.imageClick.id, color, true
                        );

                        this.winStatus(data['y'], data['x'], color);
                        this.getNewPiece(theEater, x, y, type, color);
                    }

                    else{
                        this.imageClick = e.target;
                        let newColor = this.imageClick.src.includes('black') ? 'black' : 'white';

                        this.winStatus(data['y'], data['x'], color);
                        this.detectImgClick(e, data['x'], data['y'], this.imageClick.id, newColor);
                        this.getNewPiece(e.target, x, y, type, color);
                    }
                }
            }
        }
    }  

    detectImgClick(e, x, y, type, color){
        if (this.prevColor == null || this.prevColor != color){
            this.checkPos(color);
            this.checkPos(color == 'black' ? 'black' : 'white');
            
            this.imageClick = e.target;
            this.possibleMoves(y, x, type, color);
            this.detectColor(color);
            this.addCircles(e, x, y, type, color);
            this.circleActive = true;
        }
    }

    addItem(img, x, y, type){
        let img2 = document.createElement('img');
        img2.id = type;
        img2.src = `./images/${img}`;
        img2.style.width = '6.3vh';
        img2.style.height = '6.3vh';
        img2.style.position = 'relative';
        img2.style.mixBlendMode = 'darken';
        img2.style.cursor = 'pointer';

        let color = img.includes('white') ? 'white' : 'black';
        img2.onclick = (e) => this.detectImgClick(e, x, y, type, color)

        this.changePos(x, y, type, color);
        this.getBox(x, y).prepend(img2);
        this.getBox(x, y).appendChild(img2);
    }
}
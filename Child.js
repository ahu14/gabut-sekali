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
        this.circleActive = false;
        this.clicked = false;
        this.imageClick = null;
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

    circleChecker(x, y){
        return this.getBox(x, y).children.length;
    }

    addCircle(x, y, type, color){
        let chess_row = document.querySelectorAll('.chess-row');

        /*let clicked = (e, e2, y2, x2, y, x, color) => {
            e.target.remove();
            this.detectCircle(e, y, a, x, y, type, c prevtype,olor);
            e2.append(this.imageClick);
        }*/

        switch (type){
            case 'benteng':
                this.circleActive = true;

                for (let a = 0; a < chess_row[y].children.length; a++){
                    if (a != x){
                        if (chess_row[y].children[a].children.length <= 1){
                            let item = chess_row[y].children[a].children[0];
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, y, a, x, y, type, this.imageClick.id, color);
                        }

                        else{
                            let item = chess_row[y].children[a].children[1];
                            item.onclick = (e) => {
                                if (this.circleActive == true){
                                    e.target.remove();
                                    this.detectCircle(e, y, a, x, y, type, this.imageClick.id, color);
                                    chess_row[y].children[a].append(this.imageClick);
                                }

                                else{
                                    this.imageClick = e.target;
                                    this.imageClick.onclick = (e) => this.detectImgClick(e, x, y, this.imageClick.id, color);
                                }
                            }
                        }
                    }
                }

                for (let i = 0; i < chess_row[y].children.length; i++){
                    if (i != y){
                        if (chess_row[i].children[x].children.length <= 1){
                            let item = chess_row[i].children[x].children[0];
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, i, x, y, x, type, this.imageClick.id, color);
                        }

                        else{
                            let item = chess_row[i].children[x].children[1];

                            item.onclick = (e) => {
                                if (this.circleActive == true){
                                    e.target.remove();
                                    this.detectCircle(e, i, x, i, y, type, this.imageClick.id, color);
                                    chess_row[i].children[x].append(this.imageClick);
                                }

                                else{
                                    this.imageClick = e.target;
                                    this.imageClick.onclick = (e) => this.detectImgClick(e, x, i, this.imageClick.id, color);
                                }
                            }

                            break;
                        }
                    }
                }
                break;


            case 'kuda':
                let polaY = {'y-1': y-1, 'y+1': y+1, 'y+2': y+2, 'y-2': y-2};
                let polaX = {'x-1': x-1, 'x+1': x+1, 'x+2': x+2, 'x-2': x-2};

                let firstPattern = {};
                let secondPattern = {};

                for (let i of Object.keys(polaY)){
                    if (polaY[i] < chess_row.length && polaY[i] >= 0){
                        firstPattern[i] = polaY[i];
                    }
                }

                for (let a of Object.keys(polaX)){
                    if (polaX[a] < chess_row.length && polaX[a] >= 0){
                        secondPattern[a] = polaX[a];
                    }
                }


                for (let i of Object.keys(firstPattern)){
                    for (let a of Object.keys(secondPattern)){
                        if (i.includes('1') && a.includes('2') ||
                            i.includes('2') && a.includes('1')){
                            let y2 = firstPattern[i];
                            let x2 = secondPattern[a];

                            if (chess_row[y2].children[x2].children.length > 1){
                                let item = chess_row[y2].children[x2].children[1];

                                item.onclick = (e) => {
                                    e.target.remove();
                                    chess_row[y2].children[x2].append(chess_row[y].children[x].children[1]);
                                    this.detectCircle(e, y2, x2, y, x, type, this.imageClick.id, color);
                                }
                            }

                            else{
                                let item = chess_row[y2].children[x2].children[0];
                                item.style.display = "flex";
                                item.onclick = (e) => this.detectCircle(e, y2, x2, y, x, type, this.imageClick.id, color);
                            }
                        }
                    }
                }
                break;


            case 'anak':
                this.circleActive = true;

                if (color == 'white'){
                    for (let i = 1; i < 3; i++){
                        if (chess_row[y-i].children[x].children.length > 1){
                            let item = chess_row[y-i].children[x].children[1];

                            item.onclick = (e) => {
                                if (this.circleActive){
                                    e.target.remove();
                                    chess_row[y-i].children[x].append(chess_row[y].children[x].children[1]);
                                    this.detectCircle(e, y - i, x, y, x, type, this.imageClick.id, color);
                                }
                            }
                        }

                        else{
                            let item = chess_row[y - i].children[x].children[0];
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, y-i, x, y, x, type, this.imageClick.id, color);
                        }
                    }
                }

                else{
                    for (let i = 1; i < 3; i++){
                        if (chess_row[y+i].children[x].children.length > 1){
                            let item = chess_row[y+i].children[x].children[1];

                            item.onclick = (e) => {
                                e.target.remove();
                                chess_row[y+i].children[x].append(chess_row[y].children[x].children[1]);
                                this.detectCircle(e, y + i, x, y, x, type, this.imageClick.id, color);
                            }
                        }

                        else{
                            let item = chess_row[y + i].children[x].children[0];
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, y + i, x, y, x, type, this.imageClick.id, color);
                        }
                    }
                }
                break;
            
            case 'gajah':
                let pattern = (num, sign) => {
                    let data = [];

                    if (sign == '-'){
                        num = num - 1;

                        while (num >= 0){
                            data.push(num--);
                        }
                    }

                    else{
                        num = num + 1;

                        while (num < 8){
                            data.push(num++);
                        }
                    }

                    return data;
                }

                let getPos = (d, d2) => {
                    if (d.length > d2.length){
                        d = d.slice(0, d2.length);
                    }

                    else{
                        d2 = d2.slice(0, d.length);
                    }

                    for (let i = 0; i < d.length; i++){
                        if (chess_row[d[i]].children[d2[i]].children.length <= 1){
                            let item = chess_row[d[i]].children[d2[i]].children[0]
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, d[i], d2[i], y, x, type, this.imageClick.id, color);
                        }

                        else{
                            let item = chess_row[d[i]].children[d2[i]].children[1];
                            item.onclick = (e) => {
                                e.target.remove();
                                chess_row[d[i]].children[d2[i]].append(chess_row[y].children[x].children[1]);
                                this.detectCircle(e, d[i], d2[i], y, x, type, this.imageClick.id, color);
                            }
                        }
                    }
                }

                getPos(pattern(y, '-'), pattern(x, '-'))
                getPos(pattern(y, '-'), pattern(x, '+'));
                getPos(pattern(y, '+'), pattern(x, '+'));
                getPos(pattern(y, '+'), pattern(x, '-'));
                break;

            case 'ratu':
                let pattern2 = (num, sign) => {
                    let data = [];

                    if (sign == '-'){
                        num = num - 1;

                        while (num >= 0){
                            data.push(num--);
                        }
                    }

                    else{
                        num = num + 1;

                        while (num < 8){
                            data.push(num++);
                        }
                    }

                    return data;
                }

                let getPos2 = (d, d2) => {
                    if (d.length > d2.length){
                        d = d.slice(0, d2.length);
                    }

                    else{
                        d2 = d2.slice(0, d.length);
                    }

                    for (let i = 0; i < d.length; i++){
                        if (chess_row[d[i]].children[d2[i]].children.length <= 1){
                            let item = chess_row[d[i]].children[d2[i]].children[0]
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, d[i], d2[i], y, x, type, this.imageClick.id, color);
                        }

                        else{
                            let item = chess_row[d[i]].children[d2[i]].children[1];
                            item.onclick = (e) => {
                                e.target.remove();
                                chess_row[d[i]].children[d2[i]].append(chess_row[y].children[x].children[1]);
                                this.detectCircle(e, d[i], d2[i], y, x, type, this.imageClick.id, color);
                            }
                        }
                    }
                }

                getPos2(pattern2(y, '-'), pattern2(x, '-'))
                getPos2(pattern2(y, '-'), pattern2(x, '+'));
                getPos2(pattern2(y, '+'), pattern2(x, '+'));
                getPos2(pattern2(y, '+'), pattern2(x, '-'));


                for (let a = 0; a < chess_row[y].children.length; a++){
                    if (a != x){
                        if (chess_row[y].children[a].children.length <= 1){
                            let item = chess_row[y].children[a].children[0];
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, y, a, x, y, type, this.imageClick.id, color);
                        }

                        else{
                            let item = chess_row[y].children[a].children[1];
                            item.onclick = (e) => {
                                e.target.remove();
                                this.detectCircle(e, y, a, x, y, type, this.imageClick.id, color);
                                chess_row[y].children[a].append(this.imageClick);
                            }
                        }
                    }

                    if (a != y){
                        if (chess_row[a].children[x].children.length <= 1){
                            let item = chess_row[a].children[x].children[0];
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, a, x, y, x, type, this.imageClick.id, color);
                        }

                        else{
                            let item = chess_row[a].children[x].children[1];

                            item.onclick = (e) => {
                                e.target.remove();
                                this.detectCircle(e, a, x, a, y, type, this.imageClick.id, color);
                                chess_row[a].children[x].append(this.imageClick);
                            }
                        }
                    }
                }
                break;

            case 'raja':
                for (let i = y+1; i > y-2; i--){
                    for (let a = x+1; a > x-2; a--){
                        if (i < 0 || i > 7 || a < 0 || a > 7){
                            continue;
                        }

                        if (chess_row[i].children[a].children.length <= 1){
                            let item = chess_row[i].children[a].children[0];
                            item.style.display = "flex";
                            item.onclick = (e) => this.detectCircle(e, i, a, y, x, type, this.imageClick.id, color);
                        }

                        else{
                            let item = chess_row[i].children[a].children[1];
                            item.onclick = (e) => {
                                e.target.remove();
                                chess_row[i].children[a].append(chess_row[y].children[x].children[1]);
                                this.detectCircle(e, i, a, y, x, type, this.imageClick.id, color);
                            }
                        }
                    }
                }
        
            default:
                break;
        }
    }

    deleteCircle(){
        let circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            this.circleActive = false;
            circle.style.display = "none";
        });
    }

    detectCircle(e, i, j, iprev, jprev, prevtype, type, color){
        console.log(this.chess_pos);

        if (prevtype == type){
            prevtype = 0;
        }
        
        this.chess_pos[i][j] = type;
        this.chess_pos[iprev][jprev] = prevtype;

        let chessBox = document.querySelector('.chess-box');
        chessBox.children[i].children[j].appendChild(this.imageClick);

        this.deleteCircle();

        this.imageClick.onclick = (e) => {
            this.detectImgClick(e, j, i, this.imageClick.id, color);
        }
    }

    detectImgClick(e, x, y, type, color){
        /*console.log(this.chess_pos);
        console.log(e.target);
        console.log(this.imageClick);
        console.log('');*/

        if (this.imageClick != e.target){
            this.deleteCircle();   
        }

        this.imageClick = e.target;
        this.addCircle(x, y, type, color);

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

        let color = img.includes('white') ? 'white' : 'black'
        img2.onclick = (e) => this.detectImgClick(e, x, y, type, color);

        this.changePos(x, y, type);
        this.getBox(x, y).appendChild(img2);
    }
}



let chess = new Chess();
chess.addItem('./white_benteng.jpg', 7, 7, 'benteng');
chess.addItem('./white_anak.jpg', 4, 5, 'anak');


//chess.addItem('./white_raja.jpg', 3, 4, 'raja');
//chess.addItem('./white_ratu.jpg', 0, 6, 'ratu');


//chess.addItem('./white_kuda.jpg', 0, 3, 'kuda');
/*chess.addItem('./white_gajah.jpg', 2, 7, 'gajah');
chess.addItem('./white_anak.jpg', 4, 5, 'anak');*/

//chess.addItem('./white_kuda.jpg', 0, 6, 'kuda');

/*for (let i = 0; i < 8; i++){
    chess.addItem('./white_anak.jpg', i, 6, 'anak');
}

chess.addItem('./white_benteng.jpg', 0, 7, 'benteng');
chess.addItem('./white_benteng.jpg', 7, 7, 'benteng');*/
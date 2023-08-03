/*import Chess from "./Child.js";
let chess = new Chess();

for (let i = 0; i < 8; i++){
    chess.addItem('./black_anak.jpg', i, 1, 'anak');
    chess.addItem('./white_anak.jpg', i, 6, 'anak');
}

let automaticSummon = (data, y) => {
    for (let a = 0; a < 8; a++){
        let piece = data[a];
        let color = data[a].includes('black') ? 'black' : 'white';
        let getType = piece.replace(`${color}_`, '');
        chess.addItem(`./${piece}.jpg`, a, y, getType);
    }
}

let chessWhite = [
    'white_benteng', 'white_kuda', 'white_gajah', 'white_raja', 
    'white_ratu', 'white_gajah', 'white_kuda', 'white_benteng'
]

let chessBlack = [
    'black_benteng', 'black_kuda', 'black_gajah', 'black_ratu', 
    'black_raja', 'black_gajah', 'black_kuda', 'black_benteng'
]

automaticSummon(chessWhite, 7);
automaticSummon(chessBlack, 0);*/
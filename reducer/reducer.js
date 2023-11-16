import {Chess} from "chess.js";
import { getCookie, deleteCookie } from "@/lib/cookie";
import converter from "@/lib/moveConverter.js";
import Router from "next/router";


let initialState = {
    type: '',
    depth: null,
    stockfish: null,
    game: new Chess(),
    listMoves: [],
    position: {},
    moveablePlace: {},
    currentPlace: '',
    msg: '',
    chessPlay: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
    color: () => game.turn()
}


function reducer(state = initialState, action){
    switch (action.type){
        case 'getWorker':
            state.stockfish = new Worker("./stockfish.js");
            return ({...state, stockfish: state.stockfish});

    
        case 'activateAi':
            state.stockfish.postMessage("uci");
            state.stockfish.postMessage(`position fen ${state.game.fen()}`);
            state.stockfish.postMessage(`go depth ${state.depth}`);

            state.stockfish.onmessage = (e) => {
                let move = e.data.match(/bestmove\s+(\S+)/)?.[1]

                if (move){
                    state.game.move({
                        from: move.substring(0, 2),
                        to: move.substring(2, 4),
                        promotion: 'q'
                    });

                    return {
                        ...state, 
                        game: state.game,
                        chessPlay: state.chessPlay.push(state.game.fen()),
                        color: state.game.turn(),
                        fen: action.fen(state.game.fen())
                    };
                }
            };


        case 'hover':
            if (state.game.moves({square: action.move}).length > 0){
                return ({   
                    ...state,
                    listMoves: [
                        action.move, 
                        ...state.game.moves({square: action.move})
                    ],
                    currentPlace: action.move
                })
            }
    
            else{
                return ({   
                    ...state,
                    moveablePlace: {},
                    currentPlace: action.move
                })
            }
            

        case 'customSquare':
            if (state.listMoves != []){
                let list = {}
                
                for (let i = 0; i < state.listMoves.length; i++){
                    if (state.listMoves[i].length > 2){
                        let format = converter(state.listMoves[i]);
            
                        list[format] = {
                            background: "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                            borderRadius: "50%"
                        };
                    }
            
                    else{
                        list[state.listMoves[i]] = {
                            background: "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                            borderRadius: "50%"
                        };
                    }
                }
    
                return({
                    ...state,
                    moveablePlace: list
                })
            }


        case 'clicked':
            if (action.sourceSquare == action.targetSquare){
                return false;
            }

            else{
                try{
                    state.game.move({
                        from: action.sourceSquare,
                        to: action.targetSquare,
                        promotion: 'q'
                    });

                    state.chessPlay.push(state.game.fen());

                    return ({
                        ...state,
                        chessPlay: state.chessPlay,
                        moveablePlace: {},
                        listMoves: [],
                        game: state.game,
                        color: state.game.turn(),
                        currentPlace: '',
                        msg: ''
                    })
                }
                
                catch (err){
                    return ({...state, msg: 'invalid moves'})
                }
            }


        case 'saveData':            
            if (state.msg != '' && state.msg != 'invalid moves'){
                let data2 = {
                    status: state.msg,
                    chess: state.chessPlay,
                    player1: action.player1,
                    player2: action.player2
                }

                let JSONdata = JSON.stringify(data2);
        
                let endPoint = '/api/addData';
                let options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSONdata
                }
        
                fetch(endPoint, options)
                .then(res => res.json())
                .then(msg => Router.push('/'));

                return ({
                    type: '',
                    msg: state.msg,
                    depth: null,
                    game: new Chess(),
                    listMoves: [],
                    position: {},
                    moveablePlace: {},
                    currentPlace: '',
                    chessPlay: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
                    color: () => game.turn()
                })
            }


        case 'winOrLose':
            if (state.game.isCheckmate()){    
                state.msg = `${state.color == 'b' ? getCookie('player2') : getCookie('player1')} got checkmated`
            }
    
            if (state.game.isDraw()){
                state.msg = `ooo it's draw`;
            }
    
            if (state.game.isStalemate()){
                state.msg = `${state.color == 'b' ? getCookie('player1') : getCookie('player2')} got stalemated. so it's draw.`
            }
    
            if (state.game.isThreefoldRepetition()){
                state.msg = 'cannot three fold repetition yeah. so it\'s draw.';
            }

            return ({
                ...state,
                msg: state.msg,
                chessPlay: state.chessPlay
            })


        case 'getPositionObject':
            return ({...state, position: state.position});


        case 'clearListMoves':
            return ({...state, listMoves: []});

            
        case 'customSquareStyles':
            return ({...state, moveablePlace: state.moveablePlace});
            

        case 'clearMsg':
            if (state.msg != '' && state.msg != 'invalid moves'){
                deleteCookie('vsWho');
                deleteCookie('difficulty');
                deleteCookie('player1');
                deleteCookie('player2');
                deleteCookie('playAs');
            }

            return ({...state, msg: ''});


        case 'moveableBlank':
            return ({...state, moveablePlace: {}});

        
        case 'setType':
            return ({...state, type: action.playType})


        case 'setPlayers':
            return ({...state, player1: action.player1, player2: action.player2});

        
        case 'returnPlayers':
            return ({...state, player1: state.player1, player2: state.player2});

        
        case 'setDepth':
            return ({...state, depth: action.depth});


        default:
            return state;
    }
}

export default reducer;
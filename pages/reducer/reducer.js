import {Chess} from "chess.js";
import { getCookie } from "../lib/cookie";
import converter from "@/pages/lib/moveConverter.js";
import Router from "next/router";
import Engine from "../lib/engine.js";


let initialState = {
    type: '',
    depth: null,
    player1: '',
    player2: '',
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
        case 'activateAi':
            const stockfish = new Worker("./stockfish.js");

            stockfish.postMessage("uci");
            stockfish.postMessage(`position fen ${state.game.fen()}`);
            stockfish.postMessage(`go depth ${state.depth}`);

            stockfish.onmessage = (e) => {
                let move = e.data.match(/bestmove\s+(\S+)/)?.[1]

                if (move){
                    console.log(state.chessPlay);

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
            //console.log(state);

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
            //console.log(state);
            
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
            //console.log(state);
            //console.log(action);
            
            let listLegalMoves = state.game.moves({square: action.sourceSquare});

            if (listLegalMoves.length > 0){
                for (let i in state.moveablePlace){
                    if (action.sourceSquare == action.targetSquare){
                        return false;
                    }

                    if (i == action.targetSquare){
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
                }

                return ({...state, msg: 'invalid moves'})
            }

            else{
                return ({...state, msg: 'invalid moves'})
            }


        case 'saveData':
            if (state.msg != '' && state.msg != 'invalid moves'){
                //console.log(state.chessPlay);

                let data2 = {
                    status: state.msg,
                    chess: state.chessPlay
                }

                data2['player1'] = action.player1;
                data2['player2'] = action.player2;

        
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
            }


        case 'winOrLose':
            //console.log(state.chessPlay);

            if (state.game.isCheckmate()){
                state.msg = `${state.color == 'b' ? getCookie('player2') : getCookie('player1')} got checkmated`;
            }
    
            if (state.game.isDraw()){
                state.msg = `ooo it's draw`;
            }
    
            if (state.game.isStalemate()){
                state.msg = `${state.color == 'b' ? getCookie('player2') : getCookie('player1')} got stalemates. so it's draw.`;
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
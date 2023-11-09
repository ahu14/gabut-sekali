import {Chessboard} from "react-chessboard";
import {getCookie, setCookie} from "@/pages/lib/cookie.js";
import styles from "@/styles/Chess.module.css";
import { useState, useEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";


export default function ChessGame(){
    let [color, setColor] = useState<any>();
    let [depth, setDepth] = useState<any>();
    let [fen, setFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    let depthOptions = {easy: 2, medium: 5, hard: 8};

    let players = useSelector((state: any) => ({player1: state.player1, player2: state.player2}));
    let moveablePlace = useSelector((state:any) => state.moveablePlace);
    let game = useSelector((state:any) => state.game);
    let position = useSelector((state:any) => state.position);
    let listMoves = useSelector((state:any) => state.listMoves);
    let msg = useSelector((state:any) => state.msg);
    let dispatch = useDispatch();


    useEffect(() => {
        if (getCookie('vsWho') == 'friend'){
            dispatch({type: 'setType', playType: 'friend'});
            dispatch({
                type: 'setPlayers', 
                player1: getCookie('player1'), 
                player2: getCookie('player2')
            });
        }

        else{
            let difficulty = getCookie('difficulty');
            let getDepth = depthOptions[difficulty as keyof typeof depthOptions];

            dispatch({type: 'setType', playType: 'ai'});
            dispatch({type: 'setDepth', depth: getDepth});
            
            if (getCookie('playAs') == 'white'){
                setColor('white');

                dispatch({
                    type: 'setPlayers', 
                    player1: 'player', 
                    player2: 'ai'
                });

                setCookie('player1', 'player');
                setCookie('player2', 'ai');
            }

            else{
                setColor('black');

                dispatch({
                    type: 'setPlayers', 
                    player1: 'ai', 
                    player2: 'player'
                });

                setCookie('player1', 'ai');
                setCookie('player2', 'player');
            }
        }

        document.addEventListener('mousemove', (e:any) => {
            if (e.target.id == 'body'){
                dispatch({type: 'moveableBlank'});
            }
        });
    }, []);


    useEffect(() => {
        if (color != undefined){
            let color2 = game.turn() == 'w' ? 'white' : 'black';

            if (getCookie('vsWho') == 'ai' && color2 != getCookie('playAs')){
                dispatch({type: 'activateAi', fen: (string:string) => setFen(string)});
                dispatch({type: 'clearListMoves'});
            }
        }
    }, [color, game.turn()]);


    useEffect(() => {
        dispatch({
            type: 'saveData',
            vsWho: getCookie('vsWho'),
            player1: getCookie('player1'),
            player2: getCookie('player2')
        });

        setTimeout(() => {
            dispatch({type: 'clearMsg'});
        }, 1000);
    }, [msg]);


    useEffect(() => {
        dispatch({type: 'customSquare'});
    }, [listMoves, position]);


    useEffect(() => {
        dispatch({type: 'winOrLose'});
    }, [game.fen()]);


    let clicked = (sourceSquare:any, targetSquare:any, piece:any) => {
        dispatch({
            type: 'clicked', 
            sourceSquare: sourceSquare,
            targetSquare: targetSquare,
            piece: piece
        });
        setFen(game.fen());

        return true;
    }


    let hovering = (move:any) => {
        if (getCookie('vsWho') == 'ai'){
            let color2 = game.turn() == 'w' ? 'white' : 'black';

            if (color2 == getCookie('playAs')){
                dispatch({
                    type: 'hover', 
                    move: move
                })
            }
        }

        else{
            dispatch({
                type: 'hover', 
                move: move
            })
        }
    }


    return (
        <div className={styles.body} id="body">
            <h2>{players.player2}</h2>

            <div className={styles.chessWrapper}>
                <Chessboard id="chess-board" 
                position={fen} boardWidth={400}
                onMouseOverSquare={(move:any) => hovering(move)}
                onPieceDrop={clicked} 
                getPositionObject={position => dispatch({type: 'getPositionObject'})} 
                customSquareStyles={moveablePlace} />
            </div>

            <h2>{players.player1}</h2>
            <h2>{msg}</h2>
        </div>
    )
}
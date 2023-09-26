import {Chess} from "chess.js";
import Chessboard from "chessboardjsx";
import {getCookie} from "../lib/cookie.js";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";


export default function ChessGame(){
    let [players, setPlayers] = useState<{player1: string, player2:string}>({
        player1: '',
        player2: ''
    });

    let [game, setGame] = useState<any>(new Chess());
    let [moves, setMoves] = useState<string>('');
    let [listMoves, setListMoves] = useState<any>([]);
    let [position, setPosition] = useState<object>({});
    let [moveablePlace, setMoveable] = useState<object>({});
    let [currentPlace, setCurrent] = useState<string>('');


    let [msg, setMsg] = useState<string>('');
    let [color, setColor] = useState<string>('white');


    useEffect(() => {
        setPlayers({player1: getCookie('player1'), player2: getCookie('player2')});
        setMoves(game.fen());

        document.addEventListener('mousemove', (e:any) => {
            if (e.target.id == 'body'){
                setMoveable({});
            }
        })
    }, []);


    useEffect(() => {
        if (moveablePlace == {}){
            setMoveable({});
        }

        if (listMoves.length > 0 && position != {}){
            let list:any = {};

            for (let i = 0; i < listMoves.length; i++){
                if (listMoves[i].length > 2){
                    let format = listMoves[i].slice(-2);
                    list[format] = {
                        background: "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                        borderRadius: "50%"
                    };
                }

                else{
                    list[listMoves[i]] = {
                        background: "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                        borderRadius: "50%"
                    };
                }
            }

            setMoveable(list);
        }
    }, [listMoves, position]);



    let hovering = (move:any) => {
        if (currentPlace == '' && game.moves({square: move}).length > 0){
            setListMoves([move, ...game.moves({square: move})]);
            setCurrent(move);
        }

        else {
            if (game.moves({square: move}).length > 0 && currentPlace == move){
                setListMoves([move, ...game.moves({square: move})]);
                setCurrent(move);
            }

            else{
                setCurrent(move);
                setMoveable({});
            }
        }
    }


    let clicked = (move:any) => {
        let listLegalMoves = game.moves({square: move.sourceSquare});

        if (listLegalMoves.length > 0){
            for (let i of listLegalMoves){
                if (move.targetSquare == move.sourceSquare){
                    break;
                }

                if (i.includes(move.targetSquare)){
                    game.move({
                        from: move.sourceSquare,
                        to: move.targetSquare,
                        promotion: 'q'
                    });
        
                    setMoves(game.fen());
                    setListMoves([]);
                    setMsg('');
                    setColor(color == 'white' ? 'black' : 'white');
                    break;
                }

                else{
                    setMsg('invalid moves');
                    setTimeout(() => setMsg(''), 1000);
                }
            }
        }

        else{
            setMsg('invalid moves');
            setTimeout(() => setMsg(''), 1000);
        }
    }


    return (
        <div className={styles.body} id="body">
            <h2>{players.player2}</h2>
            <Chessboard position={moves} width={400} 
            onMouseOverSquare={(move:any) => hovering(move)}
            onDrop={(move:any) => clicked(move)} 
            getPosition={position => setPosition(position)} 
            squareStyles={moveablePlace}/>
            <h2>{players.player1}</h2>
            <p>{msg}</p>
        </div>
    )
}
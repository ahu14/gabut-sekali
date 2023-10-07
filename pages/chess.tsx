import {Chess} from "chess.js";
import Chessboard from "chessboardjsx";
import {getCookie} from "../lib/cookie.js";
import styles from "../styles/Home.module.css";
import {useEffect, useState} from "react";


export default function ChessGame(){
    let [players, setPlayers] = useState<{player1: string, player2:string}>({
        player1: '',
        player2: ''
    });

    let [gameData, setGameData] = useState<any>([]);
    let [game, setGame] = useState<any>(new Chess());
    let [listMoves, setListMoves] = useState<any>([]);
    let [position, setPosition] = useState<object>({});
    let [moveablePlace, setMoveable] = useState<object>({});
    let [currentPlace, setCurrent] = useState<string>('');

    let [msg, setMsg] = useState<string>('');
    let [color, setColor] = useState<string>(game.turn());


    useEffect(() => {
        if (typeof window != undefined){
            setPlayers({player1: getCookie('player1'), player2: getCookie('player2')});

            document.addEventListener('mousemove', (e:any) => {
                if (e.target.id == 'body'){
                    setMoveable({});
                }
            })
        }
    }, []);

    useEffect(() => {
        if (msg != '' && msg != 'invalid moves'){
            let data2 = {
                player1: players.player1,
                player2: players.player2,
                status: msg,
                chess: gameData
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
            .then(msg => console.log(msg));
        }
    }, [msg]);


    useEffect(() => {
        setGameData([...gameData, game.fen()]);

        if (game.isCheckmate()){
            setMsg(`${color == 'b' ? getCookie('player2') : getCookie('player1')} got checkmated`);
        }

        if (game.isDraw()){
            setMsg('ooo it\'s draw');
        }

        if (game.isStalemate()){
            setMsg(`${color == 'b' ? getCookie('player2') : getCookie('player1')} got stalemated. so it\'s draw.`);
        }

        if (game.isThreefoldRepetition()){
            setMsg('cannot three fold repetition yeah. so it\'s draw.');
        }
    }, [game.fen()]);


    useEffect(() => {
        if (moveablePlace == {}){
            setMoveable({});
        }

        if (listMoves.length > 0 && position != {}){
            let list:any = {};

            for (let i = 0; i < listMoves.length; i++){
                if (listMoves[i].length > 2){
                    let numFormat = listMoves[i].search(/[0-9]/g);
                    let strFormat = numFormat - 1;
                    let format = `${listMoves[i][strFormat]}${listMoves[i][numFormat]}`;

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
        
                    setListMoves([]);
                    setColor(game.turn());
                    setMsg('');
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
            <p>Now it's {color} turn</p>
            <h2>{players.player2}</h2>
            <Chessboard id="play-chess" position={game.fen()} width={400} 
            onMouseOverSquare={(move:any) => hovering(move)}
            onDrop={(move:any) => clicked(move)} 
            getPosition={position => setPosition(position)} 
            squareStyles={moveablePlace}/>
            <h2>{players.player1}</h2>
            <h2>{msg}</h2>
        </div>
    )
}
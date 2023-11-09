import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Index.module.css";
import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";


export default function IndexHome({page, setPage}:any){
    let [game, setGame] = useState<any>(new Chess());
    let [pos, setPos] = useState<any>(game.fen());
    let [move, setMove] = useState<boolean>(true);


    useEffect(() => {
        setTimeout(() => {
            if (move == false){
                if (game.isGameOver() || game.isDraw()){
                    setGame(new Chess());
                    setPos(game.fen());
                    setMove(false);
                 }

                else{
                    let moves = game.moves();
                    let move2 = moves[Math.floor(Math.random() * moves.length)];
        
                    game.move(move2);
                    setPos(game.fen());
                    setMove(true);
                }
            }
    
            else{
                setMove(false);
            }
        }, 1000);
    }, [move]);

    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <h3 id={styles.title}>Chess.com Rip Off</h3>

                <Image src="/images/about-white.png" alt="about" id={styles.about} 
                width={40} height={40} onClick={() => setPage('about')}/>
            </div>

            <div className={styles.leftPart}>
                <div className={styles.wrapper}>
                    <Chessboard position={pos} boardWidth={450} arePiecesDraggable={false}/>
                </div>
            </div>

            <div className={styles.rightPart}>
                <div className={styles.buttonWrap}>
                    <button className={styles.button} onClick={() => setPage('input-username')}>Play (u vs ur friend)</button>
                    <button className={styles.button} onClick={() => setPage('choose-difficulty')}>Vs Ai</button>

                    <Link href="/history">
                        <button className={styles.button}>Board</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
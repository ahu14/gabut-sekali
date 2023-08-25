import { useRouter } from "next/router";
import { getCookie, setCookie } from "../lib/cookie.js";
import { useEffect, Suspense } from "react";

import ChessBoard from "../public/Child.js";
import Template from "@/lib/template.js";
import styles from "../styles/Home.module.css";


export default function ChessTemplate(){
    let chess = new ChessBoard();
    let router = useRouter();

    let start = (e:any) => {
        e.target.remove();

        for (let i = 0; i < 8; i++){
            chess.addItem('./black_pawn.png', i, 1, 'pawn');
            chess.addItem('./white_pawn.png', i, 6, 'pawn');
        }
        
        let automaticSummon = (data:any, y:number) => {
            for (let a = 0; a < 8; a++){
                let piece = data[a];
                let color = data[a].includes('black') ? 'black' : 'white';
                let getType = piece.replace(`${color}_`, '');
                chess.addItem(`./${piece}.png`, a, y, getType);
            }
        }
        
        let chessWhite = [
            'white_rook', 'white_knight', 'white_bishop', 'white_king', 
            'white_queen', 'white_bishop', 'white_knight', 'white_rook'
        ]
        
        let chessBlack = [
            'black_rook', 'black_knight', 'black_bishop', 'black_king', 
            'black_queen', 'black_bishop', 'black_knight', 'black_rook'
        ]
        
        automaticSummon(chessWhite, 7);
        automaticSummon(chessBlack, 0);
    }

    useEffect(() => {
        if (getCookie('player1') == '' || getCookie('player2') == ''){
            router.replace('/');
        }

        else{
            let names = document.querySelectorAll('#name');
            let data = [getCookie('player2'), getCookie('player1')]
            
            for (let i = 0; i < names.length; i++){
                names[i].innerHTML = data[i];
            }

            document.addEventListener('click', () => {
                if (chess.status != null){
                    let player1 = getCookie('player1');
                    let player2 = getCookie('player2');

                    let newChessArray = []

                    for (let i = 0; i < chess.chess_pos.length; i++){
                        newChessArray.push({data: chess.chess_pos[i]});
                    }

                    let data2 = {
                        player1: player1,
                        player2: player2,
                        status: chess.status,
                        chess: newChessArray
                    }

                    let JSONdata = JSON.stringify(data2);

                    let endPoint = '/api/save';
                    let options = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSONdata
                    }

                    let result:any;
                    fetch(endPoint, options)
                    .then(res => result = res.json())
                    .then(data => {
                        chess.status = null;

                        if (data.msg != undefined){
                            router.push('/');
                        }
                    });
                }
            })
        }
    }, [chess]);

    return (
        <Template>
            <script type="module" src="./Child.js" async />

            <Suspense fallback={<h2>Reloading chess...</h2>}>
                <h3 id="name"></h3>

                <div id="chess-box" className={styles.chessBox}>
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                        
                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="black-box" className={styles.blackBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>

                        <div id="white-box" className={styles.whiteBox}>
                            <div id="circle" className={styles.circle}></div>
                        </div>
                    </div>
                </div>

                <h3 id="name"></h3>
                <button onClick={start} className={styles.btnPlay}>Summon Chess Piece</button>
            </Suspense>
        </Template>
    )
}
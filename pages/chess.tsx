import { useRouter } from "next/router";
import { getCookie } from "../lib/cookie.js";
import { useEffect, useState } from "react";

import Chess from "../public/Child.js";
import Template from "@/lib/template.js";
import styles from "../styles/Home.module.css";


export default function ChessTemplate(){
    let chess = new Chess();
    let router = useRouter();

    let start = (e:any) => {
        e.target.remove();

        for (let i = 0; i < 8; i++){
            chess.addItem('./black_anak.jpg', i, 1, 'anak');
            chess.addItem('./white_anak.jpg', i, 6, 'anak');
        }
        
        let automaticSummon = (data:any, y:number) => {
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
        automaticSummon(chessBlack, 0);
    }

    /*let lose = async () => {
        let player1 = getCookie('player1');
        let player2 = getCookie('player2');

        let newChessArray = []

        for (let i = 0; i < chess.chess_pos.length; i++){
            newChessArray.push({data: chess.chess_pos[i]});
        }

        let data = {
            player1: player1,
            player2: player2,
            chess: {chess: newChessArray}
        }

        let JSONdata = JSON.stringify(data);
        let endPoint = '/api/save';
        let options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSONdata
        }

        let res = await fetch(endPoint, options);
        let result = await res.json();

        if (result.msg){
            router.push('/')
        }
    }*/

    useEffect(() => {
        if (getCookie('player1') == '' || getCookie('player2') == ''){
            router.replace('/');
        }

        else{
            let names = document.querySelectorAll('#name');
            let data = [getCookie('player1'), getCookie('player2')]
            
            for (let i = 0; i < names.length; i++){
                names[i].innerHTML = data[i];
            }
        }
    }, []);

    return (
        <Template>
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
        </Template>
    )
}
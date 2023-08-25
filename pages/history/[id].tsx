import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/db";
import styles from "@/styles/Home.module.css";
import { Suspense, useRef } from "react";
import Template from "@/lib/template.js";
import Link from "next/link";


export async function getServerSideProps(context:any){
    let id = context.params.id;
    let allData = await getDocs(collection(db, 'history'));

    let data:any = []; 

    allData.forEach(d => {
        if (d.id == id){
            data.push({
                player1: d.data().player1,
                player2: d.data().player2,
                chess: JSON.stringify(d.data().chess),
                status: d.data().status
            });
        }
    })

    return {props: {data}}
}

export default function Data({data}:any){
    let chessbox:any = useRef();

    let summonLastPos = (e:any) => {
        let data2:any = JSON.parse(data[0].chess);
        let chess_row = document.querySelectorAll('#chess-row');
        
        for (let i = 0; i < data2.length; i++){
            for (let a = 0; a < data2[i].data.length; a++){
                let item = data2[i].data[a];

                if (typeof item != 'number'){
                    let pawnData = item.split('-');

                    let img = document.createElement('img');
                    img.style.width = '6.3vh';
                    img.style.height = '6.3vh';
                    img.style.position = 'relative';
                    img.style.mixBlendMode = 'darken';
                    img.src = `../images/${pawnData[1]}_${pawnData[0]}.png`;
                    chess_row[i].children[a].appendChild(img);
                }
            }
        }

        e.target.remove();
    }


    return (
        <Suspense fallback={<h2>Reloading Chess Position...</h2>}>
            <div className={styles.body}>
                <div className={styles.topData}>
                    <h3><b><Link href="/history">Go back</Link></b></h3>
                    <button onClick={summonLastPos} 
                    className={styles.btnDisplay}>Summon Chess Last Position</button>
                    <h3 id="name">{data[0].player1}</h3>
                </div>

                <div id="chess-box" className={styles.chessBox} ref={chessbox}>
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                    </div>

                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                    </div>

                    <div id="chess-row" className={styles.chessRow}>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                    </div>
                    
                    <div id="chess-row" className={styles.chessRow}>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                        <div id="black-box" className={styles.blackBox}></div>
                        <div id="white-box" className={styles.whiteBox}></div>
                    </div>
                </div>
                
                <div className={styles.bottomData}>
                    <h3 id="name">{data[0].player2}</h3>
                    <p>{data[0].player1} vs {data[0].player2}</p>
                    <p>{data[0].status}</p>
                </div>
            </div>
        </Suspense>
    )
}
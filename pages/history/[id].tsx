import { getDocs, collection } from "firebase/firestore";
import { Chessboard } from "react-chessboard";
import { db } from "@/lib/db";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { setDateFormat } from "@/lib/getDate";
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
                chess: JSON.parse(JSON.stringify(d.data().chess)),
                status: d.data().status,
                date: JSON.stringify(d.data().date)
            });
        }
    })

    return {props: {data}}
}


export default function Data({data}:any){
    let [index, setIndex] = useState<number>(0);
    let [chess, setChess] = useState<any>();
    let [current, setCurrent] = useState<any>();

    useEffect(() => {
        let item = [];

        for (let i of data[0].chess){
            item.push(i);
        }

        setChess(item);
    }, []);

    useEffect(() => {
        if (chess != undefined){
            setCurrent(chess[index]);
        }
    }, [chess]);


    let prevMove = () => {
        setIndex(index < 1 ? index : index -= 1);
        setCurrent(chess[index]);
    }

    let nextMove = () => {
        setIndex(index >= chess.length - 1 ? index : index += 1);
        setCurrent(chess[index]);
    }


    return (
        <div className={styles.historyDisplay}>
            <div className={styles.bottomData}>
                <h3><Link href="/history">Go back</Link></h3>
                <h3 id="name">{data[0].player2}</h3>

                <div className={styles.wrapper}>
                    {current != undefined 
                        ? <Chessboard id="preview-board" boardWidth={350}
                        arePiecesDraggable={false} position={current} />
                        : ''}
                </div>

                <h3 id="name">{data[0].player1}</h3>
                <p>{data[0].player1} vs {data[0].player2}</p>
                <p>{data[0].status}</p>
                <p>{setDateFormat(data[0].date)}</p>

                <button onClick={nextMove} className={styles.rightButton}>&#8594;</button>
                <button onClick={prevMove} className={styles.leftButton}>&#8592;</button>
            </div>
        </div>
    )
}
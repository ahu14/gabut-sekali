import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/db";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Chessboard from "chessboardjsx";
import { useEffect, useState } from "react";
import { setDateFormat } from "@/lib/getDate";


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

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div className={styles.bottomData}>
                <h3 id="name">{data[0].player2}</h3>
                <h3 id="name">{data[0].player1}</h3>
                <Chessboard id="haha" />
                <p>{data[0].player1} vs {data[0].player2}</p>
                <p>{data[0].status}</p>
                <p>{setDateFormat(data[0].date)}</p>
            </div>
        </div>
    )
}
import {db} from "../lib/db";
import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import styles from "@/styles/Home.module.css";
import { Suspense } from "react";


export async function getServerSideProps(){
    let docs = await getDocs(collection(db, 'history'));
    let data:any[] = [];

    docs.forEach(d => {
        data.push({
            id: d.id,
            player1: d.data().player1,
            player2: d.data().player2
        });
    })

    return {props: {data}}
}


export default function Data({data}:any){
    return (
        <Suspense fallback={<h2>Loading data...</h2>}>
            <div className={styles.historyBox}>
                <h2>History Match List</h2>

                <div className={styles.scroller}>
                    {data.map((d:any) => (
                        <div className={styles.playerData} key={d.id}>
                            <h2>{d.player1} VS {d.player2}</h2>
                            <b><Link href={'/history/' + d.id}>See Position</Link></b>
                        </div>
                    ))}
                </div>

                <b><Link href="/" id={styles.link}>Back to Home Page</Link></b>
            </div>
        </Suspense>
    )
}
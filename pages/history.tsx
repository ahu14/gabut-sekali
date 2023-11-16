import {db} from "@/lib/db";
import Link from "next/link";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import styles from "@/styles/History.module.css";
import { setDate } from "@/lib/getDate";


export async function getServerSideProps(){
    let allData = await getDocs(query(collection(db, 'history'), orderBy('date')));
    let data: any[] = [];
    let allData2 = allData.docs.reverse();

    allData2.map((d:any) => {
        data.push({
            id: d.id,
            player1: d.data().player1,
            player2: d.data().player2,
            date: d.data().date.seconds
        })
    })

    return {props: {data}}
}


export default function Data({data}:any){
    return (
        <div className={styles.historyBox}>
            <h2>History Match List</h2>

            <div className={styles.scroller}>
                {data.map((d:any) => (
                    <div className={styles.playerData} key={d.id}>
                        <h2 id={styles.playerTitle}>{d.player1} VS {d.player2}</h2>
                        <p>{setDate(d.date)}</p>
                        <b><Link href={'/history/' + d.id}>See Position</Link></b>
                    </div>
                ))}
            </div>

            <b><Link href="/" id={styles.link}>Back to Home Page</Link></b>
        </div>
    )
}
import {db} from "../lib/db";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { collection, getDocs } from "firebase/firestore";


export async function getStaticProps(){
    let docs = await getDocs(collection(db, "identity"));
    let data:any[] = []
    
    docs.forEach(doc => data.push(doc.data().name))
    return {props: {data}}
}


export default function Home({data}:any){
    return (
        <ul className={styles.list}>
            {data.map((d:any) => (
                <li id={styles.childList} key={d}>
                    <Link href={`/${d}`}>{d}</Link>
                </li>
            ))}
        </ul>
    )
}
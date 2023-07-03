import {db} from "../lib/db";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";


export async function getServerSideProps(){
    let docs = await getDocs(collection(db, "identity"));
    let data:any[] = []

    docs.forEach(doc => {
        data.push({
            id: doc.id,
            name: doc.data().name
        })
    })

    return {props: {data}}
}


export default function Home({data}:any){
    return (
        <>
            <ul className={styles.list}>
                {data.map((d:any) => (
                    <li id={styles.childList} key={d.id}>
                        <Link href={`/${d.id}`}>{d.name}</Link>&nbsp;
                        <Link href={`/edit/${d.id}`}>edit</Link>&nbsp;
                        <Link href={`/api/delete/${d.id}`}>delete</Link>
                    </li>
                ))}
            </ul>

            <Link href="/add">Add data</Link>
        </>
    )
}
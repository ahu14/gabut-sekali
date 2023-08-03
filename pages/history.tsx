import {db} from "../lib/db";
import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";


export async function getServerSideProps(){
    let docs = await getDocs(collection(db, 'history'));
    let data:any[] = [];

    docs.forEach(d => {
        data.push({
            player1: d.data().player1,
            player2: d.data().player2,
            chess : d.data().chess
        });
    })

    return {props: {data}}
}


export default function Data({data}:any){
    console.log(data);

    /*return (
        <>
            {data.map((d:any) => (
                <>
                    <h2>{d.player1} VS {d.player2}</h2>
                </>
            ))}

            <Link href="/">Go back</Link>
        </>
    )*/
    return <h2>HAHA</h2>
}
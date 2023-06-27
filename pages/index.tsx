import {db} from "../lib/db";
import Layout from "../lib/layout.js";
import { doc, getDoc } from "firebase/firestore";

export async function getStaticProps(){
    let docRef = doc(db, "identity", "identity");
    let getData = await getDoc(docRef);
    let data = JSON.parse(JSON.stringify(getData.data()));
    return {props: {data}}
}

export default function Home({data}:any){
    return (
        <Layout>
            <h2>{data.name}</h2>
            <p>{data.age}</p>
            <p>{data.hobby}</p>
        </Layout>
    )
}
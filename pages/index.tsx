import {db} from "../lib/db";
import { doc, getDoc } from "firebase/firestore";

export let getStaticProps = async () => {
    let docRef = doc(db, "identity", "identity");
    let getData = await getDoc(docRef);
    let data = JSON.parse(JSON.stringify(getData.data()));
    return {props: {data}}
}

export default function Home({data}){
    return (
        <>
            <h2>{data.name}</h2>
            <p>{data.age}</p>
            <p>{data.hobby}</p>
        </>
    )
}
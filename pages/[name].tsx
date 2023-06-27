import {db} from "../lib/db";
import Link from "next/link";
import {collection, getDocs} from "firebase/firestore";

export async function getStaticPaths(){
    let data = await getDocs(collection(db, 'identity'));

    let paths:any[] = [];
    data.forEach((d:any) => paths.push({params: {name: d.data().name}}))
    return {paths, fallback: false}
}

export async function getStaticProps({params}:any){
    let allData = await getDocs(collection(db, 'identity'));
    
    let data;
    allData.forEach((d:any) => {
        if (d.data().name == params.name){
            data = d.data();
        }
    });
    
    return {props: {data}}
}


export default function Data({data}:any){
    return (
        <>
            <h2>{data.name}</h2>
            <p>{data.age}</p>
            <p>{data.hobby}</p>
            <Link href="/">Go back</Link>
        </>
    )
}
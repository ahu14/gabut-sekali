import {db} from "../lib/db";
import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";


export async function getStaticPaths(){
    let data = await getDocs(collection(db, 'identity'));
    let paths:any[] = [];
    data.forEach((d:any) => paths.push({params: {id: d.id}}));

    return {paths, fallback: true};
}


export async function getStaticProps({params}:any){
    let allData = await getDocs(collection(db, 'identity'));
    
    let data;
    allData.forEach((d:any) => {
        if (d.id == params.id){
            data = d.data();
        }
    });
    
    return {props: {data}}
}


export default function Data({data}:any){
    let router = useRouter();

    if (router.isFallback){
        return <h2>Loading...</h2>
    }

    else{
        return (
            <>
                <h2>{data.name}</h2>
                <p>{data.age}</p>
                <p>{data.hobby}</p>
                <Link href="/">Go back</Link>
            </>
        )
    }
}
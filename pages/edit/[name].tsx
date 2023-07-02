import styles from "../../styles/Home.module.css";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "@/lib/db";
import Link from "next/link";


export async function getStaticPaths(){
    let datas = await getDocs(collection(db, 'identity'));
    let paths:any[] = [];

    datas.forEach(data => paths.push({params: {name: data.data().name}}))
    return {paths, fallback: false}
}


export async function getStaticProps({params}:any){
    let datas = await getDocs(collection(db, 'identity'));
    let data;
    
    datas.forEach((d:any) => {
        if (d.data().name == params.name){
            data = {
                id: d.id,
                data: d.data()
            }
        }
    })

    return {props: {data}};
}


export default function Edit({data}:any){
    let router = useRouter();

    let submitted = async (e:any) => {
        e.preventDefault();

        let id = e.target.id;
        let name = e.target.name.value;
        let age = parseInt(e.target.age.value);
        let hobby = e.target.hobby.value;

        let data = {
            id: id,
            name: name,
            age: age,
            hobby: hobby
        }

        let JSONdata = JSON.stringify(data);

        let endPoint = '/api/saveedit';
        let options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSONdata
        }

        let res = await fetch(endPoint, options);
        let result = await res.json();
        
        if (result.msg){
            router.push('/');
        }
    }

    return(
        <form className={styles.dataForm} onSubmit={submitted} id={data.id}>
            <Link href="/">Go back</Link>

            <label id={styles.labelInput} htmlFor="name">Name</label>
            <input className={styles.input} id="name" 
            name="name" defaultValue={data.data.name}/>

            <label id={styles.labelInput} htmlFor="age">Age</label>
            <input className={styles.input} type="number" 
            id="age" name="age" defaultValue={data.data.age}/>

            <label id={styles.labelInput} htmlFor="hobby">Hobby</label>
            <textarea id="hobby" name="hobby" defaultValue={data.data.hobby}
            className={styles.textarea} style={{resize: 'none'}} />

            <button className={styles.btn}>Save editted data !</button>
        </form>
    )
}
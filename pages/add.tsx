import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";


export default function Add(){
    let router = useRouter();
    let checkBlank = (value:any) => value != '';

    let submitted = async (e:any) => {
        e.preventDefault();
        let name = e.target.name.value;
        let age = e.target.age.value;
        let hobby =  e.target.hobby.value;

        if (checkBlank(name) && checkBlank(age) && checkBlank(hobby)){
            let data = {
                name: name,
                age: parseInt(age),
                hobby: hobby
            }
    
            let JSONdata = JSON.stringify(data);
            let endPoint = '/api/save';
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
    }

    return(
        <form className={styles.dataForm} onSubmit={submitted}>
            <Link href="/">Go back</Link>

            <label id={styles.labelInput} htmlFor="name">Name</label>
            <input className={styles.input} id="name" name="name" />

            <label id={styles.labelInput} htmlFor="age">Age</label>
            <input className={styles.input} type="number" id="age" name="age" />

            <label id={styles.labelInput} htmlFor="hobby">Hobby</label>
            <textarea id="hobby" name="hobby"
            className={styles.textarea} style={{resize: 'none'}}/>

            <button className={styles.btn}>Submit data !</button>
        </form>
    )
}
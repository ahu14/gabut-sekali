import styles from "@/styles/Input.module.css";
import Router from "next/router";
import { setCookie } from "@/lib/cookie";


export default function Difficulty(){
    let submit = (e:any) => {
        e.preventDefault();

        let target = e.target;
        let msg:any = document.querySelector('#msg');

        if (target.mode.value != '' && target.playtype.value != ''){
            setCookie('difficulty', target.mode.value);
            setCookie('playAs', target.playtype.value);
            setCookie('vsWho', 'ai');

            Router.push('/chess');
        }

        else{
            if (target.mode.value == ''){
                msg.innerHTML = 'difficulty is blank';
            }

            else{
                msg.innerHTML = 'playtype is blank';
            }
        }
    }

    return (
        <div className={styles.inputBody}>
            <form className={styles.formBox} onSubmit={submit}>
                <h2>Choose difficulty :</h2>

                <ul className={styles.radioWrapper}>
                    <li>
                        <label htmlFor="easy">
                            <input type="radio" id="easy" name="mode" value="easy" className={styles.radioButton} />
                            <span id={styles.radioLabel}>Easy</span>
                        </label>
                    </li>
                    
                    <li>
                        <label htmlFor="medium">
                            <input type="radio" id="medium" name="mode" value="medium" className={styles.radioButton} />
                            <span id={styles.radioLabel}>Medium</span>
                        </label>
                    </li>
                
                    <li>
                        <label htmlFor="hard">
                            <input type="radio" id="hard" name="mode" value="hard" className={styles.radioButton} />
                            <span id={styles.radioLabel}>Hard</span>
                        </label>
                    </li>
                </ul>


                <h2>Play as white or black ?</h2>

                <ul className={styles.radioWrapper}>
                    <li>
                        <label htmlFor="white">
                            <input type="radio" id="white" name="playtype" value="white" className={styles.radioButton} />
                            <span id={styles.radioLabel}>White</span>
                        </label>
                    </li>

                    <li>
                        <label htmlFor="black">
                            <input type="radio" id="black" name="playtype" value="black" className={styles.radioButton} />
                            <span id={styles.radioLabel}>Black</span>
                        </label>
                    </li>
                </ul>

                <button type="submit" className={styles.submitBtn}>Submit</button>

                <h2 id="msg"></h2>
            </form>
        </div>
    )
}
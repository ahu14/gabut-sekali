import styles from "@/styles/Input.module.css";
import {setCookie} from "@/lib/cookie.js";
import Router from "next/router";


export default function Form(){
    let submitData = (e:any) => {
        e.preventDefault();

        let err;
        let checkIfBlank = (target:string) => {
            target == '' 
                ? err = "There's still blank"
                : err = "Don't include space in player's name"

            return target == '' || target.includes(' ');
        }

        let player1 = e.target.player1.value;
        let player2 = e.target.player2.value;

        if (checkIfBlank(player1) == false && checkIfBlank(player2) == false){
            setCookie('player1', player1);
            setCookie('player2', player2);
            setCookie('vsWho', 'friend');
            Router.push('/chess');
        }

        else{
            e.target.children.errorMsg.innerHTML = err;
        }
    }

    return(
        <div className={styles.inputBody}>
            <form onSubmit={submitData} className={styles.formBox}>
                <h4>Black</h4>
                <input className={styles.inputBox} id="player2" name="player2" placeholder="Player 2"/>
                <h2 id={styles.font}>VS</h2>
                <h4>White</h4>
                <input className={styles.inputBox} id="player1" name="player1" placeholder="Player 1"/>
                <button type="submit" className={styles.submitBtn}>Submit</button>
                <p id="errorMsg"></p>
            </form>
        </div>
    )
}
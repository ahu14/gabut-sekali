import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function About(){
    return(
        <div className={styles.about}>
            <b><Link href="/">Back to Home</Link></b>

            <h3>I try to make a chess game copy paste from <Link href="https://chess.com">Chess.com</Link></h3>
            <h3>Game made by <Link href="https://github.com/ahu14">me</Link></h3>
            <p>Sorry <b><Link href="https://chess.com">Chess.com</Link></b>, I make a copy paste from your game</p>
            <p>I couldn&apos;t make it as good as yours</p>
        </div>
    )
}
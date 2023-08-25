import Template from "@/lib/template.js";
import Link from "next/link";
import styles from "@/styles/Home.module.css";


export default function Home(){
    return (
        <Template>
            <h2>Chess.com Rip Off</h2>

            <Link href="/game" id={styles.linkButton}>
                <button className={styles.homeButton}>Play (u vs ur friend)</button>
            </Link>

            <Link href="/history" id={styles.linkButton}>
                <button className={styles.homeButton}>Board</button>
            </Link>

            <Link href="/about" id={styles.linkButton}>
                <button className={styles.homeButton}>About</button>
            </Link>
        </Template>
    )
}
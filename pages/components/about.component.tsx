import Link from "next/link";
import styles from "@/styles/About.module.css";
import Image from "next/image";

export default function About({page, setPage}:any){
    return(
        <div className={styles.about}>
            <div className={styles.headerAbout}>
                <Image src="/images/back-white.png" alt="back-image" width={40} height={40} 
                className={styles.image} onClick={() => setPage('home')}/>

                <h2 id={styles.title}>About</h2>
            </div>

            <div className={styles.bodyAbout}>
                <h3>I try to make a chess game copy paste from <Link href="https://chess.com">Chess.com</Link></h3>
                <h3>Game made by <Link href="https://github.com/ahu14">me</Link></h3>
                <p>Sorry <b><Link href="https://chess.com">Chess.com</Link></b>, I make a copy paste from your game</p>
                <p>I couldn&apos;t make it as good as yours</p>
                <p>I wanna credit my friend Cyra for helping me design a color pallete for my website</p>
            </div>
        </div>
    )
}
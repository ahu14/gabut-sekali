import styles from "../styles/Home.module.css";
import Head from "next/head";

export default function Template({children}){
    return(
        <>
            <Head>
                <script type="module" src="./Child.js"></script>
                <script type="module" src="./Play.js"></script>
            </Head>

            <div className={styles.body}>
                {children}
            </div>
        </>
    )
}
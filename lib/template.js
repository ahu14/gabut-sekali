import styles from "../styles/Home.module.css";
import { Suspense } from "react";


export default function Template({children}){
    return(
        <>
            <Suspense fallback={<h2>Reload Page</h2>}>
                <div className={styles.body}>
                    {children}
                </div>
            </Suspense>
        </>
    )
}
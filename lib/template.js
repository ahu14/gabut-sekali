import styles from "../styles/Home.module.css";


export default function Template({children}){
    return(
        <>
            <div className={styles.body}>
                {children}
            </div>
        </>
    )
}
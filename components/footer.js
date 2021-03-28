import styles from '../styles/Footer.module.css'


export const Footer = () =>{
    return(
        <div className={styles.footer}>
            <p>
            Powered by <span className={styles.company}>FA Design</span>
            </p>
      </div>
    )
}
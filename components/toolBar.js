import {useRouter} from 'next/router'
import styles from '../styles/Toolbar.module.css'
import { Home, Twitter, GitHub, LogIn } from 'react-feather';

export const Toolbar = () =>{
    const router = useRouter();

    return(
        <div className={styles.main}>
            <div onClick={()=>router.push('/')}><Home size={30} /></div>
            <div onClick={()=> window.location.href= 'http://twitter.com/faiyazrafeek'}> <Twitter size={30}/> </div>
            <div onClick={()=> window.location.href= 'http://github.com/faiyazrafeek'}> <GitHub size={30}/> </div>
            <div onClick={()=> window.location.href= 'https://fablog.sanity.studio/'}> <LogIn size={30}/> </div>
        </div>
    )
}
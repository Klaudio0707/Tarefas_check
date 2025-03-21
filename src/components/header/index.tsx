import styles from './styles.module.css'
import Link from 'next/link'
export function Header() {
    return(
        <header className={styles.header}>
            <section className={styles.content}>
                <nav className={styles.nav}>
                    <Link href='/'>
                        <h1 className={styles.logo}>
                            <span className={styles.efect}>
                                Tarefas
                             </span>
                             <span>
                                +
                            </span>
                        </h1>
                    </Link>
                    <Link href='/dashboard' className={styles.painel}>
                                  Meu Painel
                          
                    </Link>
                </nav>
                <button className={styles.loginButton}>Acessar</button>
            </section>
        </header>
    )

}
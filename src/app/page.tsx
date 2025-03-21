import Link from 'next/link';
import styles from '../styles/home.module.css';
import Image from 'next/image';
import heroImg from '../../public/assets/hero.png'

export default function Home() {
  return (
    <div className={styles.container}>

     <main className={styles.main}>
      <div className={styles.logoContent}>
          <Image
          className={styles.hero} 
          src={heroImg}
           alt='logo tarefas'
           priority
           />
      </div>
        <h1 className={styles.title}>
          Sistema Feito para voce organizar <br/>
          seus estudos e tarefas
        </h1>
          <div className={styles.infoContent}>
            <section className={styles.box}>
               <span>+12 posts</span>
            </section>
            <section className={styles.box}>
               <span>+90 comentarios</span>
            </section>
          </div>

     </main>
    </div>
  );
}

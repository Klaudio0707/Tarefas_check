import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from './styles.module.css'
import Head from 'next/head'
import { Textarea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import {FaTrash} from "react-icons/fa"
export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    // Se o usuário não estiver logado, redireciona para a página de login
    if (!session) {
        redirect("/api/auth/signin");
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Painel de tarefas</title>
                <meta name="description" content="Dashboard do usuário" />
            </Head>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual a sua tarefa</h1>
                    <form>
                        <Textarea
                        placeholder="Digite qual sua tarefa..."
                        />
                        <div className={styles.checkboxArea}>
                            <input type="checkbox" className={styles.checkbox}/>
                            <label> Deixar tarefa publica?</label>
                        </div>
                        <button type="submit" className={styles.button}>
                            Registrar
                        </button>
                    </form>
                    </div>
                </section>
            <section className={styles.taskContainer}>
                <h1>Minhas Tarefas</h1>
                <article className={styles.task}>
                 <div className={styles.tagContainer}>
                  <label className={styles.tag}>Publico</label>
                  <button className={styles.shareButton}>
                    <FiShare2
                    size={22}
                    color="#3183ff"
                    scale={1}/>
                  </button>
                 </div>
                 <div className={styles.taskContent}>
                   <p>minha primeira tarefa</p>
                   <button className={styles.trashButton}>
                     <FaTrash size={24} scale={1} color="#ea3140"/>
                   </button>
                 </div>
                </article>
            </section>
            </main>
        </div>
    )
}

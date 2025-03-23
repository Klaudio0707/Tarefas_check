import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from './styles.module.css'
import Head from 'next/head'
import { Textarea } from "@/components/textarea";

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
                {/* <h1>Painel</h1>
                 <p>Bem-vindo, {session.user?.name}!</p>
                 <p>Email: {session.user?.email}</p> */}
            </main>
        </div>
    )
}

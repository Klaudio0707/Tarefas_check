import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from './styles.module.css'
import Head from 'next/head'

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    // Se o usuário não estiver logado, redireciona para a página de login
    if (!session) {
      redirect("/api/auth/signin");
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Pagina Painel</title>
                <meta name="description" content="Dashboard do usuário" />
            </Head>
            <main className={styles.main}>

                 <h1>Painel</h1>
                 <p>Bem-vindo, {session.user?.name}!</p>
                 <p>Email: {session.user?.email}</p>
            </main>
        </div>
    )
}

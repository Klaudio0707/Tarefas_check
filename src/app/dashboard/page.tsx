"use client";
import { redirect } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from './styles.module.css'
import Head from 'next/head'
import { Textarea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa"
export default function Dashboard() {
    const { data: session } = useSession();
    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    const [publicTask, setPublicTask] = useState(false);
    const [input, setInput] = useState("");


    useEffect(() => {
        if (session === undefined) {
            return;
        }
        if (!session) {
           redirect('/');
        } else {
            setIsSessionLoaded(true);
        }

    }, [session]);
    if (!isSessionLoaded) {
        return <p>Carregando...</p>;

    }
    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked);
        console.log(event.target.checked);
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
                                value={input}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                    setInput(event.target.value)} />
                            <div className={styles.checkboxArea}>
                                <input type="checkbox"
                                    className={styles.checkbox}
                                    checked={publicTask}
                                    onChange={handleChangePublic}
                                />
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
                                    scale={1} />
                            </button>
                        </div>
                        <div className={styles.taskContent}>
                            <p>minha primeira tarefa</p>
                            <button className={styles.trashButton}>
                                <FaTrash size={24} scale={1} color="#ea3140" />
                            </button>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    )
}

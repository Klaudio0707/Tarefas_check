"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import styles from './styles.module.css';
import Head from 'next/head';
import { Textarea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { db } from "@/services/firebaseConnection";
import { addDoc, collection, query, orderBy, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Dashboard() {
    const { data: session } = useSession();
    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    const [publicTask, setPublicTask] = useState(false);
    const [input, setInput] = useState("");
    const [tarefas, setTarefas] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);  // Estado para controle de carregamento

    // Primeiramente, verifica se a sessão foi carregada
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

    // Caso a sessão ainda esteja carregando, exibe "Carregando..."
    if (session === undefined) {
        return <p>Carregando...</p>;
    }

    // Carregar as tarefas após a sessão ser carregada
    useEffect(() => {
        if (session && isSessionLoaded) {
            setLoading(true);  // Inicia o carregamento
            const tarefasRef = collection(db, "tarefas");
            const q = query(
                tarefasRef,
                orderBy("created", "desc"),
                where("email", "==", session?.user?.email)
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const tarefasList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTarefas(tarefasList);
                setLoading(false);  // Finaliza o carregamento
            });

            // Limpeza do listener do Firestore
            return () => unsubscribe();
        }
    }, [session, isSessionLoaded]);

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked);
    }

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();
        if (input === "") return;

        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: input,
                created: new Date(),
                user: session?.user?.name,
                email: session?.user?.email,
                public: publicTask,
            });
            setInput(""); // Limpa o campo após registrar a tarefa
            setPublicTask(false); // Reseta o checkbox
        } catch (error) {
            console.error("Erro ao registrar a tarefa:", error);
        }
    }

    async function handleDeleteTask(id: string) {
        try {
            const taskRef = doc(db, "tarefas", id);
            await deleteDoc(taskRef);  // Exclui a tarefa do Firestore
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
        }
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
                        <form onSubmit={handleRegisterTask}>
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
                    {loading ? (
                        <p>Carregando suas tarefas...</p>
                    ) : tarefas.length > 0 ? (
                        tarefas.map((tarefa) => (
                            <article className={styles.task} key={tarefa.id}>
                                <div className={styles.tagContainer}>
                                    {tarefa.public && <label className={styles.tag}>Público</label>}
                                    <button className={styles.shareButton}>
                                        <FiShare2
                                            size={22}
                                            color="#3183ff"
                                            scale={1} />
                                    </button>
                                </div>
                                <div className={styles.taskContent}>
                                    <p>{tarefa.tarefa}</p>
                                    <button 
                                        className={styles.trashButton} 
                                        onClick={() => handleDeleteTask(tarefa.id)}>
                                        <FaTrash size={24} scale={1} color="#ea3140" />
                                    </button>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p>Você ainda não possui tarefas.</p>
                    )}
                </section>
            </main>
        </div>
    );
}

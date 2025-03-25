"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Textarea } from "../../components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";

import { db } from "../../services/firebaseConnection";
import { addDoc, collection, getDocs } from "firebase/firestore";

interface TaskProps {
    id: string;
    created: Date;
    public: boolean;
    tarefa: string;
    user: string;
}

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [input, setInput] = useState("");
    const [publicTask, setPublicTask] = useState(false);
    const [tasks, setTasks] = useState<TaskProps[]>([]);

    // Carregar tarefas do Firebase
    useEffect(() => {
        async function loadTasks() {
            const querySnapshot = await getDocs(collection(db, "tarefas"));
            const taskList: TaskProps[] = [];
            querySnapshot.forEach((doc) => {
                taskList.push({ id: doc.id, ...doc.data() } as TaskProps);
            });
            setTasks(taskList);
        }

        loadTasks();
    }, [tasks]);

    // Redirecionar para a página inicial se não estiver autenticado
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Carregando...</p>;
    }

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();

        if (input.trim() === "") {
            alert("Por favor, insira uma tarefa.");
            return;
        }

        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: input.trim(),
                created: new Date(),
                user: session?.user?.email || "Usuário desconhecido",
                public: publicTask,
            });

            setInput("");
            setPublicTask(false);
            alert("Tarefa registrada com sucesso!");
        } catch (err) {
            console.error("Erro ao registrar tarefa:", err);
            alert("Houve um problema ao registrar a tarefa.");
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual sua tarefa?</h1>
                        <form onSubmit={handleRegisterTask}>
                            <Textarea
                                placeholder="Digite qual sua tarefa..."
                                value={input}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                    setInput(event.target.value)
                                }
                            />
                            <div className={styles.checkboxArea}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={publicTask}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        setPublicTask(event.target.checked)
                                    }
                                />
                                <label>Deixar tarefa pública?</label>
                            </div>
                            <button className={styles.button} type="submit">
                                Registrar
                            </button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas tarefas</h1>
                    {tasks.map((task) => (
                        <article key={task.id} className={styles.task}>
                            <div className={styles.tagContainer}>
                                {task.public && (
                                    <label className={styles.tag}>PÚBLICO</label>
                                )}
                                <button className={styles.shareButton}>
                                    <FiShare2 size={22} color="#3183ff" />
                                </button>
                            </div>
                            <div className={styles.taskContent}>
                                <p>{task.tarefa}</p>
                                <button className={styles.trashButton}>
                                    <FaTrash size={24} color="#ea3140" />
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
}

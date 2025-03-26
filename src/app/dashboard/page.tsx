"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Textarea } from "../../components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";

import { db } from "../../services/firebaseConnection";
import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore";

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
    const [isLoading, setIsLoading] = useState(false);


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
        setIsLoading(true);
        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: input.trim(),
                created: new Date(),
                user: session?.user?.email || "Usuário desconhecido",
                public: publicTask,
            });

            setInput("");
            setPublicTask(false);
            console.log("Tarefa registrada com sucesso!");
        } catch (err) {
            console.error("Erro ao registrar tarefa:", err);
            alert("Houve um problema ao registrar a tarefa.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDeleteTask(id: string) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);

    }
    async function handleSharedTask(id: string) {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${id}`
        )
        alert("URL da tarefa copiada com sucesso!")
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
                            <button
                                type="submit"
                                className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <FiLoader size={24} className={styles["loading-spinner"]} />
                                ) : (
                                    'Registrar'
                                )}
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
                                {<button className={styles.shareButton} onClick={() => handleSharedTask(task.id)}>
                                    <FiShare2 size={22} color="#3183ff" />
                                </button>}
                            </div>
                            <div className={styles.taskContent}>
                                {task.public ? (
                                    <Link href={`/task/${task.id}`}>
                                        <p>{task.tarefa}</p>
                                    </Link>
                                ) : (
                                    <p>{task.tarefa}</p>
                                )}
                                <button className={styles.trashButton} onClick={() => handleDeleteTask(task.id)}>
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

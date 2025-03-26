import { Metadata } from "next";
import { db } from "../../../services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

interface TaskProps {
  id: string;
  tarefa: string;
  public: boolean;
  created: string;
}

export const metadata: Metadata = {
  title: "Detalhes da Tarefa",
};

async function getTask(id: string): Promise<TaskProps | null> {
  try {
    const docRef = doc(db, "tarefas", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as TaskProps;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    return null;
  }
}

export default async function TaskPage({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);

  if (!task) {
    return <p>Tarefa não encontrada.</p>;
  }

  return (
    <div>
      <h1>{task.tarefa}</h1>
      <p>Criada em: {new Date(task.created).toLocaleString()}</p>
      <p>Status: {task.public ? "Pública" : "Privada"}</p>
    </div>
  );
}

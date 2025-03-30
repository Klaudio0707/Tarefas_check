# Sistema de Cadastro de Tarefas

Este projeto é um sistema de cadastro de tarefas que permite aos usuários criar, listar, excluir e compartilhar tarefas. Algumas tarefas podem ser marcadas como públicas, permitindo que qualquer pessoa acesse os detalhes a partir de um link compartilhável.

O projeto utiliza as seguintes tecnologias:

- **Next.js**: Framework React para aplicações web modernas.
- **Firebase Firestore**: Banco de dados NoSQL para armazenamento das tarefas.
- **NextAuth**: Gerenciamento de autenticação do usuário.
- **CSS Modules**: Para estilização dos componentes.
- **Icons**: React Icons (FiShare2, FaTrash, FiLoader).

## Funcionalidades
- Cadastro de novas tarefas.
- Listagem de tarefas do usuário.
- Exclusão de tarefas.
- Compartilhamento de tarefas através de links públicos.

## Requisitos
Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 16 ou superior)
- **Git**
- **Firebase CLI** (para configurações do Firestore, opcional se não for usar localmente o Firebase).

## Como Configurar e Rodar o Projeto Localmente

### Passo 1: Clone o Repositório
Execute o seguinte comando no terminal para clonar o repositório:

```bash
git clone https://github.com/Klaudio0707/Tarefas_check
```

### Passo 2: Acesse o Diretório do Projeto

```bash
cd tarefas
```

### Passo 3: Instale as Dependências

Instale todas as dependências necessárias com o npm ou yarn:

```bash
npm install
# ou
yarn install
```

### Passo 4: Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Ative o Firestore Database no modo "Produção".
3. Ative o provedor de autenticação de sua escolha no Firebase Authentication (ex.: Google).
4. Baixe o arquivo `firebaseConfig` da sua aplicação.
5. Crie um arquivo `.env.local` no diretório raiz do projeto e insira suas credenciais do Firebase:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_URL=http://localhost:3000
```

### Passo 5: Rodando o Projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
.
├── src
│   ├── app
│   │   ├── page.tsx              # Página principal do projeto
│   │   ├── task/[id]/page.tsx    # Detalhes da tarefa
│   ├── components
│   │   ├── textarea.tsx         # Componente de textarea reutilizável
│   ├── services
│   │   ├── firebaseConnection.ts # Configuração do Firebase
│   ├── styles
│   │   ├── styles.module.css     # Estilos CSS Modules
├── public
│   ├── favicon.ico               # Ícone da aplicação
├── .env.local                    # Arquivo de variáveis de ambiente
├── README.md                     # Documentação do projeto
```

## Contribuição

Fique à vontade para fazer um fork deste repositório e enviar suas melhorias através de um pull request. Toda contribuição é bem-vinda!

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.



# To-Do App | Full-stack com .NET e React

## Sobre o Projeto

Este é um projeto full-stack de uma aplicação de lista de tarefas (To-Do), construído para demonstrar habilidades no desenvolvimento de uma API REST com **.NET 8** e um front-end reativo com **React**.

O projeto cobre todo o ciclo de desenvolvimento, desde a criação do banco de dados com Entity Framework Core até a interface de usuário interativa, incluindo a opção de ser executado em contêineres com Docker.

## Índice

-   [Funcionalidades](#funcionalidades)
-   [Tecnologias Utilizadas](#tecnologias-utilizadas)
-   [Como Começar](#como-começar)
-   [Executando com Docker](#executando-com-docker)
-   [Documentação da API](#documentação-da-api)

## Funcionalidades

-   **Criação de Tarefas**: Adicionar novas tarefas com título, descrição e status.
-   **Visualização**: Listar todas as tarefas cadastradas.
-   **Atualização**: Modificar tarefas existentes, seja o status, título ou descrição.
-   **Exclusão**: Remover tarefas da lista.

## Tecnologias Utilizadas

-   **Backend**:
    -   .NET 8
    -   ASP.NET Core Web API
    -   Entity Framework Core
    -   SQLite
-   **Frontend**:
    -   React
    -   Vite
    -   Node.js
-   **Containerização**:
    -   Docker
    -   Docker Compose

## Como Começar

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

-   [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
-   [Node.js](https://nodejs.org/) (versão LTS recomendada)
-   Git

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/cauesooouza/teste-tecnico-newm.git
    cd teste-tecnico-newm
    ```
    *(Caso não tenha experiência com Git, [clique aqui para baixar o projeto como arquivo ZIP](https://github.com/cauesooouza/teste-tecnico-newm/archive/refs/heads/master.zip))*

2.  **Configure o Backend:**
    ```sh
    # Navegue para a pasta do backend
    cd Backend

    # Restaura as dependências do projeto
    dotnet restore

    # Instala a ferramenta de linha de comando do Entity Framework
    dotnet tool install --global dotnet-ef

    # Aplica as migrações para criar e configurar o banco de dados
    dotnet ef database update
    ```

3.  **Configure o Frontend:**
    ```sh
    # Volte para a raiz e navegue para a pasta do frontend
    cd ../Frontend

    # Instala as dependências
    npm install
    ```

### Executando a Aplicação

Você precisará de dois terminais abertos para executar o backend e o frontend simultaneamente.

-   **Terminal 1: Iniciar o Backend**
    ```sh
    cd Backend
    dotnet run
    ```
    A API estará disponível e documentada via Swagger em: `http://localhost:5055/swagger/index.html`

-   **Terminal 2: Iniciar o Frontend**
    ```sh
    cd Frontend
    npm run dev
    ```
    A aplicação estará acessível em: `http://localhost:5173/`

## Executando com Docker

Se você possui Docker e Docker Compose instalados, pode construir e executar a aplicação de forma isolada com um único comando.

1.  Na pasta raiz do projeto, execute:
    ```sh
    docker-compose up --build -d
    ```
    O comando irá construir as imagens e iniciar os contêineres em modo `detached` (-d), liberando seu terminal.

2.  Acesse as seguintes URLs:
    -   **Frontend**: `http://localhost:3000/`
    -   **Backend (Swagger)**: `http://localhost:8080/swagger/index.html`

## Documentação da API

A API segue os padrões REST e possui os seguintes endpoints para manipulação de tarefas:

| Método | Endpoint                    | Descrição                                         | Corpo (Exemplo)                                                                    |
| :----- | :-------------------------- | :------------------------------------------------ | :--------------------------------------------------------------------------------- |
| `POST` | `/task/new`                 | Cria uma nova tarefa.                             | `{"title": "Minha Tarefa", "description": "Descrição...", "status": "not_started"}` |
| `GET`  | `/task/find/all`            | Retorna uma lista com todas as tarefas.           | N/A                                                                                |
| `GET`  | `/task/find/{id}`           | Retorna uma tarefa específica pelo seu ID.        | N/A                                                                                |
| `GET`  | `/task/find/status?s={val}` | Retorna tarefas filtradas por status.             | N/A                                                                                |
| `PUT`  | `/task/update/{id}`         | Atualiza todos os campos de uma tarefa.           | `{"title": "Título Atualizado", "description": "...", "status": "in_progress"}`     |
| `PATCH`| `/task/update/{id}`         | Atualiza um ou mais campos de uma tarefa (JSON Patch). | `[{"op": "replace", "path": "/title", "value": "Novo Título"}]`                      |
| `DELETE`| `/task/delete/{id}`         | Exclui uma tarefa pelo seu ID.                    | N/A                                                                                |

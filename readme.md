# To-do App

Projeto construido com carinho para provar habilidades como desenvolvedor fullstack utilizando .NET e react.


## Requisitos
- .NET 8.0
- Node.js

## Passo a passo para utilização

### Passo 1: Clonar o repositório
``` 
git clone https://github.com/cauesooouza/teste-tecnico-newm.git
cd test-tecnico-newm
```
caso nao tenha experiencia com git, [clique aqui e baixe como arquivo zip](https://github.com/cauesooouza/teste-tecnico-newm/archive/refs/heads/master.zip)


### Passo 2: Backend
Ja na pasta do projeto navegue até a pasta "Backend" 
e execute os seguintes comandos: 
``` 
dotnet restore 
dotnet tool install --global dotnet-ef
dotnet ef database update
```
estes comandos garante que as dependencia do projeto seja baixada, e as migrações criem o banco de dados, agora você pode iniciar o backend com o comando:

` dotnet run `

você pode visualizar funcionando em:
http://localhost:5055/swagger/index.html
este link aposta diretamente para documentação da api.

### Passo 3: Frontend
Volte para pasta anterior e navegue para a pasta "Frontend" e execute o comando:
` npm i `
seu frontend ja esta pronto para iniciar com o comando: 
` npm run dev `

você pode visualizar funcionando em:
http://localhost:5173/


## Executando com o docker
Caso você tenha experiencia e deseje utilizar a aplicação de forma conteinerizada, certifique-se que você tenha o docker instalado, navegue ate a pasta e execute o comando:
` docker-compose up --build -d `

este comando ira construir e executar o container em modo desanexada, e seu terminal continua livre para utilização.

Com o docker as portas são diferentes:
http://localhost:3000/  - para frontend
http://localhost:8080/ - para backend

## API
a utilização da api é bem simples e ela possui 7 endpoint dos quais são:

 1. POST /task/new 
Este permite criação de uma nova tarefa, aceitando o seguinte esquema:
```json
{
  "title": "string",
  "description": "string",
  "status": "not_started"
}
```
 2. GET `/task/find/all` - retorna todas as tarefa
 3. GET `/task/find/{id}` - retorna tarefa pelo ID
 4. GET `/task/find/status` - retorna tarefa pelo status
 5. PUT `/task/update/{id}` - Atualiza uma tarefa seguindo mesmo esquema de da criação.
 6. PATCH `/task/update/{id}` - Atualiza um ou mais recursos de uma tarefa seguindo o esquema:
```json
[
	{
	  "op": "replace",
	  "path": "/title",
	  "value": "novo titulo"
	}
]
```
 7. DELETE `/task/delete/{id}` - Apaga uma tarefa.

<p align="center">
<img src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" alt="yarn" />
  
<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJs" />

<img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql" alt="Graphql" />
  
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma.io" />
  
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" />
  
<img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Prisma" />
</p>
  
## **💻 Projeto**

Criamos uma API GraphQL com autenticação JWT utilizando o framework [Nest](https://nestjs.com/). Assim um usuário autenticado poderá criar, deletar, pesquisar e atualizar uma tabela de usuários no banco de dados. Usamos também o [Prisma](https://www.prisma.io/) como ORM e criamos um container com o banco de dados postgres usando o [Docker Compose](https://docs.docker.com/compose/).
  
## **🚀 Get Started**
  
```bash
# Dependências
$ yarn
  
# Container com banco de dados postgress.
$ yarn up:db
  
# Migração dos models definidos no schema.prisma
$ yarn prisma migrate dev

# watch mode
$ yarn start:dev
```

Para remover o container com o postgres:
```bash
$ yarn rm:db
```

## **🛣️ Rotas**

Acesse o playground:

```url
http://localhost:3000/graphql
```
No playgorund temos um cliente http e a documentação da API gerada automaticamente.

## **🔎 Observações**

Somente as mutations authenticate e createUsers são públicas. Para tornar todas as querys e mutations públicas basta colocar o decorator <strong>@IsPublicRoute()</strong> no UsersResolver como no exemplo abaixo:

```typescript
@IsPublicRoute()

export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  ...//more
}

```
Você deve criar pelo menos um usuário.

Usando o playground:

```url
http://localhost:3000/graphql
```

Realize a mutation:

```graphql
mutation {
  createUser(
    createUserInput: {
      name: "R2D2"
      email: "r2d2@star.com"
      password: "r2d2"
    }
  ) {
    id
    name
    email
  }
}
```

## **🔒 Login**

```graphql
mutation {
  authenticate(authInput: { email: "r2d2@star.com", password: "r2d2" }) {
    user {
      id
      email
      name
    }
    access_token
  }
}
```

Você recebera a resposta algo do tipo

```graphql
{
  "data": {
    "authenticate": {
      "user": {
        "id": "cl2vf150x0007qvqm2m15wf5f",
        "email": "r2d2@star.com",
        "name": "R2D2"
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbDJ2ZjE1MHgwMDA3cXZxbTJtMTV3ZjVmIiwiZW1haWwiOiJkYXJ0aEB2YWRlci5jb20iLCJuYW1lIjoiZGFydCIsImlhdCI6MTY1MTkwMDg1NiwiZXhwIjoxNjU0NDkyODU2fQ.6MdzP1bktgtIL0xWqiPDl0NtP6g69u1cjnjYIH3aOzI"
    }
  }
}
```
Agora copie o access_token gerado no header:

<img src="./.assets/playground-gql.png"/>

## **📁 Upload de arquivos**

Faça login, obtenha um token valido e execute o script abaixo que esta no diretorio corrente do projeto, uploadRequest.sh:

```sh
token="seu_token"
path="./README.md"

curl http://localhost:3000/graphql \
    -H "Authorization: Bearer $token" \
    -H 'connection: keep-alive' \
    -F 'operations="{\"query\":\"mutation($file: Upload!){\n\tuploadFile(file:$file)\n} \",\"variables\":{\"file\":null}}"' \
    -F 'map={ "nFile": ["variables.file"] }' \
    -F nFile=@$path

```

<img src="./.assets/curl.svg"/>
Após a execução do script o arquivo README.md estará na pasta uploads.

## **💥 Considerações**
A arbodagem das APIs graphql é bem diferente do padrão REST. No padrão REST temos os métodos GET, POST, PUT, DELETE, UPDATE. Enquanto que no graphql existe somente o método POST com o conceito de query e mutation. O graphql se destaca em resover os problemas de over-fetching e under-fetching.
Lembramos que não devemos ser amantes de tecnologias, pois elas sempre mudam. Devdemos escolher a tecnologia que melhor se adapta ao nosso problema.

## **👨‍🚀 Autor**

<a href="https://github.com/tpaphysics">
<img alt="Thiago Pacheco" src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/46402647?v=4?v=4&h=300&w=300&fit=cover&mask=circle&maxage=7d" width="100px"/>
  <br />
  <sub>
    <b>Thiago Pacheco de Andrade</b>
  </sub>
</a>
<br />
  
👋 Meus contatos!
  
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/thiago-pacheco-200a1a86/ )](https://www.linkedin.com/in/thiago-pacheco-200a1a86/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:physics.posgrad.@gmail.com )](mailto:physics.posgrad.@gmail.com)
  
##  Licença
  
  
Veja o arquivo [MIT license](LICENSE ).

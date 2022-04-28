<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<img src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" alt="yarn" />

<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJs" />

<img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql" alt="Graphql" />

<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma.io" />

<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />

<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Prisma" />

## Descrição

Nessa postagem criamos um CRUD de usuários com o GraphQL utilizando o framework [Nest](https://nestjs.com/). Assim podemos criar, deletar, pesquisar e atualizar uma tabela de usuários no banco de dados. Usamos também o [Prisma](https://www.prisma.io/) como ORM e criamos um container com o banco de dados postgres usando o [Docker Compose](https://docs.docker.com/compose/).

## Instalação

```bash
# Instalação das dependências
$ yarn

# Iniciar container com banco de dados postgress (Você precisa ter o docker instalado!):
$ yarn up:db

# Migração dos models definidos no schema.prisma para o banco de dados
$ yarn prisma migrate dev
```

## Iniciando o servidor

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Observação

```bash
# Para remover o container criado:
$ yarn rm:db
```

## Routes

```
Mapped {/graphql, POST} route +1ms
```

Diferentemente das Rest APIs onde existem os métodos get, post, path, update, delete em uma API QraphQL existe somente o método post com <strong>querys</strong> e <strong>mutations</strong>.

```graphql
type User {
  id: ID!
  email: String!
  name: String!
}

type Query {
  users: [User!]!
  user(id: Int!): User!
}

type Mutation {
  createUser(createUserInput: CreateUserInput!): User!
  updateUser(updateUserInput: UpdateUserInput!): User!
  removeUser(id: Int!): User!
}

input CreateUserInput {
  name: String!
  email: String!
}

input UpdateUserInput {
  id: Int!
  email: String
  name: String
}
```

Abra o navegador em http://localhost:3000/graphql e realize as chamadas abaixo:

<img src=".assets/playground.png" alt="Playground GraphQL Apollo"/>

```graphql
#createUser
mutation {
  createUser(
    createUserInput: { name: "tpaphysics", email: "tpaphysics@t.com" }
  ) {
    id
    name
    email
  }
}

#findAll
query {
  users {
    id
    email
    name
  }
}

#findOne
query {
  user(id: 12) {
    id
    email
    name
  }
}

#updateUser
mutation {
  updateUser(updateUserInput: { id: 1, name: "tpaphysics" }) {
    id
    name
    email
  }
}

#removeUser
mutation {
  removeUser(id: 2) {
    id
    name
    email
  }
}
```

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

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/thiago-pacheco-200a1a86/)](https://www.linkedin.com/in/thiago-pacheco-200a1a86/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:physics.posgrad.@gmail.com)](mailto:physics.posgrad.@gmail.com)

## Licença

Veja o arquivo [MIT license](LICENSE).

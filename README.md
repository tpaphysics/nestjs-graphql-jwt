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
  
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" />
  
<img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Prisma" />
  
##  Descrição
  
  
Nessa postagem criamos uma API GraphQL com com fluxo de autenticação jwt e CRUD de usários utilizando o framework [Nest](https://nestjs.com/). Assim um usuário autenticado poderá criar, deletar, pesquisar e atualizar uma tabela de usuários no banco de dados. Usamos também o [Prisma](https://www.prisma.io/) como ORM e criamos um container com o banco de dados postgres usando o [Docker Compose](https://docs.docker.com/compose/)
  
##  Instalação
  
  
```bash
# Instalação das dependências
$ yarn
  
# Iniciar container com banco de dados postgress (Você precisa ter o docker instalado!):
$ yarn up:db
  
# Migração dos models definidos no schema.prisma para o banco de dados
$ yarn prisma migrate dev
```
  
##  Iniciando o servidor
  
  
```bash
# development
$ yarn start
  
# watch mode
$ yarn start:dev
  
# production mode
$ yarn start:prod
```
Para remover o container com o postgres:
```bash
$ yarn rm:db
```

## Rotas

Para acessar o playground:

```url
http://localhost:3000/graphql
```

Diferentemente das APIs Rest, uma API do tipo GraphQL existe somente uma rota com o método post com <strong>querys</strong> e <strong>mutations</strong>. No playgorund temos um cliente http e a documentação da API gerada automaticamente.

## Observação

Somente as mutations authenticate e createUsers são públicas. Para tornar todas as querys e mutations públicas basta colocar o decorator <strong>@IsPublicRoute()</strong> no UsersResolver como no exemplo abaixo:

```typescript
@IsPublicRoute() #aqui

export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  ... ... ... ...
  ... ... ... ...
```

## Criação de usuários

Agora você deve criar pelo menos um usuário no banco de dados.

Usando o playground:

```url
http://localhost:3000/graphql
```

Realize a mutation:

```graphql
mutation {
  createUser(
    createUserInput: {
      name: "dart"
      email: "darth@vader.com"
      password: "yoda"
    }
  ) {
    id
    name
    email
  }
}
```

## Login

```graphql
mutation {
  authenticate(authInput: { email: "darth@vader.com", password: "yoda" }) {
    user {
      id
      email
      name
    }
    access_token
  }
}
```

Você recebera a resposta (exemplo):

```graphql
{
  "data": {
    "authenticate": {
      "user": {
        "id": "cl2vf150x0007qvqm2m15wf5f",
        "email": "darth@vader.com",
        "name": "dart"
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbDJ2ZjE1MHgwMDA3cXZxbTJtMTV3ZjVmIiwiZW1haWwiOiJkYXJ0aEB2YWRlci5jb20iLCJuYW1lIjoiZGFydCIsImlhdCI6MTY1MTkwMDg1NiwiZXhwIjoxNjU0NDkyODU2fQ.6MdzP1bktgtIL0xWqiPDl0NtP6g69u1cjnjYIH3aOzI"
    }
  }
}
```

Após efetuar login copie o access_token gerado no header:

<img src="./.assets/playground-gql.png"/>
Acesse a aba Docs no playground para mais informações.

## Upload de arquivos

Faça login, obtenha um token valido e execute o script abaixo que esta no diretorio corrente do projeto, uploadRequest.sh:

```sh
token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZDI0MzM2ZC05ZWJlLTRiYzYtOTJiNi05MjhmZTAxY2FlYjIiLCJlbWFpbCI6ImRhcnRoIiwibmFtZSI6ImRhcnRoIiwiaWF0IjoxNjUyMjgzMTIwLCJleHAiOjE2NTQ4NzUxMjB9.QC4HfEZLyvHSXoaIQVKgKubNUzOhiJJustcwFfz4Kc0"
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

Existem muita vatagens na utilização do NestJs para criação de APIs uma delas é o fato dele respeitar os principios do <strong>SOLID</strong>. Desta forma forma fica mais facil a escalabilidade do projeto e o trabalho em grupo com uma aquitetura padrão definida. O NestJs usa uma aquitetura muito semelhante a do framework [Angular](https://angular.io/), com uso de decorators. Particularmente achei interessante a abordagem da biblioteca [class-validator](https://www.npmjs.com/package/class-validator) para validação de campos através de decorators nos Data Transfer Objects (DTOs) :

```typescript
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserInput extends User {
  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @Matches(/[a-zA-Z0-9_-]{2,20}/)
  name: string;

  @Field(() => String)
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak!',
  })
  password: string;
}
```

Outro fator interressante é o tratamento de erros de forma global através da utilização de middlewares. Existem inumeras outras vantagens na utilização NestJs. Para mais informações, consulte a [documentação](https://nestjs.com/).

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

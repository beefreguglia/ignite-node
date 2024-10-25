# API Find a Friend

> Esse projeto é referente ao desenvolvimento de uma API para a adoção de animais. Ele foi desenvolvido durante o curso Ignite - Node.js da rocketseat. 🚀🚀

## 💻 Tecnologias Utilizadas

- Node.Js
- Typescript
- Tsx
- Tsup
- Fastify
- Dotenv
- Zod
- Eslint
- @rocketseat/eslint-config
- Prisma
- Docker
- Postgres
- Vitest
  
## Requisitos funcionais

- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG


## Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;
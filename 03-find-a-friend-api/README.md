# API Find a Friend

> Esse projeto é referente ao desenvolvimento de uma API para a adoção de animais. Ele foi desenvolvido durante o curso Ignite - Node.js da rocketseat. 🚀

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

- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG


## Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [ ] Um pet deve estar ligado a uma ORG;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [ ] Todos os filtros, além da cidade, são opcionais;
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;
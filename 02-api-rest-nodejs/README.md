# API de transações pessoais

> Esse projeto é referente ao desenvolvimento de uma API para transações pessoais. Ele foi desenvolvido durante o curso Ignite - Node.js da rocketseat.

## 💻 Tecnologias

- Node.Js
- Typescript
- Fastify
- Tsx
- Eslint
- Knex
- Sqlite3
- Dotenv
- Zod
- Vitest
- Supertest
- Tsup

## Requisitos funcionais

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder poder obter o resumo da conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram; 
- [x] O usuário deve poder visualizar uma transação única; 

## Regras de negócio

- [x] A transação pode ser do tipo crédito que somará ao valor total ou débito que subtrairá;
- [x] Deve ser possível identificar o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou; 

## Testes e2e

- [x] Deve ser possível criar uma nova transação; 
- [x] Deve ser possível listar todas as transações;
- [x] Deve ser possível listar uma transação específica;
- [x] Deve ser possível listar o resumo das transações;
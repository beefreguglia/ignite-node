/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from './src/env'
import { Knex } from 'knex'

export default {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  pool: {
    afterCreate: (connection: any, done: any) => {
      connection.run('PRAGMA foreign_keys = ON')
      done()
    },
  },
  useNullAsDefault: true,
  migrations: {
    extensions: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    extensions: 'ts',
    directory: './src/database/seeds',
  },
} as Knex.Config

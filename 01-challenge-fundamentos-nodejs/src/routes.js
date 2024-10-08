import { randomUUID } from 'node:crypto'

import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')
      
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(500).end(JSON.stringify({ message: 'Envie os campos title e description.'}))
      }
      
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null
      }

      database.insert('tasks', task)
      
      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(500).end(JSON.stringify({ message: 'Envie os campos title e description.'}))
      }

      if(!database.existsIdInTable('tasks', id)) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Id não encontrado.'}))
      }

      database.update('tasks', id, { title, description, updated_at: new Date()})
      
      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if(!database.existsIdInTable('tasks', id)) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Id não encontrado.'}))
      }

      database.delete('tasks', id)
      
      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      if(!database.existsIdInTable('tasks', id)) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Id não encontrado.'}))
      }

      database.update('tasks', id, { completed_at: new Date(), updated_at: new Date() })
      
      return res.writeHead(204).end()
    }
  },
]
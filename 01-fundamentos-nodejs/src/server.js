import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no banc-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code

/**
 * Query Parameters: URL Stateful
 * http://localhost:3333/users?userId=1&name=Diego
 * 
 * Route Parameters: Identificação de recurso
 * http://localhost:3333/users/1
 * 
 * Request Body: Envio de informações de um formulário
 */

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  
  await json(req, res)

  const route = routes.find((route) => 
    (route.method === method && route.path.test(url))
  )

  if (route) {
    const routeParams = req.url.match(route.path)
    req.params = { ...routeParams.groups }
    
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
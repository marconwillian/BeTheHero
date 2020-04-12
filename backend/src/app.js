const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((req, res) => {
  res.status(404).json({error: "Sorry can't find that!"})
})

/**
 * Rota / Recurso
 */

/**
 * Método HTTP:
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Parans: Parametros enviados na rota nomeados (Famozos GET do php) (Server para filtros, paginação)
 * Route Params: Parâmetros usados para identificar recursos
 * Request Body: 
 */

 /**
  * SQL: MySQLite, PostgreSQL, Oracle, Microsoft SQL Server
  * NoSQL: MongoDB, CouchDB, etc
  */

module.exports = app;


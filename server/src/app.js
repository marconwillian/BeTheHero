const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');
const Sentry = require('./config/sentry');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((request, response) => {
    const transaction = Sentry.startTransaction(
        {
            op: "not_find",
            name: "Route not found",
            data: {
                path: request.path
            },
        }
    );

    try {
        return response.status(404).json({error: "Sorry can't find that!"})
    } catch (error) {
        Sentry.captureException(error);
        return response.status(400).json({error: true, message: error});
    } finally {
        transaction.finish();
    }
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


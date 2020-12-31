const connection = require('../database/connection');
const Sentry = require('../config/sentry');

module.exports = {
    index:  async (request, response) => {
        const {page =1 } = request.query;
        const transaction = Sentry.startTransaction({
            op: "incident_index",
            name: "List incidents",
        });

        try {
            const [count] = await connection('incidents').count();
    
            const incidents = await connection('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .limit(5)
                .offset((page-1)*5)
                .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
            response.header('X-Total-Count', count['count(*)']);
        
            return response.json(incidents);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    },
    create: async (request, response) => {
        const {title, description, value} = request.body,
            ong_id = request.headers.authorization;
        
        const transaction = Sentry.startTransaction({
            op: "incident_create",
            name: "Create a new incident",
        });

        try {
            
            const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            });
    
            return response.json({id});
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }

    },
    delete: async (request, response) => {
        const {id} = request.params,
            ong_id = request.headers.authorization;

        const transaction = Sentry.startTransaction({
            op: "incident_delete",
            name: "Delete a incident",
        });

        try {
            const incident = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();

            if(!incident){
                return response.status(404).json({error: 'Incident Not Found.'});
            }
            
            if(incident.ong_id!==ong_id){
                return response.status(401).json({error: 'Operation not permitted.'});
            }
            await connection('incidents').where('id', id).delete();

            return response.status(204).send();
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }

    }
};

const connection = require('../database/connection');
const Sentry = require('../config/sentry');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    index: async (request, response) => {
        const transaction = Sentry.startTransaction({
            op: "ong_index",
            name: "List ongs",
        });

        try {
            const ongs = await connection('ongs').select('*');
        
            return response.json(ongs);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    },
    create: async (request, response) => {
        const transaction = Sentry.startTransaction({
            op: "ong_create",
            name: "Create a new ong",
            data: {
                body: request.body
            }
        });

        try {
            const {name, email, whatsapp, city, uf} = request.body,
                id = generateUniqueId(4);
            
            
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });

            
        
            return response.json({id});
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    }
};
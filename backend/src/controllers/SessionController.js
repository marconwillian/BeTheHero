const connection = require('../database/connection');
const Sentry = require('../config/sentry');

module.exports = {
    create: async (request, response) => {
        const {id} = request.body;

        const transaction = Sentry.startTransaction(
            {
                op: "session_create",
                name: "Create a session of a ong",
            },
            {
                userId: id
            }
        );

        try {
            const ong = await connection('ongs')
                .where('id', id)
                .select('name')
                .first();

            if(!ong){
                return response.status(400).json({error: 'No ONG found with this ID'})
            }

            return response.json(ong);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    },
};
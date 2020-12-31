const connection = require('../database/connection');
const Sentry = require('../config/sentry');

module.exports = {
    index: async (request, response) => {
        const ong_id = request.headers.authorization;

        const transaction = Sentry.startTransaction(
            {
                op: "profile_index",
                name: "Show profile of ong",
            },
            {
                userId: ong_id
            }
        );

        try {
            const incidents = await connection('incidents')
                .where('ong_id', ong_id)
                .select('*');

            return response.json(incidents);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    },
};
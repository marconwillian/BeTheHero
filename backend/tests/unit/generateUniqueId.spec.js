const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Genereta Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId(4);

        expect(id).toHaveLength(8);
    })
})
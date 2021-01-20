// import { handleSubmit } from '../src/client/js/formHandler'
const handleSubmit = require('../src/client/js/formHandler');

test('Test a Promise is defined', () => {
        expect(handleSubmit).not.toBeUndefined;
})
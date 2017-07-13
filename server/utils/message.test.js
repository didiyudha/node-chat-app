const expect = require('expect');
var { generateMessage } = require('./message');

describe('Test Message', () => {
    it('should return an object message', () => {
        var from = 'didiyudha@gmail.com';
        var text = 'Body message';
        var objMsg = generateMessage(from, text);
        expect(objMsg).toInclude({from, text});
        expect(objMsg.createdAt).toExist();
        expect(objMsg.createdAt).toBeA('number');
    });
});
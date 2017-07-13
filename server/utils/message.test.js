const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

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

describe('Test generateLocationMessage', () => {
    it('should return correct location', () => {
        var from = 'Admin';
        var latitude = 1;
        var longitude = 2;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var res = generateLocationMessage(from, latitude, longitude);
        expect(res.from).toBe(from);
        expect(res.createdAt).toBeA('number');
        expect(res.url).toBe(url);
    });
});
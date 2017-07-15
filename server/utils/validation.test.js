const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string value', () => {
        var testParam = 123;
        var res = isRealString(testParam);
        expect(res).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var testParam = '    ';
        var res = isRealString(testParam);
        expect(res).toBe(false);
    });
    it('should allow string with non spaces characters', () => {
        var testParam = '  Didi ';
        var res = isRealString(testParam);
        expect(res).toBe(true);
    });
});
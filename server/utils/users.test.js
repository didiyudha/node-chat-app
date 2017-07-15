const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    var u;
    beforeEach(() => {
        u = new Users();
        u.users = [
            {
                id: 1,
                name: 'Didi',
                room: 'Node'
            },
            {
                id: 2,
                name: 'Yudha',
                room: 'Golang'
            },
            {
                id: 3,
                name: 'Perwira',
                room: 'Node'
            }
        ];
    });
    it('should add a user', () => {
        var usr = new Users();
        var res = usr.addUser(1, 'Didi', 'Golang');
        expect(res).toEqual({id: 1, name: 'Didi', room: 'Golang'});
        expect(usr.users).toEqual([res]);
    });
    it('should return names for Node room', () => {
        var names = u.getUserList('Node');
        expect(names).toEqual(['Didi','Perwira']);
    });
    it('should return names for Golang room', () => {
        var names = u.getUserList('Golang');
        expect(names).toEqual(['Yudha']);
    });
    it('should remove user by ID 1', () => {
        var rmvUser = u.removeUser(1);
        expect(rmvUser).toExist();
        expect(rmvUser.id).toBe(1);
        expect(u.users).toNotInclude(rmvUser);
    });
    it('should not remove user by ID 9999', () => {
        var rmvUser = u.removeUser(9999);
        expect(rmvUser).toNotExist();
    });
    it('should find user by ID 1', () => {
        var user = u.getUser(1);
        expect(user).toExist();
        expect(user).toEqual(u.users[0]);
    });
    it('should not find user by ID 99999', () => {
        var uID = 99999;
        var user = u.getUser(uID);
        expect(user).toNotExist();
    });
});
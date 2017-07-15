class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var usr = {id, name, room};
        this.users.push(usr);
        return usr;
    }
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((usr) => usr.id !== id);
        }
        return user;
    }
    getUser(id) {
        var user = this.users.filter((user) => user.id === id)[0];
        return user;
    }
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var names = users.map((user) => user.name);
        return names;
    }
}

module.exports = { Users };
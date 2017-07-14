const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, langitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${langitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = { 
    generateMessage, 
    generateLocationMessage 
};
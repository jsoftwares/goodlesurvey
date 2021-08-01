// Figures out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
    // Return production set of keys
    module.exports = require('./prod');
} else {
    // return development keys
    module.exports = require('./dev');
}
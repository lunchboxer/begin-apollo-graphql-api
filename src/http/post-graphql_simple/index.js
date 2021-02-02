const arc = require('@architect/functions')
const query = require('./middleware/query')

exports.handler = arc.http.async(query)

let arc = require("@architect/functions");
let query = require("./middleware/query");

exports.handler = arc.http.async(query);

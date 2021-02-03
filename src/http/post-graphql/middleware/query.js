let { graphql } = require('graphql')
let { makeExecutableSchema } = require('graphql-tools')

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
}
// 2. read the schema
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

// 3. combine resolvers and schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

/** graphql middleware */
module.exports = async function query({body, session}) {
  try {
    let result = await graphql(schema, body.query, {}, session, body.variables, body.operationName)
    return {
      json: result
    }
  }
  catch(e) {
    return {
      json: { error: e.name, message: e.message, stack: e.stack }
    }
  }
}

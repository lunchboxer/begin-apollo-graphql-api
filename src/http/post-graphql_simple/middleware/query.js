const { graphql } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

// const fs = require('fs')
// const path = require('path')

// 1. read resolvers
// let { account, draft, drafts, save, destroy } = require('../resolvers')
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
}

// 2. read the schema
// let typeDefs = fs.readFileSync(path.join(__dirname, '..', 'schema.graphql')).toString()
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

// 3. combine resolvers and schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

/** graphql middleware */
module.exports = async function query({ body, session }) {
  try {
    const result = await graphql(
      schema,
      body.query,
      {},
      session,
      body.variables,
      body.operationName
    )
    return {
      json: result
    }
  } catch (error) {
    return {
      json: { error: error.name, message: error.message, stack: error.stack }
    }
  }
}

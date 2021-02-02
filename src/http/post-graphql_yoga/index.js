'use strict'
const { GraphQLServerLambda } = require('graphql-yoga')
const arc = require('@architect/functions')
const { permissions } = require('./permissions')

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
}
const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
  middlewares: [permissions]
})

exports.handler = function (event, context, callback) {
  const body = arc.http.helpers.bodyParser(event)
  // Support for AWS HTTP API syntax
  event.httpMethod = event.httpMethod
    ? event.httpMethod
    : event.requestContext.http.method
  // Body is now parsed, re-encode to JSON for Apollo
  event.body = JSON.stringify(body)
  context.callbackWaitsForEmptyEventLoop = false
  lambda.graphqlHandler(event, context, callback)
}

const { ApolloServer } = require(`apollo-server-express`)
const express = require(`express`)
const expressPlayground = require(`graphql-playground-middleware-express`).default
const { readFileSync } = require(`fs`)
const { MongoClient } = require(`mongodb`)
require(`dotenv`).config()

const typeDefs = readFileSync(`./typedefs.graphql`, `UTF-8`)
const resolvers = require(`./resolvers`)

async function start() {
  const app = express()

  const client = await MongoClient.connect(
    process.env.MONGO_DB_HOST,
    { useUnifiedTopology: true }
  )
  const db = client.db()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers.authorization
      const currentUser = await db.collection(`users`).findOne({ githubToken })
      return { db, currentUser }
    }
  })

  server.applyMiddleware({ app })

  app.get(`/`, (req, res) => res.end(`Welcome to the PhotoShare API`))
  app.get(`/playground`, expressPlayground({ endpoint: `/graphql` }))

  app.listen({ port: 4000 }, () =>
    console.log(`GraphQL Service running @ http://localhost:4000${server.graphqlPath}`)
  )
}

start()

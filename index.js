import {ApolloServer, PubSub} from 'apollo-server'

import mongoose from 'mongoose'


import {MONGODB} from './config.js'
import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>({req, pubsub})
})
mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => {
        console.log("DB Connected");
      return server.listen({port:PORT})
    })
.then((res) => {
      console.log(`server running at ${res.url} `);
})
    .catch((err) => {
      console.error(err);
  })

import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: '/graphql', // Use relative URL with proxy
})

// Create a WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3000/graphql', // WebSocket still needs full URL
  connectionParams: () => {
    const token = localStorage.getItem('access_token')
    return {
      authorization: token ? `Bearer ${token}` : '',
    }
  },
}))

// Add auth token to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

// Split link based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

// Apollo Client setup
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tasks: {
            keyArgs: ['projectId', 'status', 'assignedTo'],
            merge(existing = { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false }, totalCount: 0 }, incoming) {
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              }
            },
          },
        },
      },
      Task: {
        fields: {
          comments: {
            merge(_existing = [], incoming) {
              return incoming
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

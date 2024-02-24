import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

export default client;

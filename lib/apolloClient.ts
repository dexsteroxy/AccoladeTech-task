"use client";

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://restcountries.com/v3.1/all", // API URL
  cache: new InMemoryCache(),
});

export default client;

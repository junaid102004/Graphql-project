import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // gql,
} from "@apollo/client";
import { AppProvider } from "./context/AppContext";
// 🔑 Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // 👈 your backend GraphQL endpoint
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>
);

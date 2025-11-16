import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      code
      district
      state
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($code: String!, $district: String!, $state: String!) {
    addUser(code: $code, district: $district, state: $state) {
      id
      code
      district
      state
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $code: String!, $district: String!, $state: String!) {
    updateUser(id: $id, code: $code, district: $district, state: $state) {
      id
      code
      district
      state
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      code
      district
      state
    }
  }
`;

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChild = /* GraphQL */ `
  query GetChild($id: ID!) {
    getChild(id: $id) {
      id
      name
      image
      gender
      createdAt
      updatedAt
    }
  }
`;
export const listChildren = /* GraphQL */ `
  query ListChildren(
    $filter: ModelChildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChildren(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        gender
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

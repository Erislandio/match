import { gql } from "graphql-request";

export const GET_PAIR_BY_SLUG = gql`
  query GET_PAIR_BY_SLUG($pairName: String!) {
    pair(where: { pairName: $pairName }) {
      date
      pairName
      coulpeName
      about
      categories {
        title
        description
        slug
        id
      }
      products {
        id
        price
        title
        slug
        quantity
        category {
          title
        }
        available
        identifier
        description
        image {
          id
          url
        }
      }
      banners {
        position
        image {
          url
          id
        }
      }
    }
  }
`;

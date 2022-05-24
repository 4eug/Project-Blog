import styles from '../styles/Slug.module.css'
import {GraphQLClient, gql} from 'graphql-request';

const graphcms = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl3jt6e5w8qbd01zd35si8p23/master');

const QUERY = gql`
  query Post($slug: String!) {
    post(where: {slug: $slug}) {
        id,
        title,
        slug,
        datePublished,
        author{
            id,
            name,
            avatar{
                url
            }
        }
        content{
            html
        }
        coverPhoto{
            id
            url
        }
    }
  }
`;

const SLUGLIST = gql`
    {
        posts {
            slug
        }
    }
`;

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}
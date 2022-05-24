import styles from '../styles/Slug.module.css'
import {GraphQLClient, gql} from 'graphql-request';

const graphcms = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl3jt6e5w8qbd01zd35si8p23/master');

const QUERY = gql`
  {
    posts {
      id,
      title,
      datePublished,
      slug,
      content{
        html
      }
      author{
        name,
        avatar{
          url
        }
      }
      coverPhoto{
          url 
      }
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
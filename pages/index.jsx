import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BlogCard from '../components/BlogCard';
import {GraphQLClient, gql} from 'graphql-request';

const graphcms = new GraphQLClient('https://api-eu-west-2.graphcms.com/v2/cl3jt6e5w8qbd01zd35si8p23/master');

const QUERY = gql`
{
  posts {
    id
    title
    datePublished
    slug
    content {
      html
    }
    author {
      name
      avatar {
        url
      }
    }
    coverPhoto {
      publishedAt
      createdBy {
        id
      }
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

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project Blog</title>
        <meta name="description" content="A blog with graphqlcms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}



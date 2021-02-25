import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { getSortedPostsData } from "../libs/posts";
import { PostDesc } from "../interfaces/post";

type Props = {
  posts: PostDesc[];
};

const IndexPage = ({ posts }: Props) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js</h1>
    <p>
      <p>Posts: {posts.length}</p>
      <ul>
        {posts.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <a>
                {title} - {date}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};

export default IndexPage;

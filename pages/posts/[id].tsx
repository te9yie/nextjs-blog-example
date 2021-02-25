import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import { PostData } from "../../interfaces/post";
import { getAllPostIds, getPostData } from "../../libs/posts";

type Props = {
  post: PostData;
};

const PostDetail = ({ post }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div>{post.date}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  );
};

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id === "string") {
    const post = await getPostData(params?.id);
    return { props: { post } };
  } else {
    return { props: {} };
  }
};

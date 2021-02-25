import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { PostData, PostDesc } from "../interfaces/post";

const POSTS_DIR = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(POSTS_DIR);
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, fileName);
    const contents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(contents);
    return {
      id,
      ...matterResult.data,
    } as PostDesc;
  });
  return posts.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(POSTS_DIR);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    return {
      params: {
        id,
      },
    };
  });
};

export const getPostData = async (id: string) => {
  const fullPath = path.join(POSTS_DIR, `${id}.md`);
  const content = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(content);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    content: contentHtml,
    ...matterResult.data,
  } as PostData;
};

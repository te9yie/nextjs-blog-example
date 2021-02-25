import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../interfaces/post";

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
    } as Post;
  });
  return posts.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
};

import { useContext } from "react";
import BlogContext from "../context/BlogContext";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const { blogs } = useContext(BlogContext);

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

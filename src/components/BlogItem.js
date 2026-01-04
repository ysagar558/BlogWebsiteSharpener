import { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";
import BlogModal from "./BlogModal";
import '../App.css';

const BlogItem = ({ blog }) => {
  const { deleteBlog } = useContext(BlogContext);
  const [edit, setEdit] = useState(false);

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <img src={blog.imageUrl} alt="" />
      <p>{blog.description}</p>

      <button onClick={() => setEdit(true)} className="edit-button">Edit Blog</button>
      <button onClick={() => deleteBlog(blog._id)} className="delete-button">Delete Blog</button>

      {edit && (
        <BlogModal
          closeModal={() => setEdit(false)}
          editData={blog}
        />
      )}
    </div>
  );
};

export default BlogItem;

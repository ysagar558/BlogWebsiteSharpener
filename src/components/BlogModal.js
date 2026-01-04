import { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";

const BlogModal = ({ closeModal, editData }) => {
  const { addBlog, updateBlog } = useContext(BlogContext);

  const [imageUrl, setImageUrl] = useState(editData?.imageUrl || "");
  const [title, setTitle] = useState(editData?.title || "");
  const [description, setDescription] = useState(editData?.description || "");

  const submitHandler = () => {
    const blog = { imageUrl, title, description };

    if (editData) {
      updateBlog(editData._id, blog);
    } else {
      addBlog(blog);
    }
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Blog Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={submitHandler} className="post-button">POST BLOG</button>
          <button onClick={closeModal} className="close-button">CLOSE</button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;

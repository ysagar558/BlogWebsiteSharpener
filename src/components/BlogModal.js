import { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";

const BlogModal = ({ closeModal, editData }) => {
  const { addBlog, updateBlog } = useContext(BlogContext);

  const [imageUrl, setImageUrl] = useState(editData?.imageUrl || "");
  const [title, setTitle] = useState(editData?.title || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [loadingAI, setLoadingAI] = useState(false);

  //AI DESCRIPTION GENERATOR
  const generateDescriptionWithAI = async () => {
    if (!title) {
      alert("Please enter title first");
      return;
    }

    setLoadingAI(true);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a short blog description for the title: "${title}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    setDescription(aiText);
    setLoadingAI(false);
  };

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

        <textarea
          placeholder="Blog Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        <button onClick={generateDescriptionWithAI} className="ai-button">
          {loadingAI ? "Generating..." : "Generate desc with AI "}
        </button>

        <div className="modal-actions">
          <button onClick={submitHandler} className="post-button">POST BLOG</button>
          <button onClick={closeModal} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;

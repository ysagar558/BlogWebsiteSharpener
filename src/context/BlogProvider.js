import React, { useState, useEffect } from "react";
import BlogContext from "./BlogContext";

const API_URL = "https://crudcrud.com/api/40c3ffc451164a51a59dfc8a8bc3c356/blogs";

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  // GET blogs
  const fetchBlogs = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ADD blog
  const addBlog = async (blog) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });
    const data = await res.json();
    setBlogs((prev) => [...prev, data]);
  };

  // DELETE blog
  const deleteBlog = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  // UPDATE blog
  const updateBlog = async (id, updatedBlog) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });
    fetchBlogs();
  };

  return (
    <BlogContext.Provider
      value={{ blogs, addBlog, deleteBlog, updateBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;

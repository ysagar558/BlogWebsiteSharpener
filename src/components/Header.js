import { useState } from "react";
import BlogModal from "./BlogModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="header">
        <h1>Blog Website</h1>
        <button onClick={() => setShowModal(true)}>Add New Blog</button>
      </header>

      {showModal && <BlogModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Header;

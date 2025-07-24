import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const commentRes = await fetch("https://jsonplaceholder.typicode.com/comments");
      const commentsData = await commentRes.json();

      const postRes = await fetch("https://jsonplaceholder.typicode.com/posts");
      const postsData = await postRes.json();
      const postMap = {};
      postsData.forEach(post => postMap[post.id] = post.title);

      const saved = JSON.parse(localStorage.getItem("editedComments")) || {};
      const merged = commentsData.map(comment =>
        saved[comment.id] ? { ...comment, ...saved[comment.id] } : comment
      );

      setComments(merged);
      setPosts(postMap);
    };

    fetchData();
  }, []);

  const handleEdit = (id, field, value) => {
    const updated = comments.map(comment =>
      comment.id === id ? { ...comment, [field]: value } : comment
    );
    setComments(updated);

    const edits = JSON.parse(localStorage.getItem("editedComments")) || {};
    edits[id] = { ...(edits[id] || {}), [field]: value };
    localStorage.setItem("editedComments", JSON.stringify(edits));
  };

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <Table comments={comments} posts={posts} searchTerm={searchTerm} onEdit={handleEdit} />
    </div>
  );
}

export default App;
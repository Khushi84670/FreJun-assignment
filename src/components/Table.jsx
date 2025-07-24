import React, { useState } from "react";

const Table = ({ comments, posts, searchTerm, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const filtered = comments.filter(comment =>
    comment.email.toLowerCase().includes(searchTerm) ||
    comment.name.toLowerCase().includes(searchTerm) ||
    comment.body.toLowerCase().includes(searchTerm)
  );

  const paginated = filtered.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const totalPages = Math.ceil(filtered.length / commentsPerPage);

  const renderCell = (id, value, field) => (
    <td
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onEdit(id, field, e.target.innerText)}
    >
      {value}
    </td>
  );

  return (
    <div style={{ padding: "20px" }}>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Body</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(comment => (
            <tr key={comment.id}>
              <td>{comment.email}</td>
              {renderCell(comment.id, comment.name, "name")}
              {renderCell(comment.id, comment.body, "body")}
              <td>{posts[comment.postId] || "Loading..."}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
       <div className="pagination">
  <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
    Prev
  </button>
  <span>Page {currentPage} of {totalPages}</span>
  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
    Next
  </button>
</div>
      </div>
    </div>
  );
};

export default Table;
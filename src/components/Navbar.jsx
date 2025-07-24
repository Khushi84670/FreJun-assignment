import React from "react";

const Navbar = ({ onSearch }) => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <input
        type="text"
        placeholder="Search comments..."
        onChange={e => onSearch(e.target.value.toLowerCase())}
        style={{ padding: "8px", width: "300px" }}
      />
    </nav>
  );
};

export default Navbar;
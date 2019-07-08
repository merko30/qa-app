import React from "react";

export default function Tag({ name, onClick }) {
  return (
    <span
      className="p-1 bg-light rounded small m-1"
      onClick={() => onClick(name)}
    >
      {name}
    </span>
  );
}

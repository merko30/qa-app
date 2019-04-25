import React from "react";

export default function AnswerCount({ answers }) {
  return (
    <div className="p-2 text-center bg-warning rounded text-nowrap font-weight-bold">
      <h6>{answers.length}</h6>
      <p className="text-uppercase mb-0">Answers</p>
    </div>
  );
}

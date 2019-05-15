import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ pages, onClick, active }) => {
  return (
    <div className="d-flex justify-content-center my-2">
      <Pagination>
        {pages.map(i => {
          return (
            <Pagination.Item
              active={i === active}
              key={i}
              onClick={() => onClick(i)}
            >
              {i}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;

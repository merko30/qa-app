import React from "react";
import { Button } from "react-bootstrap";

function Confirmation({ onClick, children, handleClose }) {
  return (
    <div>
      {children}
      <Button variant="info" className="mr-2" onClick={onClick}>
        Yes
      </Button>
      <Button variant="danger" onClick={handleClose}>
        No
      </Button>
    </div>
  );
}

export default Confirmation;

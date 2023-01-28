import Toast from "react-bootstrap/Toast";
import React from "react";

const ToastComponent = ({ setShow, show, message, isSuccess }) => {
  return (
    <Toast
      className="position-absolute top-1"
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      bg={isSuccess ? "success" : "danger"}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;

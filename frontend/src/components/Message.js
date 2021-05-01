import React from "react";
import { Alert, Container } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Container className="mt-5 mb-5">
      <Alert variant={variant}>{children}</Alert>
    </Container>
  );
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;

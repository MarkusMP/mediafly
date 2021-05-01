import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../actions/postActions";
import { useHistory } from "react-router-dom";

const CreateSocialCard = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const createHandler = (e) => {
    e.preventDefault();
    if (userInfo) {
      dispatch(createPost(text));
    } else {
      history.push("/login");
    }
  };
  return (
    <div className=" mt-4">
      <Card style={{ maxWidth: "28rem" }} className=" m-auto">
        <Card.Header>Create Post</Card.Header>
        <Card.Body>
          <Form onSubmit={createHandler}>
            <Form.Control
              as="textarea"
              className="bg-light"
              placeholder="Make a Post..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <Button className="mt-2" type="submit">
              Post
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateSocialCard;

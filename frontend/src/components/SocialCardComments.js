import React, { useState } from "react";
import { ListGroup, Button, FormControl, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCommentPost, deleteCommentPost } from "../actions/postActions";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const SocialCardComments = ({ data, postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    if (userInfo) {
      e.preventDefault();
      dispatch(createCommentPost(postId, text));
    } else {
      history.push("/login");
    }
  };

  const handleDelete = (commentId, commentPostedById) => {
    dispatch(deleteCommentPost(postId, commentId, commentPostedById));
    handleClose();
  };
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Form onSubmit={submitHandler} className="d-flex">
            <FormControl
              type="text"
              placeholder="Comment something..."
              className="bg-light"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button className="py-1" type="submit">
              Comment
            </Button>
          </Form>
        </ListGroup.Item>
        {data &&
          data.map((comment) => (
            <div key={comment._id}>
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div
                      className="circular--landscape mr-2"
                      style={{ height: "50px ", width: "50px " }}
                    >
                      <LinkContainer
                        to={`/profile/${comment.postedBy._id}`}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={comment.postedBy.avatar}
                          alt={comment.postedBy.username}
                        />
                      </LinkContainer>
                    </div>
                    <div>
                      <LinkContainer
                        to={`/profile/${comment.postedBy._id}`}
                        style={{ cursor: "pointer" }}
                      >
                        <h6>{comment.postedBy.username}</h6>
                      </LinkContainer>

                      <p>{Date(data.created).toString().substring(0, 16)}</p>
                    </div>
                  </div>
                  {userInfo && userInfo._id === comment.postedBy._id && (
                    <Button
                      variant="danger"
                      className="p-2 m-1"
                      style={{ height: "40px" }}
                      onClick={handleShow}
                    >
                      X
                    </Button>
                  )}
                </div>
                <div className="text">{comment.text}</div>
              </ListGroup.Item>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                  <h5>Do you wanna delete this comment?</h5>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                  <Button variant="primary" onClick={handleClose}>
                    No
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleDelete(comment._id, comment.postedBy._id)
                    }
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ))}
      </ListGroup>
    </>
  );
};

export default SocialCardComments;

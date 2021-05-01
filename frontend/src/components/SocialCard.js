import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import {
  faComment as fasComment,
  faHeart as fasHeart,
} from "@fortawesome/free-regular-svg-icons";
import SocialCardComments from "./SocialCardComments";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, likePost } from "../actions/postActions";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

const SocialCard = ({ data }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const date = new Date(data.createdAt);

  const liked = userInfo && data.likes.includes(userInfo._id);

  const handleDelete = () => {
    if (userInfo) {
      dispatch(deletePost(data._id));
      handleClose();
    }
  };

  const handleLike = () => {
    if (userInfo) {
      dispatch(likePost(data._id));
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="mt-4">
      <Card style={{ maxWidth: "28rem" }} className="m-auto">
        <Card.Header className="d-flex">
          <div className="circular--landscape mr-2">
            <LinkContainer
              to={`/profile/${data.user._id}`}
              style={{ cursor: "pointer" }}
            >
              <img src={data.user.avatar} alt={data.user.username} />
            </LinkContainer>
          </div>
          <div>
            <LinkContainer
              to={`/profile/${data.user._id}`}
              style={{ cursor: "pointer" }}
            >
              <h4>{data.user.username}</h4>
            </LinkContainer>
            <p>{date.toString().substring(0, 16)}</p>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>{data.postText}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div
              className="mr-2"
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            >
              {liked ? (
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
              ) : (
                <FontAwesomeIcon icon={fasHeart} className="mr-2" />
              )}
              <span>{data.likes.length}</span>
            </div>
            <div
              onClick={() => setCommentOpen((prevOpen) => !prevOpen)}
              style={{ cursor: "pointer" }}
            >
              {commentOpen ? (
                <FontAwesomeIcon icon={faComment} className="mr-2" />
              ) : (
                <FontAwesomeIcon icon={fasComment} className="mr-2" />
              )}

              <span>{data.comments.length}</span>
            </div>
          </div>
          {userInfo && userInfo._id === data.user._id && (
            <Button variant="danger" className="p-2" onClick={handleShow}>
              X
            </Button>
          )}
        </Card.Footer>
        {commentOpen && (
          <SocialCardComments data={data.comments} postId={data._id} />
        )}
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <h4>Do you wanna delete this post?</h4>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SocialCard;

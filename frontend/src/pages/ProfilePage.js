import React, { useEffect, useState } from "react";
import { Card, Container, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userGetProfile, userDelete } from "../actions/userActions";
import { deletePostsByUser } from "../actions/postActions";
import { Link, useHistory } from "react-router-dom";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { profile } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(userGetProfile());
    }
  }, [dispatch, userInfo, history]);

  const handleDelete = () => {
    dispatch(userDelete());
    dispatch(deletePostsByUser());
  };

  return (
    <>
      <Link className="btn btn-primary m-5" to="/">
        Go Back
      </Link>
      <Container
        style={{ height: "75vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        {profile ? (
          <Card style={{ maxWidth: "28rem" }}>
            <Card.Body className="m-auto text-center">
              <div
                className="circular--landscape mb-4"
                style={{ height: "150px ", width: "150px " }}
              >
                <img src={profile.avatar} alt={profile.username} />
              </div>
              <h2>Followers: {profile.followers.length}</h2>
              <h1>{profile.username}</h1>
              <Card.Text className="mt-2">{profile.bio}</Card.Text>
              <LinkContainer to="/profile/edit">
                <Button className="w-100 mt-3" variant="info">
                  Edit
                </Button>
              </LinkContainer>
              <Button
                className="w-100 mt-3"
                variant="danger"
                onClick={handleShow}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Loader />
        )}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <h4> are you sure that you wanna delete your profile?</h4>
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
      </Container>
    </>
  );
};

export default ProfilePage;

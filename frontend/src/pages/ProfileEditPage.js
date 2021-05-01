import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userGetProfile, userEdit } from "../actions/userActions";
import { useHistory, Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

const ProfileEditPage = () => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const userDetails = useSelector((state) => state.userDetails);

  const { profile } = userDetails;

  useEffect(() => {
    if (!profile) {
      dispatch(userGetProfile);
    } else {
      setUsername(profile.username);
      setImage(profile.avatar);
      setBio(profile.bio);
      setEmail(profile.email);
    }
  }, [profile, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userEdit(email, username, bio, image));
    history.push("/profile");
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Link className="btn btn-primary m-5" to="/profile">
        Go Back
      </Link>
      <div
        style={{ height: "75vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Container>
          {profile ? (
            <Card className="p-2 m-auto" style={{ maxWidth: "28rem" }}>
              <Card.Title className="text-center pt-1">
                <h1>Edit Profile</h1>
              </Card.Title>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                    ></Form.Control>
                    <Form.File
                      id="image-file"
                      label="Choose File"
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                  </Form.Group>

                  <Button type="submit" className="w-100">
                    Edit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Loader />
          )}
        </Container>
      </div>
    </>
  );
};

export default ProfileEditPage;

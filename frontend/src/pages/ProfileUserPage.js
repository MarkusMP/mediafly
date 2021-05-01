import React, { useEffect } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  userGetByIdProfile,
  userFollow as followUser,
} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory, Link } from "react-router-dom";

const ProfileUserPage = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userIdDetails = useSelector((state) => state.userIdDetails);
  const { loading, profile, error } = userIdDetails;

  const userFollow = useSelector((state) => state.userFollow);
  const { message } = userFollow;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo._id === match.params.id) {
      history.push("/profile");
    } else {
      dispatch(userGetByIdProfile(match.params.id));
    }
  }, [dispatch, match.params.id, message, userInfo, history]);

  const followHandler = () => {
    if (userInfo) {
      dispatch(followUser(profile._id));
    } else {
      history.push("/login");
    }
  };

  const isFollowing =
    profile && userInfo && profile.followers.includes(userInfo._id);

  return (
    <>
      <Link className="btn btn-primary m-5" to="/">
        Go Back
      </Link>
      <Container
        style={{ height: "75vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          profile && (
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
                <Button className="w-100" onClick={followHandler}>
                  {isFollowing ? "Unfollow" : "follow"}
                </Button>
              </Card.Body>
            </Card>
          )
        )}
      </Container>
    </>
  );
};

export default ProfileUserPage;

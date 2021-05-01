import React from "react";
import SocialCardList from "../components/SocialCardList";
import CreateSocialCard from "../components/CreateSocialCard";
import { Container } from "react-bootstrap";
import Paginate from "../components/Paginate";
import { useSelector } from "react-redux";

const HomePage = ({ match }) => {
  const postList = useSelector((state) => state.postList);

  const { posts } = postList;
  return (
    <Container>
      <CreateSocialCard />
      <SocialCardList pageNumber={match.params.pageNumber} />
      <div className="mt-5">
        <Paginate data={posts.posts} />
      </div>
    </Container>
  );
};

export default HomePage;

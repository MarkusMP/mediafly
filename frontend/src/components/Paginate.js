import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";
const Paginate = ({ data, keyword = "" }) => {
  const { pages, page } = data;

  return (
    pages > 1 && (
      <Pagination className="ml-5">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

Paginate.propTypes = {
  pages: 0,
  page: 1,
};

export default Paginate;

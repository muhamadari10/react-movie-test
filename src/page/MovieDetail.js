import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getMovieDetail, selectMovieDetail } from "../features/movieSlice";
import { Link } from "react-router-dom";

// import './Movie.module.css';

export default function MovieDetail() {
  let { id } = useParams();
  const [pathPoster] = useState("https://image.tmdb.org/t/p/w185/");
  const detailMovie = useSelector(selectMovieDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getMovieDetail(id));
  }, []);

  return (
    <section className="MovieDetail">
      <Container>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h1>Movie - Detail</h1>
          <Link
            to={{
              pathname: `/`,
            }}
          >
            <h1>Back To Movie</h1>
          </Link>
        </div>
        <Row>
          <Col className="col-auto">
            <img src={pathPoster + detailMovie.poster_path} />
          </Col>
          <Col>
            <div>
              <a href={detailMovie.homepage}>{detailMovie.title}</a>
            </div>
            <div>
              {detailMovie.status} : {detailMovie.release_date}
            </div>
            <div>{detailMovie.original_language}</div>
            <div>{detailMovie.vote_average}</div>
            <div>{detailMovie.vote_count}</div>
            <div>
              <div>Spoken</div>
              <h4>
                {detailMovie.spoken_languages
                  ? detailMovie.spoken_languages.map((val, index) => (
                      <Badge bg="secondary">{val.name}</Badge>
                    ))
                  : ""}
              </h4>
            </div>
            <div>
              <div>Genre</div>
              <h4>
                {detailMovie.genres
                  ? detailMovie.genres.map((val, index) => (
                      <Badge bg="secondary">{val.name}</Badge>
                    ))
                  : ""}
              </h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>{detailMovie.overview}</div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

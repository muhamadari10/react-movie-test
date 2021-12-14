import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Row, Badge, Pagination, Container } from "react-bootstrap";
import {
  selectMovie,
  getGenre,
  getMovie,
  selectGenre,
  setPageActive,
  selectTotalPage,
} from "../features/movieSlice";

import { Link } from "react-router-dom";

import "./Movie.module.css";

export default function Movie() {
  const genre = useSelector(selectGenre);
  const movie = useSelector(selectMovie);
  const totalPage = useSelector(selectTotalPage);

  const [pages, setPage] = useState(1);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const dispatch = useDispatch();

  const nextList = () => {
    var pActive = pages + 1;
    actionPage(pActive);
  };

  const prevList = () => {
    var pActive = pages - 1;
    actionPage(pActive);
  };

  const paginate = () => {
    let paging = [];
    for (let index = 1; index <= totalPage; index++) {
      paging.push(
        <Pagination.Item
          active={pages == index ? true : false}
          key={index}
          onClick={() => {
            dispatch(setPageActive(index));
          }}
        >
          {index}
        </Pagination.Item>
      );
    }
    return paging;
  };

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getMovie(pages));
    dispatch(getGenre());
    statusPaginate(pages);
  }, []);

  const statusPaginate = (page) => {
    if (page == 1) {
      setFirst(true);
      setPrev(true);
      setLast(false);
      setNext(false);
    } else if (page == totalPage) {
      setFirst(false);
      setPrev(false);
      setLast(true);
      setNext(true);
    } else {
      setFirst(false);
      setPrev(false);
      setLast(false);
      setNext(false);
    }
  };

  const actionPage = (page) => {
    setPage(page);
    dispatch(getMovie(page));
    statusPaginate(page);
  };

  const findGenre = (idGenre) => {
    let resultName = "Genre";
    genre.forEach((val) => {
      if (val.id == idGenre) {
        resultName = val.name;
      }
    });
    return resultName;
  };

  return (
    <Container>
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <h1>Movie - List</h1>
        <Link
          to={{
            pathname: `/genre`,
          }}
        >
          <h1>List - Genre</h1>
        </Link>
      </div>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th>adult</th> */}
              {/* <th>backdrop_path</th> */}
              <th>Genre</th>
              {/* <th>id</th> */}
              {/* <th>original_language</th> */}
              {/* <th>original_title</th> */}
              {/* <th>overview</th> */}
              <th>Popularity</th>
              {/* <th>poster_path</th> */}
              <th>Release Data</th>
              <th>Title</th>
              {/* <th>video</th> */}
              <th>Vote Average</th>
              <th>Vote Count</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {movie.length > 0 ? (
              movie.map((val, index) => (
                <tr key={index}>
                  {/* <td>{val.adult}</td> */}
                  {/* <td>{val.backdrop_path}</td> */}
                  <td>
                    {val.genre_ids.length > 0 ? (
                      val.genre_ids.map((genre, i) => (
                        <Badge
                          bg="secondary"
                          style={{ padding: 5, marginRight: 5 }}
                          key={i}
                        >
                          {findGenre(genre)}
                        </Badge>
                      ))
                    ) : (
                      <Badge bg="secondary">Tidak ada genre </Badge>
                    )}
                  </td>
                  {/* <td>{val.id}</td> */}
                  {/* <td>{val.original_language}</td> */}
                  {/* <td>{val.original_title}</td> */}
                  {/* <td>{val.overview}</td> */}
                  <td>{val.popularity}</td>
                  {/* <td>{val.poster_path}</td> */}
                  <td>{val.release_date}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/detail/${val.id}`,
                      }}
                    >
                      {val.title}
                    </Link>
                  </td>
                  {/* <td>{val.video}</td> */}
                  <td>{val.vote_average}</td>
                  <td>{val.vote_count}</td>
                  <td>
                    <Link
                      className="btn btn-info"
                      to={{
                        pathname: `/detail/${val.id}`,
                      }}
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Data Tidak ada</td>
              </tr>
            )}
          </tbody>
        </Table>
        {totalPage > 0 ? (
          <Pagination>
            <Pagination.First
              onClick={() => {
                actionPage(1);
              }}
              disabled={first}
            />
            <Pagination.Prev
              disabled={prev}
              onClick={() => {
                prevList();
              }}
            />
            {/* {paginate()} */}
            <Pagination.Next
              disabled={next}
              onClick={() => {
                nextList();
              }}
            />
            <Pagination.Last
              onClick={() => {
                actionPage(totalPage);
              }}
              disabled={last}
            />
          </Pagination>
        ) : (
          <div></div>
        )}
      </Row>
    </Container>
  );
}

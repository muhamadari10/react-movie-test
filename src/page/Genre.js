import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Row, Container } from "react-bootstrap";
import { getGenre, selectGenre } from "../features/movieSlice";
import { Link } from "react-router-dom";
// import './Movie.module.css';

export default function Genre() {
  const genre = useSelector(selectGenre);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getGenre());
  }, []);

  return (
    <Container className="Genre">
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <h1>Genre - List</h1>
        <Link
          to={{
            pathname: `/`,
          }}
        >
          <h1>Back To Movie</h1>
        </Link>
      </div>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {genre.length > 0 ? (
              genre.map((val, index) => (
                <tr key={index}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Data Tidak ada</td>
              </tr>
            )}
          </tbody>
        </Table>
        {/* {listPaginate.length > 0 ?
      <Pagination>
        <Pagination.First onClick={()=>{dispatch(setPageActive(1))}} disabled={first} />
        <Pagination.Prev disabled={prev} onClick={()=>{prevList()}} />
        {paginate()}
        <Pagination.Next disabled={next} onClick={()=>{nextList()}} />
        <Pagination.Last onClick={()=>{dispatch(setPageActive(totalPage))}} disabled={last} />
      </Pagination>:<div></div>} */}
      </Row>
    </Container>
  );
}

import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import Genre from './page/Genre'
import Movie from './page/Movie'
import MovieDetail from "./page/MovieDetail";


const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Movie /> },
    { path: "genre", element: <Genre /> },
    { path: "detail/:id", element: <MovieDetail /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
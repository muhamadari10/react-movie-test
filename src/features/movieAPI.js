export function fetchGenre() {
  return new Promise(
    (resolve) =>
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49`,
        {
          method: "GET",
        }
      )
        .then(
          (response) => response.json() // if the response is a JSON object
        )
        .then(
          (success) => {
            resolve({ data: success });
          } // Handle the success response object
        )
        .catch(
          (error) => console.log(error) // Handle the error response object
        )
    // setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function fetchMovie(page) {
  return new Promise(
    (resolve) =>
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=2fccde01a371b106b09a241d6d1d5b49&page=${page}`,
        {
          method: "GET",
        }
      )
        .then(
          (response) => response.json() // if the response is a JSON object
        )
        .then(
          (success) => {
            resolve({ data: success });
          } // Handle the success response object
        )
        .catch(
          (error) => console.log(error) // Handle the error response object
        )
    // setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function fetchMovieDetail(id) {
  return new Promise(
    (resolve) =>
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2fccde01a371b106b09a241d6d1d5b49`,
        {
          method: "GET",
        }
      )
        .then(
          (response) => response.json() // if the response is a JSON object
        )
        .then(
          (success) => {
            resolve({ data: success });
          } // Handle the success response object
        )
        .catch(
          (error) => console.log(error) // Handle the error response object
        )
    // setTimeout(() => resolve({ data: amount }), 500)
  );
}

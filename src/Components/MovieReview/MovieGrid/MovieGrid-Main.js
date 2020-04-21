import React from "react";
import MovieGridPagination from "./MovieGrid-Pagination";
import MovieGridFilter from "./MovieGrid-Filter";

const MovieGridMain = () => {
  return (
    <div class="container">
      <div class="page">
        <div class="breadcrumbs">
          <a href="index.html">Home</a>
          <span>Movies</span>
        </div>
        <MovieGridFilter></MovieGridFilter>
        <div class="movie-list">
          <div class="movie">
            <figure class="movie-poster">
              <img
                src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                alt="#"
              />
            </figure>
            <div class="movie-title">
              <a href="single.html">Maleficient</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
          <div class="movie">
            <figure class="movie-poster">
              <img
                src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                alt="#"
              />
            </figure>
            <div class="movie-title">
              <a href="single.html">The adventure of Tintin</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
          <div class="movie">
            <figure class="movie-poster">
              <img src="dummy/thumb-5.jpg" alt="#" />
            </figure>
            <div class="movie-title">
              <a href="single.html">Hobbit</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
          <div class="movie">
            <figure class="movie-poster">
              <img src="dummy/thumb-6.jpg" alt="#" />
            </figure>
            <div class="movie-title">
              <a href="single.html">Exists</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
          <div class="movie">
            <figure class="movie-poster">
              <img src="dummy/thumb-1.jpg" alt="#" />
            </figure>
            <div class="movie-title">
              <a href="single.html">Drive hard</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
          <div class="movie">
            <figure class="movie-poster">
              <img src="dummy/thumb-2.jpg" alt="#" />
            </figure>
            <div class="movie-title">
              <a href="single.html">Robocop</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
          <div class="movie">
            <figure class="movie-poster">
              <img src="dummy/thumb-7.jpg" alt="#" />
            </figure>
            <div class="movie-title">
              <a href="single.html">Life of Pi</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
          <div class="movie">
            <figure class="movie-poster">
              <img src="dummy/thumb-8.jpg" alt="#" />
            </figure>
            <div class="movie-title">
              <a href="single.html">The Colony</a>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error voluptatem
              doloremque.
            </p>
          </div>
        </div>
        <MovieGridPagination></MovieGridPagination>
      </div>
    </div>
  );
};

export default MovieGridMain;

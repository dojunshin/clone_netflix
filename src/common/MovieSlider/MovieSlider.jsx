import React from 'react'
import './MovieSlider.style.css'
import Carousel from 'react-multi-carousel';
import MovieCard from '../MovieCard/MovieCard'

const MovieSlider = ({title,movies, responsive}) => {
  return (
    <div>
        <h1>{title}</h1>
        <Carousel
            infinite={true}
            centerMode={true}
            itemClass='movie-slider px-1'
            containerClass='carousel-container'
            responsive={responsive}
            >

            {movies?.map((movie, index)=><MovieCard movie={movie} key={index}/>)}

        </Carousel>
    </div>
  )
}

export default MovieSlider
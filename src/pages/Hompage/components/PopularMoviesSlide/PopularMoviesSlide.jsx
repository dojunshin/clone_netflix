import React from 'react'
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery'
import { Alert } from 'bootstrap';
import 'react-multi-carousel/lib/styles.css';
import MovieModal from '../../../../common/MovieCard/MovieModal'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive'

const PopularMoviesSlide = () => {

    const {data,isLoading,isError,error} = useMoviesQuery('popular')

    if(isLoading) {
        <h1>Loading..</h1>
    }

    if(isError) {
        return <Alert variant='danger'>{error.message}</Alert>
    }

    // data가 없을 때 예외 처리
    if (!data || !data.results) {
        return <div>No data</div>;
    }

  return (
    <div>
        <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive}/>
        <MovieModal/>
    </div>
  )
}

export default PopularMoviesSlide
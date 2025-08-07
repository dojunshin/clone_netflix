import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import useModalStore from '../../zustand/modal_store'
import { useMovieGenreQuery } from '../../hooks/useMoviesGenre'

const MovieCard = ({ movie }) => {
  const { open } = useModalStore()
  const adultText = movie.adult ? '18세이상' : '18세이하'
  const {data:genreData} = useMovieGenreQuery()

  const showGenre = (genreIdList) => {
    if(!genreData) return []

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre)=> genre.id === id)
      return genreObj?genreObj.name:null
    })

    return genreNameList
  }

  return (
    <div
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`,
      overflow:'hidden',
      borderRadius:'8px'}}
      className='movie-card'
      onClick={() => open(movie)}
    >
      <div className='overlay'>
        <h3>{movie.title}</h3>
        {showGenre(movie.genre_ids).map((id, idx) => (
          <Badge key={idx} bg='danger'>{id}</Badge>
        ))}
        <div className='movie-details'>
          <div>평점 : {movie.vote_average}</div>
          <div>인기도 : {movie.popularity}</div>
          <div>성인등급 : {adultText}</div>
        </div>
      </div>
      {/* <div>
        <div>{movie.vote_average}</div>
        <div>{movie.popularity}</div>
        <div>{adultText}</div>
      </div> */}
    </div>
  )
}

export default MovieCard
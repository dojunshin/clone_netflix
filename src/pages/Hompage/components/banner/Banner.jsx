// Banner.jsx
import React from 'react'
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery'
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css'

const Banner = () => {
  const {data,isLoading,isError,error} = useMoviesQuery('popular')

  if(isLoading) {
    return <div>Loading...</div>
  } else if(isError) {
    return <Alert variant='danger'>Error : {error.message}</Alert>
  }

  return (
    <div style={{
      backgroundImage : "url(" + `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${data.results[0].poster_path}` + ")"
    }}
    className='banner'
    >
      <div className='text-white banner-text-area'>
        <h1 className='banner-title'>{data?.results[0].title}</h1>
        <p className='banner-overview'>{data?.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner
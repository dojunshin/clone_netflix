import React from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import MovieModal from '../../common/MovieCard/MovieModal'
import MovieFilter from '../Movies/MovieFilter'
import { useState, useMemo } from 'react'
import ReactPaginate from 'react-paginate'
import '../Movies/MoviePage.style.css'


const Moviepage = () => {
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [sortBy, setSortBy] = useState('popularity.desc')

  const keyword = query.get('q')

  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page}) 

  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
  }

  const handleFilterReset = () => {
    setSelectedGenre('')
    setSortBy('popularity.desc')
    setPage(1)
  }

  // 필터링 및 정렬된 영화 데이터
  const filteredAndSortedMovies = useMemo(() => {
    if (!data?.results) return []

    let movies = [...data.results]

    // 장르 필터링
    if (selectedGenre) {
      movies = movies.filter(movie => 
        movie.genre_ids.includes(parseInt(selectedGenre))
      )
    }

    // 정렬
    movies.sort((a, b) => {
      switch (sortBy) {
        case 'popularity.desc':
          return b.popularity - a.popularity
        case 'popularity.asc':
          return a.popularity - b.popularity
        case 'vote_average.desc':
          return b.vote_average - a.vote_average
        case 'vote_average.asc':
          return a.vote_average - b.vote_average
        case 'release_date.desc':
          return new Date(b.release_date) - new Date(a.release_date)
        case 'release_date.asc':
          return new Date(a.release_date) - new Date(b.release_date)
        case 'title.asc':
          return a.title.localeCompare(b.title)
        case 'title.desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return movies
  }, [data?.results, selectedGenre, sortBy])

  if(isLoading) {
    return (
      <div className='spinner-area'>
        <Spinner
          animation='border'
          variant='danger'
          style={{width:'5rem', height:'5rem'}}
        />
      </div>
    )
  }

  if(isError) {
    return <Alert variant='danger'>{error.message}</Alert>
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <Container>
        <div>검색 결과가 없습니다: "{keyword}"</div>
      </Container>
    )
  }

  return (
    <Container>
      <Row>
        {/* 필터 컴포넌트 */}
        <Col lg={4} xs={12}>
          <MovieFilter
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            sortBy={sortBy}
            setSortBy={setSortBy}
            keyword={keyword}
            filteredCount={filteredAndSortedMovies.length}
            onReset={handleFilterReset}
          />
        </Col>

        {/* 영화 목록 */}
        <Col lg={8} xs={12}>
          <Row>
            {filteredAndSortedMovies.map((movie, index) => (
              <Col key={index} lg={4} xs={12} className="mb-3">
                <MovieCard movie={movie}/>
              </Col>
            ))}
          </Row>

          {/* 페이지네이션 */}
          <div className="mt-4 d-flex justify-content-center">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page-1}
            />
          </div>
        </Col>
      </Row>
      <MovieModal/>
    </Container>
  )
}

export default Moviepage
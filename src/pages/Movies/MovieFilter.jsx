import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useMovieGenreQuery} from '../../hooks/useMoviesGenre'

const MovieFilter = ({ 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy, 
  keyword, 
  filteredCount,
  onReset 
}) => {
  const { data: genreData } = useMovieGenreQuery()

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="filter-section p-3" style={{backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
      <h5>필터 & 정렬</h5>
      
      {/* 장르 필터 */}
      <Form.Group className="mb-3">
        <Form.Label>장르별 보기</Form.Label>
        <Form.Select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">모든 장르</option>
          {genreData?.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* 정렬 옵션 */}
      <Form.Group className="mb-3">
        <Form.Label>정렬 순서</Form.Label>
        <Form.Select value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">인기도 높은순</option>
          <option value="popularity.asc">인기도 낮은순</option>
          <option value="vote_average.desc">평점 높은순</option>
          <option value="vote_average.asc">평점 낮은순</option>
          <option value="release_date.desc">최신순</option>
          <option value="release_date.asc">오래된순</option>
          <option value="title.asc">제목 오름차순</option>
          <option value="title.desc">제목 내림차순</option>
        </Form.Select>
      </Form.Group>

      {/* 필터 초기화 버튼 */}
      <Button variant="outline-secondary" onClick={onReset} className="w-100 mb-3">
        필터 초기화
      </Button>

      {/* 필터 결과 요약 */}
      <div className="filter-summary p-2" style={{backgroundColor: '#e9ecef', borderRadius: '4px'}}>
        <small>
          <strong>검색어:</strong> {keyword || '전체'}<br/>
          <strong>장르:</strong> {selectedGenre ? genreData?.find(g => g.id == selectedGenre)?.name : '전체'}<br/>
          <strong>결과:</strong> {filteredCount}개
        </small>
      </div>
    </div>
  )
}

export default MovieFilter
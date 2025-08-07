import React, { useState } from 'react'
import { Modal, Button, Accordion, Badge } from 'react-bootstrap'
import useModalStore from '../../zustand/modal_store'
import { useMovieVideosQuery } from '../../hooks/useMovieVideosQuery'
import { useMovieReviewsQuery } from '../../hooks/useMovieReviewsQuery'

const MovieModal = () => {
  const { show, close, selectedMovie } = useModalStore()
  const { data: videosData } = useMovieVideosQuery(selectedMovie?.id)
  const { data: reviewsData, isLoading: reviewsLoading } = useMovieReviewsQuery(selectedMovie?.id)
  
  const formatReleaseDate = (date) => {
    if (!date) return '정보 없음'
    return date.split('-').join('-')
  }

  const formatReviewDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (!selectedMovie) return null

  const trailer = videosData?.data?.results?.find(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  )

  const reviews = reviewsData?.results || []

  return (
    <Modal show={show} onHide={close} centered size="xl"> {/* size를 xl로 변경 */}
      <Modal.Header closeButton>
        <Modal.Title>{selectedMovie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* 트레일러 또는 이미지 */}
        {trailer ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: '8px', marginBottom: '1rem' }}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w780${selectedMovie.backdrop_path || selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
          />
        )}
        
        {/* 영화 정보 */}
        <div className="mb-4">
          <p><strong>평점:</strong> {selectedMovie.vote_average}</p>
          <p><strong>인기도:</strong> {selectedMovie.popularity}</p>
          <p><strong>성인 등급:</strong> {selectedMovie.adult ? '18세이상' : '18세이하'}</p>
          <p><strong>개봉일:</strong> {formatReleaseDate(selectedMovie.release_date)}</p>
          <p><strong>설명:</strong> {selectedMovie.overview}</p>
        </div>

        {/* 리뷰 섹션 */}
        <div className="mt-4">
          <h5>
            리뷰 
            <Badge bg="secondary" className="ms-2">{reviews.length}</Badge>
          </h5>
          
          {reviewsLoading ? (
            <div className="text-center p-3">리뷰를 불러오는 중...</div>
          ) : reviews.length > 0 ? (
            <Accordion className="mt-3">
              {reviews.slice(0, 5).map((review, index) => ( // 최대 5개만 표시
                <Accordion.Item eventKey={index.toString()} key={review.id}>
                  <Accordion.Header>
                    <div className="d-flex justify-content-between w-100 me-3">
                      <span><strong>{review.author}</strong></span>
                      <div>
                        {review.author_details?.rating && (
                          <Badge bg="warning" text="dark" className="me-2">
                            ⭐ {review.author_details.rating}/10
                          </Badge>
                        )}
                        <small className="text-muted">
                          {formatReviewDate(review.created_at)}
                        </small>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {review.content}
                    </div>
                    {review.url && (
                      <div className="mt-2">
                        <a 
                          href={review.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm"
                        >
                          원문 보기
                        </a>
                      </div>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <div className="text-center p-3 text-muted">
              리뷰가 없습니다.
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MovieModal
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie', movieId, 'reviews'],
    queryFn: () => api.get(`/movie/${movieId}/reviews`),
    select: (result) => result.data,
    enabled: !!movieId,
  })
}
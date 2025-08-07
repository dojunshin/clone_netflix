import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

export const useMovieVideosQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => api.get(`/movie/${movieId}/videos`),
    enabled: !!movieId, // movieId가 있을 때만 실행
    // suspense: true,
  })
}
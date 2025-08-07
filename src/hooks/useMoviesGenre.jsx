import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: () => api.get(`/genre/movie/list`),
        select: (result) => result.data.genres,
        staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
        suspense: true, // Suspense를 사용하여 로딩 상태 관리
    })
}
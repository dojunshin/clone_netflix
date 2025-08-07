
// const fetchPopularMovies = () => {
//     return api.get(`/movie/popular`)
// }

// export const usePoppularMoviesQuery = () => {
//     return useQuery({
//         queryKey: ['moive-popular'],
//         queryFn: fetchPopularMovies,
//         select: (result) => result.data,
//     })
// }

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useMoviesQuery = (category) => {
    return useQuery({
        queryKey: ['movie', category],
        queryFn: () => api.get(`/movie/${category}`),
        select: (result) => result.data,
        suspense: true,
    })
}
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppLayout from './layout/AppLayout'
import Homepage from './pages/Hompage/Homepage'
// import MovieDetailPage from './pages/MovieDetail/MovieDetailPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Moviepage from './pages/Movies/MoviePage'

//홈페이지                    주소 : /
//영화 전체보여주는 페이지(서치)   주소 : /movies
//영화 디테일 페이지            주소 : /movies/:id
//추천영화 페이지               주소 : /movies/:id/recommendation
//리뷰                       주소 : /movies/:id/reviews
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Homepage/>}/> {/* index는 path="/" 를 붙인것과 같은 효과를 나타낸다*/}
          {/* <Route path="/movies" element={<Moviepage/>}/>
          <Route path="/movies/:id" element={<MovieDetailPage/>}/> 
          위의 코드가 아래의 코드처럼 간결하게 작성될 수 있다.
          */}
          <Route path="/movies">
            <Route index element={<Moviepage/>}/>
            {/* <Route path=":id" element={<MovieDetailPage/>}/> */}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import Banner from './components/banner/Banner'
import PupularMoviesSlide from './components/PopularMoviesSlide/PopularMoviesSlide'
import TopRatedSlide from './components/TopRatedSlide/TopRatedSlide'
import UpComingSlide from './components/UpComingSlide/UpComingSlide'
import { Suspense } from 'react'

//해야할 작업
//1. 배너 가져오기 => popular 영화를 들고와서 첫번째 아이템을 보여주기
//2. popular 영화 가져오기
//3. top rated 영화 가져오기
//4. upcoming 영화 가져오기


const Homepage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
      <Banner/>
      <PupularMoviesSlide/>  
      <TopRatedSlide/>
      <UpComingSlide/>
    </div>
    </Suspense>
  )
}

export default Homepage
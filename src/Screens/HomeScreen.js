import React from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import PopularTv from '../Components/Home/PopularTv'

function HomeScreen() {
  return (
    <Layout>
      <Banner></Banner>
      <PopularMovies></PopularMovies>
      <PopularTv></PopularTv>
    </Layout>
  )
}

export default HomeScreen
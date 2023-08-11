import React from 'react'
import {Route, Routes} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen'
import Series from './Screens/Series';
import NotFound from './Screens/NotFound';
import Movies from './Screens/Movies';
import MovieDetails from './Components/MovieDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/series" element={<Series />} />
      <Route path="/movies" element={<Movies />} />
      <Route path='/:category/:id' element={<MovieDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
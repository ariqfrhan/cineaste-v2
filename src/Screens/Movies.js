import React from 'react'
import Layout from '../Layout/Layout'
import MovieCatalog from '../Components/MovieCatalog'
import { useParams } from 'react-router-dom'

function Movies() {

  const {category} = useParams();
  console.log(category);

  return (
    <Layout>
      <div className='container  mx-auto py-28 min-h-screen px-2'>
        <MovieCatalog></MovieCatalog>
      </div>
    </Layout>
  )
}

export default Movies
import React from 'react'
import Layout from '../Layout/Layout'
import TvCatalog from '../Components/TvCatalog'

function Series() {
  return (
    <Layout>
      <div className='container mx-auto py-28 min-h-screen px-2'>
        <TvCatalog></TvCatalog>
      </div>
    </Layout>
  )
}

export default Series
import React from 'react'
import Footer from './Footer/Footer'
import NavBar from './Navbar/NavBar'

function Layout({children}) {
  return (
    <>
    <div className='bg-richblack text-white'>
        <NavBar></NavBar>
        {children}
        <Footer></Footer>
    </div>
    </>
  )
}

export default Layout
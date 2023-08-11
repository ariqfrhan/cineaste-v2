import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [search, setSearch] = useState('');

  const pathname = useLocation();
  const changeOnScroll = () => {
    if (window.scrollY >= 50) {
      setScrolled(true);
      setScrolling(true);
    } else {
      setScrolled(false);
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeOnScroll);
    return () => {
      window.removeEventListener("scroll", changeOnScroll);
    };
  });

  return (
    <div
      className={`${
        pathname !== "/"
          ? scrolled
            ? "bg-secondary transition duration-300"
            : "bg-transparent"
          : scrolled
          ? "bg-secondary transition duration-300"
          : "bg-transparent"
      } 
fixed w-full px-8 py-4 top-0 z-50 flex items-center justify-between text-lg lg:px-20`}
    >
      <div className="hover:cursor-pointer lg-w-fit">
        <Link to="/">
          <h1
            className={`${
              scrolled ? "text-white" : "text-primary"
            } font-bold text-3xl`}
          >
            Cineaste
          </h1>{" "}
        </Link>
      </div>
      <div
        className={`flex lg:static grow lg:pl-12 lg:justify-center items-center fixed flex-col lg:flex-row top-0 bottom-0
      ${
        show ? "left-20 right-0 bg-secondary text-start" : "left-full -right-20"
      } lg:bg-trans top-[80px] md:top-[90px] transition-all duration-500 text-primary ${scrolled ? 'text-white': ''}`}
      >
        <NavLink to="/" className={`font-semibold px-8 text-md my-4 relative`}>
          Home
        </NavLink>
        <NavLink to="/movies" className={`font-semibold px-8 text-md my-4 relative`}>
          Top Movies
        </NavLink>
        <NavLink to="/series" className={`font-semibold px-8 text-md my-4 relative`}>
          Top Series
        </NavLink>
      </div>
      <div className="hidden lg:block">
        <form className="text-sm bg-white rounded-md drop-shadow-md flex-btn gap-4">
          <button
            type="submit"
            className="bg-secondary w-12 flex-colo h-12 text-white"
          >
            <FaSearch></FaSearch>
          </button>
          <input
            type="text"
            placeholder="Search Movie Name"
            className="font-medium placeholder:text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
            onChange={(e) =>{
                setSearch(e);
            }}
          ></input>
        </form>
      </div>
      <button
                type="button"
                className="w-6 h-6 lg:hidden"
                onClick={() => {
                    if (!show) {
                        setShow(true);
                    } else {
                        setShow(false);
                    }
                }}
            >
                {!show ? (
                    <div className="w-7 h-7 flex flex-col justify-between items-center lg:hidden text-4xl cursor-pointer overflow-hidden group">
                        <span
                            className={`w-full h-[4px]  inline-flex transform group-hover:translate-x-2 transition-all ease-in-out duration-300  ${
                                scrolling ? "bg-white" : "bg-primary"
                            }`}
                        ></span>
                        <span
                            className={`w-full h-[4px]  inline-flex transform translate-x-3 group-hover:translate-x-0 transition-all ease-in-out duration-300 ${
                                scrolling ? "bg-white" : "bg-primary"
                            }`}
                        ></span>
                        <span
                            className={`w-full h-[4px]  inline-flex transform translate-x-1 group-hover:translate-x-3 transition-all ease-in-out duration-300 ${
                                scrolling ? "bg-white" : "bg-primary"
                            }`}
                        ></span>
                    </div>
                ) : (
                    <div className="w-8 h-8 lg:hidden items-center cdursor-pointer -mt-8">
                        <span
                            className={`w-full h-[4px]  inline-flex transform rotate-45 translate-y-3 transition-all ease-in-out duration-300 ${
                                scrolling ? "bg-white" : "bg-primary"
                            }`}
                        ></span>
                        <span
                            className={`w-full h-[4px]  inline-flex transform -rotate-45 -translate-y-4 transition-all ease-in-out duration-300 ${
                                scrolling ? "bg-white" : "bg-primary"
                            }`}
                        ></span>
                    </div>
                )}
            </button>
    </div>
    // <div className='bg-transparent shadow-md sticky top-0 z-20'>
    //   <div className='container mx-auto py-4 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
    //     <div className='col-span-1 lg:block hidden'>
    //       <Link to="/">
    //       <h1 className='text-primary font-bold text-3xl'>Cineaste</h1>
    //       </Link>
    //     </div>
    //     <div className='col-span-4 font-medium text-md hidden 2xl:gap-10 justify-between lg:flex xl:justify-center items-center mx-auto'>
    //       <NavLink to="/" className='nav' >
    //         Home
    //       </NavLink>
    //       <NavLink to="/movies" className='nav' >
    //         Top Movies
    //       </NavLink>
    //       <NavLink to="/series" className='nav' >
    //         Top Series
    //       </NavLink>
    //     </div>
    //     <div className='col-span-2'>
    //       <form className='w-full text-sm bg-white rounded flex-btn gap-4'>
    //         <button type='submit' className='bg-secondary rounded w-12 flex-colo h-12 text-white' >
    //           <FaSearch></FaSearch>
    //         </button>
    //         <input type='text' placeholder='Search Movie Name' className='font-medium placeholder: text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black'></input>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default NavBar;

import React, { useEffect, useState, useRef } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import axios from "axios";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { motion, useInView, useAnimation } from "framer-motion";

function Banner() {
  SwiperCore.use([Autoplay]);
  const [showModal, setShowModal] = useState(false);
  const [movieItems, setMovieItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const calcInnerWidth = () => {
    const width = window.innerWidth;
    return width;
  };

  const transition = {
    duration: 1,
    ease: "easeInOut",
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const apiKey = apiConfig.apiKey;
        const url = `
        https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&&append_to_response=videos&language=en-US&page=1`;
        const response = await axios.get(url);
        setMovieItems(response.data.results.slice(0,4));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full h-screen bg-richblack"
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i} className="relative rounded overflow-hidden">
            <img
              src={apiConfig.originalImage(item.backdrop_path)}
              className="w-full h-full object-cover opacity-30"
              alt={item.title}
            />
            <div className="absolute lg:px-40 sm:px-32 px-2 top-0 bottom-0 right-0 left-0 flex flex-col lg:flex-row justify-center items-center lg:gap-7 md:gap-5 gap-4">
              <div className="w-3/5 pt-16 lg:pt-0">
                <img
                  src={apiConfig.w500Image(item.poster_path)}
                  className="h-72 md:h-[480px] mx-auto rounded-xl drop-shadow-md block lg:hidden"
                ></img>
                <h1 className="xl:text-6xl md:text-5xl pt-2 lg:pt-0 text-center lg:text-start capitalize font-bold text-2xl py-2 ">
                  {item.title}
                </h1>
                <div className="flex gap-5 py-2 text-sm md:text-sm lg:text-lg items-center text-center lg:text-start">
                  {calcInnerWidth() > 640
                    ? limitString(item.overview, 250)
                    : limitString(item.overview, 100)}
                </div>
                <div className="flex flex-col md:flex-row justify-center lg:justify-start pt-2 gap-4 md:gap-0 items-center">
                  <Link
                    to={`/${category.movie}/${item.id}`}
                    className="bg-primary px-8 py-2 text-center font-medium rounded-full  bg-opacity-70 hover:bg-secondary transitions"
                  >
                    Watch Now
                  </Link>
                  <button
                    onClick={openModal}
                    className="bg-transparent border-solid text-center border-2 px-8 py-2 ml-3 font-medium rounded-full hover:bg-secondary hover:border-secondary text-white transitions"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
              <div className="hidden w-2/5 lg:block">
                <Link to={`/${category.movie}/${item.id}`}>
                  <motion.img
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={transition}
                    src={apiConfig.w500Image(item.poster_path)}
                    className="h-[420px] mx-auto rounded-xl drop-shadow-lg"
                  ></motion.img>
                </Link>
              </div>
              {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                  <div className="w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 p-4 rounded-lg bg-white">
                    {item.videos && item.videos.results.length > 0 && (
                      <>
                        {item.videos.results.some(
                          (video) => video.type === "Trailer"
                        ) && (
                          <iframe
                            title="Trailer"
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${
                              item.videos.results.find(
                                (video) => video.type === "Trailer"
                              ).key
                            }`}
                            className="rounded-xl"
                            allowFullScreen
                          ></iframe>
                        )}
                      </>
                    )}
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-secondary text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;

export function limitString(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
}

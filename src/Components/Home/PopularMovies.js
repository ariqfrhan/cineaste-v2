import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

function PopularMovies() {
  SwiperCore.use([Autoplay, Navigation]);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 18));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevtEl] = useState(null);

  return (
    <div className="container mt-5 p-10 px-6 mx-auto mb-6">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Trending Movies</h1>
        <Link
          to={`/movies`}
          className="bg-transparent border-solid border-2 px-5 py-1 font-medium text-sm rounded-full hover:bg-secondary hover:border-secondary text-white transitions"
        >
          View More
        </Link>
      </div>
      <div className="card">
        <Swiper
          navigation={{ nextEl, prevEl }}
          grabCursor={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
          },
          767.8: {
              slidesPerView: 4,
          },
          1024: {
              slidesPerView: 6,
          },
          }}
          spaceBetween={20}
          autoplay={true}
          speed={1000}
          modules={[Navigation, Autoplay]}
        >
          {movieItems.map((item, i) => (
            <SwiperSlide key={i} className="pb-16 pt-3 h-rate border-white">
              <Link to = {`/${category.movie}/${item.id}`} >
                <img
                  src={apiConfig.w500Image(item.poster_path)}
                  className="w-full h-64 object-cover rounded-lg shadow hover:shadow-md"
                  alt={item.title}
                />
                <div className="text-center absolute py-2 font-bold text-md">
                  {item.title}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PopularMovies;

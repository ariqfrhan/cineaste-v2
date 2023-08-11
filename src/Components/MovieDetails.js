import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import axios from "axios";
import NavBar from "../Layout/Navbar/NavBar";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";

function MovieDetails() {
  SwiperCore.use([Autoplay, Navigation]);
  const { category, id } = useParams();
  const [item, setItem] = useState();
  const [actor, setActors] = useState(null);
  const [similar, setSimilar] = useState([]);
  const movieId = useRef(id);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = apiConfig.apiKey;
        const url = `https://api.themoviedb.org/3/${category}/${id}?api_key=${apiKey}&append_to_response=videos`;
        const response = await axios.get(url);
        setItem(response.data);

        const actor = await axios.get(`
        https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${apiKey}`);
        setActors(actor);

        const same = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}/similar?api_key=${apiKey}`
        );
        setSimilar(same.data.results);
      } catch (error) {}
    };

    fetchData();
  }, [category, id]);

  return (
    <>
      <NavBar></NavBar>
      {item && (
        <>
          <div className="bg-richblack relative h-screen w-full overflow-y-hidden overflow-x-hidden">
            <div className="relative bg-gradient-to-b from-transparent">
              <img
                src={apiConfig.originalImage(
                  item.backdrop_path || item.poster_path
                )}
                className="opacity-50 w-full h-screen object-cover shadow hover:shadow-md"
                alt={item.title}
              />
            </div>
            <div className="absolute inset-0 pt-32 lg:pt-64 px-8 lg:px-20">
              <p className="text-white text-xl font-semibold leading-none">
                {item.tagline}
              </p>
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold">
                {item.title || item.name}
              </h1>
              <div className="flex flex-row gap-2 mt-5">
                {item.genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="text-white text-md font-regular px-3 rounded-xl border-2 backdrop-blur-xl hover:cursor-pointer"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 pt-4">
                <div className="w-full rounded-xl h-full">
                  {item.videos.results.length > 0 && (
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
                </div>
                <div className="w-full bg-transparent backdrop-blur-2xl rounded-xl h-16 lg:h-48 flex flex-col items-center justify-center">
                  <h4 className="font-medium text-white">Rating</h4>
                  <h2 className="text-white text-2xl md:text-4xl  lg:text-6xl font-bold">
                    {item.vote_average}
                  </h2>
                </div>
                <div className="w-full bg-transparent backdrop-blur-2xl rounded-xl h-16 lg:h-full flex flex-col text-center items-center justify-center">
                  <h4 className="font-medium text-white">Release</h4>
                  <h2 className="text-white text-2xl md:text-4xl  lg:text-5xl font-bold">
                    {formatDate(item.release_date ||item.first_air_date)}
                  </h2>
                </div>
                <div className="w-full bg-transparent backdrop-blur-2xl rounded-xl h-16 lg:h-full flex flex-col items-center justify-center">
                  <h4 className="font-medium text-white">Length</h4>
                  <h2 className="text-white text-2xl md:text-4xl  lg:text-5xl font-bold">
                    {item.runtime || item.number_of_episodes} {`${category === 'tv' ? 'episodes' : 'min'}`}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-richblack h-full">
            <div className="px-4 lg:px-20 pt-12">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="w-full lg:w-3/5 px-4">
                  <h3 className="text-primary leading-none font-semibold text-lg">
                    DESCRIPTION
                  </h3>
                  <p className="text-white mt-3">{item.overview}</p>
                </div>
                <div className="w-full lg:w-2/5 px-4 mt-4 lg:mt-0">
                  <h3 className="text-primary leading-none font-semibold text-lg">
                    CASTS
                  </h3>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {actor &&
                      actor.data.cast.slice(0, 6).map((actorItem) => (
                        <div
                          key={actorItem.id}
                          className="flex flex-col items-center"
                        >
                          <img
                            src={apiConfig.originalImage(
                              actorItem.profile_path
                            )}
                            className="w-20 h-20 drop-shadow-md rounded-full object-cover"
                            alt={actorItem.name}
                          />
                          <p className="text-white mt-2">{actorItem.name}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <h3 className="text-primary font-semibold text-lg pt-8">
                  RECOMMENDATION FOR YOU
                </h3>
                <div className="w-full">
                  <Swiper
                    navigation={true}
                    grabCursor={true}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      767.8: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    spaceBetween={20}
                    autoplay={true}
                    speed={1000}
                    modules={[Navigation, Autoplay]}
                  >
                    {similar.map((item, i) => (
                      <SwiperSlide
                        key={i}
                        className="pb-16 pt-3 h-rate border-white"
                      >
                        <Link to={`/${category}/${item.id}`}>
                          <img
                            src={apiConfig.w500Image(item.poster_path)}
                            className="w-full h-96 object-cover rounded-lg shadow hover:shadow-md"
                            alt={item.title}
                          />
                          <div className="text-center text-white  py-2 font-bold text-md">
                            {item.title || item.name}
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetails;

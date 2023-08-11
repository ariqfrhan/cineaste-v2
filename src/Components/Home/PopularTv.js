import React, {useEffect, useState} from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Link } from 'react-router-dom';
import tmdbApi, { category, tvType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

function PopularTv() {
    SwiperCore.use([Autoplay, Navigation]);
    const[tvItems, setTvItems] = useState([])

    useEffect(() => {
        const getTv = async () => {
            const params = {page:1};
            try{
                const response = await tmdbApi.getTvList(tvType.popular, {
                    params,
                });
                setTvItems(response.results.slice(0,18));
                console.log({tvList : response});
            }catch{
                console.log("error");
            }
        }
        getTv();
    }, []);

    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevtEl] = useState(null);

  return (
    <div className='container p-10 px-6 mx-auto mb-6'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-xl'>Trending TV Series</h1>
            <Link
            to={`/series`}
            className='bg-transparent border-solid border-2 px-5 py-1 font-medium text-sm rounded-full hover:bg-secondary hover:border-secondary text-white transitions' >
                View More
            </Link>
        </div>
        <div className='card'>
            <Swiper
            navigation= {{nextEl, prevEl}}
            grabCursor = {true}
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
            autoplay = {true}
            speed={1000}
            modules={[Navigation, Autoplay]}
            >
                {tvItems.map((item,i) => (
                    <SwiperSlide key={i} className="pb-16 pt-3 h-rate border-white">
                    <Link to = {`/${category.tv}/${item.id}`} >
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
  )
}

export default PopularTv
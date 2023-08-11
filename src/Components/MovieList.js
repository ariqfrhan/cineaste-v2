import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';

import { SwiperSlide, Swiper } from 'swiper/react';

import tmdbApi, { category } from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';

const MovieList = props => {

    const [items, setItems] = useState([]);

    useEffect(() =>{
        const getList = async () =>{
            let response = null;

            if(props.type !== 'similar'){
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                        break;
                }
            }else{
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);

  return (
    <div className='movie-list'>
        <Swiper
        grabCursor={true}
        ></Swiper>
    </div>
  )
}

MovieList.PropTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList
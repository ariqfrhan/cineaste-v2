import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs';
import tmdbApi, { category, movieType } from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'

function MovieCatalog() {
    const [movieItems, setMovieItems] = useState([]);
    const [page,setPage] = useState(1);


    useEffect(() => {
        const getMovies = async () => {
            const params = {page, }
            try{
                const response = await tmdbApi.getMoviesList(movieType.top_rated,{
                    params,
                });
                setMovieItems(response.results)
                // console.log({movieList : response});
            }catch{
                console.log('error');
            }
        };
        getMovies();
    }, [page]);

    const handleClick = () => {
        setPage(page+1);
    }

  return (
    <div className='container mx-auto px-4 py-2'>
        <h1 className='font-bold text-2xl pb-5'>Top Rated Movies</h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 mx-auto'>
            {
                movieItems.map((item, i) => (
                    <Link to = {`/${category.movie}/${item.id}`} key={i}>
                    <img src= {apiConfig.w500Image(item.poster_path)}
                    className='w-64 h-96 object-cover rounded-lg mx-auto hover:shadow '
                    ></img>
                    <div className="text-center font-bold text-lg pt-2">
                    {item.title}
                    </div>
                    <div className='text-center font-medium py-2'>
                    ({item.release_date.split('-')[0]})
                    </div>
                    <div className='text-center pt-0.5'><BsFillStarFill className='absolute ms-28 mt-1' style={{color :'yellow'}} ></BsFillStarFill>{item.vote_average}</div>
                    </Link>
                    
                ))
            }
        </div>
    </div>
  )
}

export default MovieCatalog
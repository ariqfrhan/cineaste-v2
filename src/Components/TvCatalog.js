import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs';
import tmdbApi, { category, tvType } from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'

function TvCatalog() {
    const [TvItems, setTvItems] = useState([]);
    const [page,setPage] = useState(1);


    useEffect(() => {
        const getTv = async () => {
            const params = {page, }
            try{
                const response = await tmdbApi.getTvList(tvType.top_rated,{
                    params,
                });
                setTvItems(response.results)
                // console.log({TvList : response});
            }catch{
                console.log('error');
            }
        };
        getTv();
    }, [page]);

    const handleClick = () => {
        setPage(page+1);
    }

  return (
    <div className='container mx-auto px-4 py-2'>
        <h1 className='font-bold text-2xl pb-5'>Top Rated Tv Series</h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 mx-auto'>
            {
                TvItems.map((item, i) => (
                    <Link to = {`/${category.tv}/${item.id}`} key={i}>
                    <img src= {apiConfig.w500Image(item.poster_path)}
                    className='w-64 h-96 object-cover rounded-lg mx-auto hover:shadow '
                    ></img>
                    <div className="text-center font-bold text-lg pt-2">
                    {item.name}
                    </div>
                    <div className='text-center font-medium py-2'>
                    ({item.first_air_date.split('-')[0]})
                    </div>
                    <div className='text-center pt-0.5'><BsFillStarFill className='absolute ms-28 mt-1' style={{color :'yellow'}} ></BsFillStarFill><p className='px-4'>{item.vote_average}</p></div>
                    </Link>
                    
                ))
            }
        </div>
    </div>
  )
}

export default TvCatalog
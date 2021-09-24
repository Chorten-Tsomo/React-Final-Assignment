import React from 'react';
import { useState, useEffect } from 'react';
import './MovieSlider.css';
import axios from 'axios';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


function MovieSlider  () {
    const [current, setCurrent] = useState(0);
    const [movies, setData] = useState([]);
    

   

   useEffect(() => {
    axios.get('https://yts.mx/api/v2/list_movies.json?limit=4&sort_by=rating')
    .then((response) => {
        const mydata = response.data.data.movies;
        setData(mydata);
    })
    .catch(error => {
        console.log(error);
    });
   },[]);



    const rightSlide = () => {
        (current < movies.length - 1) ?  setCurrent(current + 1) : setCurrent(0); 
        console.log(current)
      };
    
      const leftSlide = () => {
        (current > 0) ?  setCurrent(current - 1) : setCurrent(3); 
        console.log(current)
      };

    return (
        <section className="movie_slides">
            
            <FaArrowAltCircleLeft className="left-arrow" onClick={leftSlide} />
            <div className="movie" >
                {
                    movies.map((item, index) => {
                        return (
                            <div key = {item.id}>
                                {   index === current &&
                                    (
                                        <div 
                                            className="slide_movie"
                                            style={{backgroundImage: `url(${item.background_image})`}}
                                            
                                        >
                                            <article className="detail_slide">
                                                <h3>{item.title}</h3>
                                                <p>Rating: {item.rating}</p>
                                                <p>Duration: {item.runtime}min</p>
                                
                                                <p>{item.summary}</p>
                                            </article>
                                        </div>
                                    )
                                }
                            </div>
                        )
                                      
                    })
                }
            </div>

            <FaArrowAltCircleRight className="right-arrow" onClick={rightSlide} />
        </section>
    )
}

export default MovieSlider;
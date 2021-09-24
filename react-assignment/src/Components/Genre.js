import React from 'react'
import './genre.css';
import { Header } from '../../components/header/Header'
import { MovieCard } from '../../components/movieCard/MovieCard';
import axios from 'axios';
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import { Footer } from '../../components/footer/Footer';

export const Genre = () => {

    const { title } = useParams();
    const [movies, setMovies] = useState([]);
    const api =`https://yts.mx/api/v2/list_movies.json?genre=${title}&limit=20`
    
    const fetchMovie = () => {
        axios.get(api)
        .then(res => {
            const data = res.data.data.movies;
            setMovies(data); 
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        fetchMovie();
    },[title])
    return (
        <>
            < Header />

            <section className="wrapper">
                <h1 className="title__wrapper">{title.toUpperCase()}</h1>

                <div className="content__wrapper">
                    {
                        movies.map(item=>{
                            return (
                                <div key={item.id}>
                                    < MovieCard movie={item} watchList={false}/>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <Footer />
        </>
    )
}
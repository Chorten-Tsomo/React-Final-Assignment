import React from 'react'
import './movieCard.css';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';


export const MovieCard = ({movie, watchList}) => {
    
    const data = movie;
    const history = useHistory(); 
    const [localKeys, setLocalKeys] = useState(Object.keys(localStorage));

    const handleClick = () => {
        history.push("/movie", data)
    }

    const checkIsWatched = (id) => {
        if (localKeys.includes((id).toString())) {
            const storageData = localStorage.getItem(id);
            const parsedData = JSON.parse(storageData);
            if (parsedData.watched) {
                return true
            }else{
                return false
            }
        }else{
            return false
        }           
    }

    const checkisWatchList = (id) => {
        if (localKeys.includes((id).toString())) {
            const storageData = localStorage.getItem(id);
            const parsedData = JSON.parse(storageData);

            if (parsedData.watchList) {
                return true
            }else{
                return false
            }
        }else{
            return false
        }           
    }

    const addToList = () => {
        if (checkIsWatched(data.id)) {
            const watchList = {watchList: true, watched: true}
            const newData = {...data, ...watchList}
            localStorage.setItem(+(data.id), JSON.stringify(newData));
        }else{
            const watchList = {watchList: true}
            const newData = {...data, ...watchList}
            localStorage.setItem(+(data.id), JSON.stringify(newData));
            setLocalKeys(Object.keys(localStorage));
        }
    }

    const markWatched = () => {
        if (localKeys.includes((data.id).toString()) && checkisWatchList(data.id)) {
            const watched = {watchList: true, watched: true}
            const newData = {...data, ...watched}
            localStorage.setItem(+(data.id), JSON.stringify(newData));
        } else {
            const watched = {watched: true}
            const newData = {...data, ...watched}
            setLocalKeys(Object.keys(localStorage));
            localStorage.setItem(+(data.id), JSON.stringify(newData));
        }
    }

    const removeFromList = () => {
        if (checkIsWatched(data.id)) {
            localStorage.removeItem((data.id));
            localStorage.setItem(+(data.id), JSON.stringify({watched: true}));
        } else {
            localStorage.removeItem((data.id));
            setLocalKeys(Object.keys(localStorage));
        }
    }

    useEffect(()=>{
        if (localStorage.length > 0)
        {setTimeout(()=>{setLocalKeys(Object.keys(localStorage))}, 100)}
    },[localKeys])    

    return (
        <section 
            className="movieCard"
            style={{backgroundImage: `url(${data.medium_cover_image})`}}
        > 
            <article className="card" >
                 <div className="content__card" onClick={handleClick}>
                    <h3 >{data.title_english}</h3>
                    <p>Rating: {data.rating}</p>
                    <p>Duration: {data.runtime}min</p>
                </div>

                <div className="content__card">
                    {   !watchList &&
                        <button className="button__content" onClick={addToList}>
                            { checkisWatchList(data.id)? "Added to WatchList" : "Add to WatchList"}
                        </button>
                    }

                    {   watchList &&
                        <button className="button__content button--remove" onClick={removeFromList}>
                            Remove from WatchList
                        </button>
                    }
                    
                    { checkIsWatched(data.id)? 
                        <div className="plain__content">
                            <p>Watched</p>
                        </div>: 

                        <button className="button__content" onClick={markWatched}>
                            Mark as Watched
                        </button> 
                    }
                    
                </div>
            </article>   

        </section> 
    )
}
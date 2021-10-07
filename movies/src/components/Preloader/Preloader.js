import React from 'react'
import './Preloader.css'

const Preloader = ({isFetching}) => {
    return (
        <div className={`preloader ${ !isFetching && "preloader_disabled" }`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader

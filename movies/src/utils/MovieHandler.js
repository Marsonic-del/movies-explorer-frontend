export const movieCounter = () => {
    if(window.innerWidth <= 480) {
        return {
            filmCounter: 5,
            filmRow: 2
        }
    }
    if((window.innerWidth > 480) &&  (window.innerWidth <= 768)) {
        return {
            filmCounter: 8,
            filmRow: 2
        }
    }
    else {
        return {
            filmCounter: 12,
            filmRow: 3
        }
    }
}

export const handleFilmsToShow = (filteredFilms, setFilmsToShow, setMoreOn, isShortFilm) => {
    const { filmCounter } = movieCounter();
    const shortFilmDuration = 40;
    const shortFilms = filteredFilms.filter(film => film.duration <= shortFilmDuration);
    const filmsToShow = isShortFilm ? shortFilms : filteredFilms

    if(filmsToShow.length <= filmCounter) {
        setFilmsToShow(filmsToShow)
        setMoreOn(false)
    }
    else {
        setFilmsToShow(filmsToShow.slice(0, filmCounter))
        setMoreOn(true)
    }
}

export const handleMoreClick = (filmsToShow, filteredFilms, setFilmsToShow, setMoreOn, isShortFilm) => {
    const { filmRow } = movieCounter();
    const shortFilmDuration = 40;
    const shortFilms = filteredFilms.filter(film => film.duration <= shortFilmDuration);
    const moviesToShow = isShortFilm ? shortFilms : filteredFilms

    if((filmsToShow.length + filmRow) < moviesToShow.length) {
        setFilmsToShow(moviesToShow.slice(0, (filmsToShow.length + filmRow)))
    }
    else {
        
        setFilmsToShow(moviesToShow)
        setMoreOn(false)
    }
}
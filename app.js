'use strict';


function Film(filmID, name, favorite=false, date, rating){
    this.filmID = filmID;
    this.name = name;
    this.favorite = favorite;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary(){
    this.films = [];

    this.init = () => {
        this.films.push(new Film(1, 'Pulp Fiction', true, dayjs('2022-3-10'), 5));
        this.films.push(new Film(2, 'Grams', true, dayjs('2022-2-17'), 3));
        this.films.push(new Film(3, 'Star Wars', false));
        this.films.push(new Film(4, 'Matrix', false));
        this.films.push(new Film(5, 'Shrek', false, dayjs('2022-3-21'), 4));
    }

    // get all films
    this.getAll = () => {
        return this.films;
    }

    // get favourite films
    this.getFavorites = () => {
        return this.films.filter(f => f.favorite);
    };

    // get films with 5 star
    this.getBestRated = () => {
        return this.films.filter(f => f.rating == 5);
    };

    // get films seen between last month and today
    this.getSeenLastMonth = () => {
        const lastMonth = dayjs().subtract(30, 'day');
        return this.films.filter(f => f.date !== undefined && f.date.isAfter(lastMonth));
    }

    // get unseen films
    this.getUnseen = () => {
        return this.films.filter(f => f.date === undefined);
    };

    // add new Film
    this.addNewFilm = film => this.films.push(film);

    // change value of film favourite
    this.changeFavorite = (filmID) => {
        const film = this.films.find(f => f.filmID === filmID);
        film.favorite = !film.favorite;
    };

    // sort films by date
    this.sortByDate = () => {
        const sortFilms = this.films.filter(f => f.date !== undefined).sort((f1, f2) => f1.date.isAfter(f2.date));
        this.films.filter(f => f.date === undefined).forEach(f => sortFilms.push(f));
        return sortFilms;
    };

    // delete film
    this.deleteFilm = (filmID) => {
        this.films.splice(this.films.findIndex(f => f.filmID === filmID), 1);
    };

    // reset date of watched films
    this.resetWatchedFilms = () => {
        this.films.forEach(f => f.date = undefined);
    };

    // get Rated film
    this.getRated = () => {
        return this.films.filter(f => f.rating !== undefined).sort((f1, f2) => f2.rating - f1.rating);
    };
}


// CREATE FILM ROW: creating the single elements
function createFilmRow(film) {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    // add trash icon + name
    tdName.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill trash-icon" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
         </svg> ${film.name}`;
    tr.appendChild(tdName);
    
    const tdFavorite = document.createElement('td');
    tdFavorite.innerHTML = `<input type="checkbox" class="favorite-checkbox" ${film.favorite ? 'checked': ''}> Favourite`;
    tr.appendChild(tdFavorite);

    const tdDate = document.createElement('td');
    tdDate.innerText = film.date ? film.date.format('YYYY-MM-DD') : '';
    tr.appendChild(tdDate);

    const tdStar = document.createElement('td');
    let i = 0;
    const score = film.rating ?? 0;
    while(i < 5){
        let star;
        if(i < score){
            star = document.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                 </svg>`;
        }
        else{
            star = document.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star empty-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                 </svg>`;
        }
        tdStar.innerHTML += star;
        i++;
    }
    tr.appendChild(tdStar);
    return tr;
}


// Fill Table
function fillFilmTable(filmLib, films) {
    const filmTableHeader = document.getElementById('film-table-header');
    const filmTable = document.getElementById('film-table-body');
    // set filter text as header
    filmTableHeader.innerText = `${document.getElementById('filters').querySelector('.active').innerText}`;
    for(const film of films) {
        const filmEl = createFilmRow(film);
        // add event to trash icon (delete film from filmLib)
        filmEl.querySelector('.trash-icon').addEventListener('click', e => {
            filmLib.deleteFilm(film.filmID);
            filmEl.innerHTML = '';
        });

        filmEl.querySelector('.favorite-checkbox').addEventListener('click', e => {
            filmLib.changeFavorite(film.filmID);
            // if active filter is favorites then remove element
            if(filmTableHeader.innerText === 'Favorites')
                filmEl.innerHTML = '';
        });
        filmTable.prepend(filmEl);
    }
}

// Delete Table
function deleteFilmTable(){
    const filmTable = document.getElementById('film-table-body');
    filmTable.innerHTML = '';
}

// Add EventListener for filters
function addFilterEvents(filmLib){
    const filters = document.getElementById('filters');
    for(let el of filters.getElementsByTagName('a')){
        el.addEventListener('click', e => {
            filters.querySelector('.active').classList.remove('active');       // remove active element
            el.classList.add('active');                                        // set element as active
            applyFilter(el.id, filmLib);
        });
    }
}

// Apply filters
function applyFilter(filterID, filmLib){
    deleteFilmTable();
    switch(filterID){
        case 'filter-all':{
            fillFilmTable(filmLib, filmLib.getAll());
            break;
        }
        case 'filter-favorites':{
            fillFilmTable(filmLib ,filmLib.getFavorites());
            break;
        }
        case 'filter-best':{
            fillFilmTable(filmLib, filmLib.getBestRated());
            break;
        }
        case 'filter-seen-last-month':{
            fillFilmTable(filmLib, filmLib.getSeenLastMonth());
            break;
        }
        case 'filter-unseen':{
            fillFilmTable(filmLib, filmLib.getUnseen());
            break;
        }
        default:{ }
    }
}



/* Main */
const filmLib = new FilmLibrary();
filmLib.init();
addFilterEvents(filmLib);
fillFilmTable(filmLib, filmLib.getAll());
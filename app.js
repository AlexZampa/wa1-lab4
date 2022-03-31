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
        this.films.push(new Film(2, 'Grams', true, dayjs('2022-3-17'), 3));
        this.films.push(new Film(3, 'Star Wars', false));
        this.films.push(new Film(4, 'Matrix', false));
        this.films.push(new Film(5, 'Shrek', false, dayjs('2022-3-21'), 4));
    }

    this.getAll = () => {
        return this.films;
    }

    // add new Film
    this.addNewFilm = film => this.films.push(film);

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



// STRING LITERAL WAY
/*function createfilmRow(film) {
  return `<tr>
    <td>${film.date.format('YYYY-MM-DD')}</td>
    <td>${film.name}</td>
    <td>${film.credits}</td>
    <td>${film.score} ${(film.laude ? 'L' : '')}</td>
    <td><button class="btn btn-danger">X</button></td>
  </tr>`;
}*/

// CLASSIC WAY: creating the single elements
function createFilmRow(film) {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.innerText = film.name;
    tr.appendChild(tdName);
    
    const tdFavorite = document.createElement('td');
    tdFavorite.innerHTML = `<input type="checkbox" ${film.favorite ? 'checked': ''}> Favourite`;
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

    /*
    const tdActions = document.createElement('td');
    tdActions.innerHTML = `<button id="film-${film.code}" class="btn btn-danger">X</button>`;
    tr.appendChild(tdActions);

    tdActions.addEventListener('click', e => {
        tr.remove();
        console.log(e.target.id);
    });
*/
    return tr;
}

function fillFilmTable(films) {
  const filmTable = document.getElementById('film-table-body');

  for(const film of films) {
    const filmEl = createFilmRow(film);
    // classic way:
    filmTable.prepend(filmEl);
    // string literal way:
    //filmTable.insertAdjacentHTML('afterbegin', filmEl);
  }
}

/* Main */
const filmLib = new FilmLibrary();
filmLib.init();
const films = filmLib.getAll();
fillFilmTable(films);
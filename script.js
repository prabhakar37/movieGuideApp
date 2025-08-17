const searchBar = document.querySelector("#search-bar")
const searchButton = document.querySelector("#search-button");
const posterContainer = document.querySelector(".poster-container");
const movieDetailBox = document.querySelector(".movie-details-box");
const removeButton = document.querySelector("#remove-button");
const movieContainer = document.querySelector('.movie-container');
const displayInfo = document.querySelector('.display-info')


searchButton.addEventListener('click', function(){
    // console.log(searchBar.value);
    if(searchBar.value.trim()){
        fetchData(searchBar.value.trim())
    }
    searchBar.value = '';
})

async function fetchData(inputValue) {
  const searchQuery = inputValue;
  const apiKey = "f8d48b10";
  const movieDetailsUrl = `http://www.omdbapi.com/?t=${searchQuery}&apikey=${apiKey}`;

  //  When...  /?t=${}
  try {
    const dataResponse = await fetch(movieDetailsUrl);
    const data = await dataResponse.json();
    // console.log(data);

    // destructuring
    const { Poster, Title, imdbRating, Released,Genre, Runtime, Actors, Plot } = data;

    if(!dataResponse.ok){
      throw new Error("Unable to fetch data")
    }
    else if (new RegExp(searchQuery, "i").test(`${Title}`)) {
      const imgHtml = `<img src="${Poster}" alt="">`;
      posterContainer.innerHTML = imgHtml;

      const movieInfoHtml = `
            <div class="movies-title">
                <h3>${Title}</h3>
                <p><b>Rating: </b>&#11088; ${imdbRating}</p>
                <div class="movie-genre"></div>
            </div>
            <div class="movies-info">
                <p><b>Release Date: </b>${Released}</p>
                <p><b>Duration: </b>${Runtime}</p>
                <p><b>Cast: </b>${Actors}</p>
                <p><b>Plot:</b> ${Plot}</p>
            </div>
        `;
      movieDetailBox.innerHTML = movieInfoHtml;

      // inserting movie Genre 
      const movieGenre = document.querySelector(".movie-genre");
      Genre.split(",").forEach(val => {
        const p= document.createElement('p');      
        p.textContent = val;
        movieGenre.appendChild(p);

        displayInfo.textContent = '';
      });
    }
    else{
      movieContainer.remove();
      displayInfo.textContent = `${data.Error}`;

    }
  } catch (err) {    
    console.log(err);
  }
}
// fetchData()


// Remove Movie info after fetch
removeButton.addEventListener('click', function(){
  movieContainer.remove();
  displayInfo.textContent = "Search Movie detail here"
})

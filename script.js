const searchBar = document.querySelector("#search-bar")
const searchButton = document.querySelector("#search-button");
const posterContainer = document.querySelector(".poster-container");
const movieDetailBox = document.querySelector(".movie-details-box");

const removeButton = document.querySelector("#remove-button")


searchButton.addEventListener('click', function(){
    // console.log(searchBar.value);
    if(searchBar.value){
        // fetchData(searchBar.value)
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
    console.log(data);

    // destructuring
    const { Poster, Title, imdbRating, Released,Genre, Runtime, Actors, Plot } = data;

    if (new RegExp(inputValue, "i").test(`${Title}`)) {
      const imgHtml = `<img src="${Poster}" alt="">`;
      posterContainer.innerHTML = imgHtml;

      const movieInfoHtml = `
            <div class="movies-title">
                <h3>${Title}</h3>
                <p>Rating: ${imdbRating}</p>
            </div>
            <div class="movies-info">
                <p><b>Release Date: </b>${Released}</p>
                <p><b>Genre: </b>${Genre}</p>
                <p><b>Duration: </b>${Runtime}</p>
                <p><b>Cast: </b>${Actors}</p>
                <p><b>Plot:</b> ${Plot}</p>
            </div>
        `;
      movieDetailBox.innerHTML = movieInfoHtml;
    }
  } catch (err) {
    console.log(err);
  }
}
fetchData()


// try to remove
removeButton.addEventListener('click', function(){
    removeButton(fetchData)
})

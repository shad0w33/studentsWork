const search = document.querySelector("#search");
const form = document.querySelector('#form');
const movieElements = document.querySelector("#rowContainer");
// const movieImg = "https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg";



form.addEventListener('submit', getMovie);


async function getMovie(e) {
  e.preventDefault();
  movieElements.innerHTML = "";
  if (search.value.length >= 3) {
    const name = search.value;
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${name}`);
    const films = response.data
    render(films);
    search.value = "";
    // console.log(response);

  };
}


function render(films) {
  for (let i = 0; i < films.length; i++) {
    console.log(films[i]);
    createCard(films[i])
  };
}




function createCard(movie) {

  const score = movie.score * 5;
  const scoreStars = "★".repeat(score);



  const filmImg = movie.show.image.medium ? movie.show.image.medium : "https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg";

  const movieEl = document.createElement("div");
  movieEl.setAttribute('class', 'col');

  movieEl.innerHTML = `
        
          <div class="card shadow-sm">
            <img
              style="width: 100%; height: 250px"
              src="${filmImg}"
            />
            <div class="card-body">
              <h3>${movie.show.name}</h3>
              <div class="card-text">
              ${movie.show.summary}
              </div>
              <div
                class="d-flex justify-content-between align-items-center"
              >
                <div class="btn-group">
                  <a
                  
                    class="btn btn-sm btn-outline-secondary" href="${movie.show.url}"
                  >
                    Visit site
                  </a>
                </div>
                <div class="score">${scoreStars}
                  
                </div>
              </div>
            </div>
            </div>
            </div>`;
  movieElements.appendChild(movieEl);
};



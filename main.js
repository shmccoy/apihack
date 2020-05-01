function watchMovieSubmit(event) {
  event.preventDefault();
  //get the value
  const searchBarMovie = $("#titleForm").val();
  performMovieSearch(searchBarMovie);
}

function watchActorSubmit(event) {
  event.preventDefault();
  const searchBarActor = $("#actorForm").val();
  performActorSearch(searchBarActor);
}

function newReleases() {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=625e6305ec06081d9670035238e43576&language=en-US";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const movies = data.results;
      const sortedMovies = movies.sort(sortCriteria).slice(0, 5);
      renderNewReleases(sortedMovies);
    });
}
newReleases();

function sortCriteria(a, b) {
  if (moment(b.release_date).isAfter(a.release_date)) {
    return 1;
  } else {
    if (moment(b.release_date).isSame(a.release_date)) {
      return 0;
    } else {
      return -1;
    }
  }
}

function performMovieSearch(query) {
  const base_url =
    "https://api.themoviedb.org/3/search/movie?api_key=625e6305ec06081d9670035238e43576&language=en-US";
  const url = `${base_url}&query=${query}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => renderMovie(data.results))
    .catch(error => {
      $(".result").html(error.message);
    });
}

function performActorSearch(query) {
  const base_url =
    "https://api.themoviedb.org/3/search/person?api_key=625e6305ec06081d9670035238e43576&language=en-US";
  const url = `${base_url}&query=${query}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => renderActor(data.results[0].known_for))
    .catch(error => {
      $("#actor").html(error.message);
    });
}

function renderNewReleases(results) {
  $(".slide-show").html(
    results
      .map(
         item => {
          let imgPath = (!item.poster_path ? "https://previews.123rf.com/images/briang77/briang771602/briang77160200065/51883561-movie-film-reel.jpg" : `https://image.tmdb.org/t/p/w500${item.poster_path}`);  
          return `<section class="slide">
        <img src= "${imgPath}" class="poster"/>
        </section>`
      }
      )
      .join("")
  );
  showSlides();
  setInterval(showSlides, 5000);
}

let slideIndex = 0;

function showSlides() {
  let i;
  let slides = $(".slide");
  slides.css({ opacity: 0 });
  slides.eq(slideIndex).css({ opacity: 1 });
  slideIndex++;
  if (slideIndex > slides.length - 1) {
    slideIndex = 0;
  }
}

function renderMovie(results) {
  $("#movie").html(
    results
      .map(
         item => {
          let imgPath = (!item.poster_path  ? "https://previews.123rf.com/images/briang77/briang771602/briang77160200065/51883561-movie-film-reel.jpg" : `https://image.tmdb.org/t/p/w500${item.poster_path}`);  
          return `<section class="image">
        <img src= "${imgPath}" class="poster"/>
        <section class="content">
      <h2>${item.title}</h2>
      <p>${item.overview}</p>
      </section>
    </section>`
      }
      )
      .join("")
  );

}

function renderActor(results) {
  $("#actor").html(
    results
      .map(
         item => {
          let imgPath = (!item.poster_path ? "https://previews.123rf.com/images/briang77/briang771602/briang77160200065/51883561-movie-film-reel.jpg" : `https://image.tmdb.org/t/p/w500${item.poster_path}`);  
          return `<section class="image">
        <img src= "${imgPath}" class="poster"/>
        <section class="content">
      <h2>${item.title}</h2>
      <p>${item.overview}</p>
      </section>
    </section>`
      }
      )
      .join("")
  );
}

function main() {
  $(".searchBarMovie").submit(watchMovieSubmit);
  $(".searchBarActor").submit(watchActorSubmit);

  $(".tablink").click(tabLinkHandler);

  /*$("body").on("error", "img", () => {
    console.log("error");
    $(this).attr("src", "https://previews.123rf.com/images/briang77/briang771602/briang77160200065/51883561-movie-film-reel.jpg")
  })*/

  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
}
//the jQuery ready function
$(main);

function tabLinkHandler(e) {
  const btn = $(e.target).data("tab");

  $(".tabcontent").hide();
  $(".tablink").removeClass("selectedTab");
  $(e.target).addClass("selectedTab");

  $(`#${btn}`).show();
}
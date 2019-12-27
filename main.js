function watchMovieSubmit(event) {
  event.preventDefault();
  //get the value
  const searchBarMovie = $("#titleForm").val();
  performMovieSearch(searchBarMovie);
  console.log(searchBarMovie);
  console.log("test0");
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
      console.log(sortedMovies);
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
  console.log("test1");
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
    .then(data => renderActor(data.results))
    .catch(error => {
      $("#actor").html(error.message);
    });
  console.log("test2");
}

function renderNewReleases(results) {
  console.log(results);
  $("#newreleases").html(
    results
      .map(
        item => `<div class="slideshow-container">
      <img src= "https://image.tmdb.org/t/p/w500${item.poster_path}"/>
      </div>
      <br>
        <div style="text-align:center">
        <span class="dot"></span> 
        <span class="dot"></span> 
        <span class="dot"></span> 
        </div>`
      )
      .join("")
  );
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


function renderMovie(results) {
  console.log(results);
  $("#movie").html(
    results
      .map(
        item => `<div class="image">
      <img src= "https://image.tmdb.org/t/p/w500${item.poster_path}"/>
      <div class="content">
      <h2>${item.title}</h2>
      <p>${item.overview}</p>
      </div>
    </div>`
      )
      .join("")
  );
  console.log("test3");
}

function renderActor(results) {
  console.log(results);
  $("#actor").html(
    results
      .map(
        item => `<div class="image">
      <img src= "https://image.tmdb.org/t/p/w500${item.known_for[0].poster_path}"/>
      <div class="content">
      <h2>${item.known_for[0].title}</h2>
      <p>${item.known_for[0].overview}</p>
      </div>
    </div>`
      )
      .join("")
  );
  console.log("test4");
}

function main() {
  console.log("The main function");
  $(".searchBarMovie").submit(watchMovieSubmit);
  $(".searchBarActor").submit(watchActorSubmit);
  

  $(".tablink").click(tabLinkHandler);

  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
  console.log('test5');
}
//the jQuery ready function
$(main);

function tabLinkHandler(e) {
  const btn = $(e.target).data("tab");
  console.log(btn);

  $(".tabcontent").hide();
  $(".tablink").removeClass("selectedTab");
  $(e.target).addClass("selectedTab");

  $(`#${btn}`).show();
}

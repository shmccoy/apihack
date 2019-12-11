function watchSubmit(event) {
    event.preventDefault();
    //get the value
    const searchBar = $("#titleForm").val();
    performApiSearch(searchBar);
  console.log('test');
  }


function performApiSearch(query) {
    const base_url = "https://api.themoviedb.org/3/search/movie?api_key=625e6305ec06081d9670035238e43576&language=en-US";
    const url = `${base_url}&query=${query}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => render(data.results))
      .catch(error => {
        $(".result").html(error.message);
      });
  console.log('test2');
  }

  function render(results) {
      
    $(".result").html(
      results
        .map(
          item => `<div class="image">
      <img src= "https://image.tmdb.org/t/p/w500${results.poster_path[0]}"/>
      <div class="content">
      <h2>${results.title[0]}</h2>
      <p>${results.overview[0]}</p>
      </div>
    </div>`
        )
        .join("")
    );
    console.log('test3');
  }

  function main() {
    $("#titleForm").submit(watchSubmit);
    // Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

  }
  //the jQuery ready function
  $(main);


function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}


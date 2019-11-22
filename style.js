window.addEventListener("load", e => {
    const url = "http://www.omdbapi.com/?apikey=7b56d36";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const output = data.collection.items
                .map(
                    item => `
        <div>
          <h2>${item.data[0].title}</h2>
          <img src="${item.links[0].href}" />
          <p>${item.data[0].description}</p>
      </div>`
                )
                .join("");
            document.querySelector(".results").innerHTML = output;
        })
        .catch(error => console.log(error.message));
});
fetch('http://omdbapi.com/?apikey=7b56d36&t=it')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(movie => console.log(movie));

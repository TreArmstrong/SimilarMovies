document.getElementById('submitButton').addEventListener('click', async () => {
    const movieInput = document.getElementById('movieInput').value;
    if (movieInput.trim() === '') {
        alert('Please enter a movie ID or title.');
        return;
    }

    try {
        const response = await fetch(`/get-similar-movies?movieInput=${movieInput}`);
        const data = await response.json();
        
        const similarMoviesDiv = document.getElementById('similarMovies');
        similarMoviesDiv.innerHTML = '<h2>Similar Movies:</h2>';
        
        data.forEach(movie => {
            similarMoviesDiv.innerHTML += `<p>${movie.title}</p>`;
        });
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        alert('Error fetching similar movies. Please try again.');
    }
});

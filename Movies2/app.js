require('dotenv').config(); // Loads my .env file

const express = require('express');// Importing the express framework
const path = require('path');

let fetch; // importing node-fetch
(async () => {
    try {
        const { default: fetchModule } = await import('node-fetch');
        fetch = fetchModule;
    } catch (error) {
        console.error('Error importing node-fetch:', error);
    }
})();

//Dev practice 
const apiKey = process.env.API_KEY; // Access API key from environment variable

const app = express();
const port = 3000;



// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { data: [] });
});

app.get('/get-similar-movies', async (req, res) => {
   
    const { movieId, movieTitle } = req.query;
    let url = '';

    if (movieId) {
        url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`;
    } else if (movieTitle) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`;
    } else {
        return res.status(400).send('Please provide a movie ID or movie title.');
    }

    const options = { method: 'GET', headers: { 'Accept': 'application/json' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.render('index', { data: data.results });
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        return res.status(500).send('Error fetching similar movies');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

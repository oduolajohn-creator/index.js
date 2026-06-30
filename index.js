const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

// Mock Data
let movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi" },
  { id: 2, title: "The Dark Knight", genre: "Action" }
];

// Start Server
app.listen(PORT, () => {
  console.log(`🎬 Server spinning on port ${PORT}`);
});



// 🟢 GET: Fetch all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// 🟡 POST: Add a new movie
app.post('/api/movies', (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    genre: req.body.genre
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// 🔵 PUT: Update an existing movie
app.put('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id);
  
  if (!movie) return res.status(404).send('Movie not found');
  
  movie.title = req.body.title || movie.title;
  movie.genre = req.body.genre || movie.genre;
  
  res.json(movie);
});

// 🔴 DELETE: Remove a movie
app.delete('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter(m => m.id !== id);
  res.json({ message: `Movie with id ${id} deleted` });
});

document.addEventListener('DOMContentLoaded', () => {
    getMovies();
  
    document.getElementById('movieForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      await createMovie();
    });
  
    document.getElementById('updateForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      await updateMovie();
    });
  
    document.getElementById('deleteForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      await deleteMovie();
    });
  
    document.getElementById('getMoviesButton').addEventListener('click', () => {
      getMovies();
    });
  });
  
  async function getMovies() {
    try {
      const response = await fetch('http://localhost:3000/api/v1/movies');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const moviesData = await response.json();
  
      if (!moviesData.data || !moviesData.data.movies) {
        throw new Error('Invalid response format');
      }
  
      const movies = moviesData.data.movies;
  
      const movieList = document.getElementById('movieList');
      movieList.innerHTML = '';
  
      movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = `${movie.name} - ${movie.releaseYear} - ${movie.duration} minutes`;
  
        movieList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  
  
  async function createMovie() {
    try {
      const name = document.getElementById('name').value;
      const releaseYear = parseInt(document.getElementById('releaseYear').value);
      const duration = parseInt(document.getElementById('duration').value);
  
      await fetch('http://localhost:3000/api/v1/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, releaseYear, duration }),
      });
  
      getMovies(); // Update the movie list after creating a new movie
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  }
  
  async function updateMovie() {
    try {
      const movieId = document.getElementById('updateMovieId').value;
      const field = document.getElementById('updateField').value;
      const value = document.getElementById('updateValue').value;
  
      await fetch(`http://localhost:3000/api/v1/movies/${movieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });
  
      getMovies(); // Update the movie list after updating a movie
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  }
  
  async function deleteMovie() {
    try {
      const movieId = document.getElementById('deleteMovieId').value;
      if (movieId) {
        await fetch(`http://localhost:3000/api/v1/movies/${movieId}`, {
          method: 'DELETE',
        });
  
        getMovies(); // Update the movie list after deleting a movie
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  }
  
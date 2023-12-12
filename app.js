const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const Movie = require('./models/movieModel');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const start = async () => {
try {
    await connectDB();
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
} catch (error) {
    console.log(error);
}
};

// get api
app.get('/api/v1/movies', async (req, res) => {
try {
    const movies = await Movie.find();
    res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
        movies: movies,
    },
    });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// post api
app.post('/api/v1/movies', async (req, res) => {
try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
    status: "success",
    data: {
        movie: newMovie,
    },
    });
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// patch api
app.patch('/api/v1/movies/:id', async (req, res) => {
try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    });
    res.status(200).json({
    status: "success",
    data: {
        movie: updatedMovie,
    },
    });
} catch (error) {
    res.status(404).json({ error: 'Movie not found' });
}
});

// delete api
app.delete('/api/v1/movies/:id', async (req, res) => {
try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
    status: "success",
    data: {
        movie: null,
    },
    });
} catch (error) {
    res.status(404).json({ error: 'Movie not found' });
}
});

start();

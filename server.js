const express = require('../dependencies/node_modules/express');
const bodyParser = require('../dependencies/node_modules/body-parser');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

// Simulate a database with an array of objects
let db = [
  { id: 1, title: "Why did the scarecrow win an award?", comedian: "Jack Benny", year: 2000 },
  { id: 2, title: "What do you call a fish with no eyes?", comedian: "Groucho Marx", year: 1950 },
];

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data

// GET /home - Return all jokes
app.get('/home', (req, res) => {
  res.json(db);
});

// POST /home - Add a new joke to the database
app.post('/home', (req, res) => {
  const newJoke = req.body;
  // Assign a unique ID (assuming no deletion)
  newJoke.id = db.length + 1;
  db.push(newJoke);
  res.json(db); // Return the updated database
});

// PATCH /joke/:id - Update a joke by ID
app.patch('/joke/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  const updatedJoke = req.body;

  const jokeIndex = db.findIndex((joke) => joke.id === jokeId);
  if (jokeIndex !== -1) {
    db[jokeIndex] = { ...db[jokeIndex], ...updatedJoke }; // Update existing joke
    res.json(db[jokeIndex]); // Return the updated joke
  } else {
    res.status(404).send('Joke not found'); // Error handling for non-existent ID
  }
});

// DELETE /joke/:id - Delete a joke by ID
app.delete('/joke/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  const jokeIndex = db.findIndex((joke) => joke.id === jokeId);
  if (jokeIndex !== -1) {
    const deletedJoke = db.splice(jokeIndex, 1)[0]; // Remove and return deleted joke
    res.json(deletedJoke);
  } else {
    res.status(404).send('Joke not found'); // Error handling for non-existent ID
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
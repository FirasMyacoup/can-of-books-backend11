'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(express.json())

app.get('/test', (request, response) => {
  response.send('test request received')
})

// requiring the bookSchema module
const { handleBookSchema } = require('./modules/BookSchema');
const { createNewBook } = require('./modules/BookSchema');
const { deleteBook } = require('./modules/BookSchema');
const { updateBook } = require('./modules/BookSchema');

// CRUD routes
app.get('/books', handleBookSchema);
app.post('/books', createNewBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);




app.listen(PORT, () => console.log(`listening on ${PORT}`));
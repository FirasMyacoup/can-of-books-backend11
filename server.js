'use strict';

const bookModel=require('./modules/schema');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const app = express();
app.use(cors());

const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:3000');


function Books(){
  const first= new Book({
    title: "first book ",
  decription:"my code",
  status:"Old"
  });
  const second= new Book({
    title: "second book",
  decription:"happy",
  status:"New"
  });
  const third= new Book({
    title: "third book",
  decription:"sad",
  status:"Old"
  });

  

}



app.get('/books', (request, response) => {
  bookModel.Book.find({},(error,data)=>{
    if(error){
      response.status(500).send("error ");
    }
    else{
      response.status(200).send(data);
    }
  });
});

app.get('*', (request, response) => {

  response.send('No requests!')

})

app.listen(PORT, () => console.log(`in ${PORT}`));
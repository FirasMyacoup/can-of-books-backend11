const mongoose = require('mongoose');

function handleBookSchema(req, res) {

    BookModel.find({}, (error, data) => {
        if (error) console.log(`error reading from the database: ${error}`);
        else res.send(data);
    });

}

function createNewBook(req, res) {
    const { newBook } = req.body;
    const book = new BookModel(newBook);
    book.save();
    res.status(201).send(book);
}

function deleteBook(req, res) {
    const id = req.params.id;
    BookModel.findByIdAndDelete(id).then(record => {
        res.send(record);
    }).catch(error => {
        res.status(500).send(error.message)
    })
}

function updateBook(req, res) {
    const id = req.params.id;
    const { data } = req.body;
    BookModel.findByIdAndUpdate(id, data).then(record => {
        res.send(record);
    }).catch(error => {
        res.status(500).send(error.message)
    })
}


mongoose.connect('mongodb://127.0.0.1:27017/booksDB')


const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    imgURL: String
})


const BookModel = mongoose.model('BookModel', bookSchema);


const book1 = new BookModel({
    title: 'sami yacoup',
    description: 'the life of a gamer',
    status: 'in process',
    imgURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDIrfLZiXYpG7hfqOI7xoHlJ4bwAxlALIVX44pyqqtA&s"
    
})

const book2 = new BookModel({
    title: 'firas yacoup ',
    description: 'the life of a programmer.',
    status: 'avaliable',
    imgURL:"https://e7.pngegg.com/pngimages/124/992/png-clipart-programmer-computer-programming-open-programming-language-programmer-furniture-reading.png"
   
})







module.exports = { handleBookSchema, createNewBook, deleteBook, updateBook }

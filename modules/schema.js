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
    title: 'Think and Grow Rich',
    description: 'A book about an explanation of the Law of Success philosophy which includes thirteen steps to riches (financial, emotional, and spiritual)',
    status: 'in process',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/61AtWVLF2CL.jpg'
})

const book2 = new BookModel({
    title: 'The 7 Habits of Highly Effective People',
    description: 'Puts forward a principle-centered approach to both personal and interpersonal effectiveness. Rather than focusing on altering the outward manifestations of your behavior and attitudes, it aims to adapt your inner core, character, and motives.',
    status: 'avaliable',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/71bv3XdE90L.jpg'
})

const book3 = new BookModel({
    title: 'Rich Dad Poor Dad',
    description: 'Robert Kiyosaki and his two dads—his real father (poor dad) and the father of his best friend (rich dad)—and the ways in which both men shaped his thoughts about money and investing. You dont need to earn a high income to be rich. Rich people make money work for them.',
    status: 'avaliable',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg'
})





module.exports = { handleBookSchema, createNewBook, deleteBook, updateBook }

import express from "express";
const router = express.Router()
import { Book } from "../model/bookModel.js";


// router.get('/', (req, res) => {
//     console.log(req.headers);
//     return res.status(201).send('hello')
// })

// Route for Get all books from database
router.get('/', async(req, res) => {
    try {
        const books = await Book.find({})
        res.status(201).send({
            count: books.length,
            data: books
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
})

// Route for Get all books from database by id
router.get('/getBooks/:id', async(req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(201).send(book)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
})

// Route for save a new book
router.post('/createBooks', async (req, res) => {
 try {
    /* validate */
    if(!req.body.title || !req.body.author || !req.body.publishYear) {
        res.status(400).send({
            message: 'send all required fields: title, author, publishYear',
        })
    }

    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    }

    const book = await Book.create(newBook)
    res.status(201).send(book)
 } catch(err) {
    console.log(err.message)
    res.status(500).send({ error: err.message })
 }
})

// Route update for a books
router.post('/updateBooks/:id', async(req, res) => {
    try {
        /* validate */
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            })
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result) {
            res.status(404).json({ message: 'Book not found' })
        }
        
        res.status(201).send({ message: 'Book updated successfully!: ' })
         
    } catch(err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
})

// Route for Delete a books
router.post('/deleteBooks/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if(!result) {
            res.status(404).json({ message: 'Book not found' })
        }

        res.status(201).send({ message: 'Book deleted successfully'}) 
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

export default router
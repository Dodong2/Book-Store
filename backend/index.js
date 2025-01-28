//pass: book123store456
import 'dotenv/config';import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Book } from './model/bookModel.js'
import bookRoutes from './routes/bookRoutes.js'

const app = express()

const PORT = process.env.PORT 

const MONGO_URI = process.env.MONGO_URI 

/* middleware */
app.use(express.json())
//option 1
app.use(cors())
//option 2
app.use(cors({
    origin: 'https://bookstore-carl.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/books', bookRoutes)


mongoose.connect(MONGO_URI)
.then(() => {
    console.log('connected to the database!')
    app.listen(PORT, () => {
        console.log('running on port: ', PORT)
    })
})
.catch((err) => {
    console.log(err)
    console.error('Error connecting to MongoDB:', err)
})
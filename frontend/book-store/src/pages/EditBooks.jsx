import { useState, useEffect } from "react"
import BackBtn from '../components/BackBtn'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "notistack"


const EditBooks = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()


  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3000/books//getBooks/${id}`).then((res) => {
      setAuthor(res.data.author)
      setPublishYear(res.data.publishYear)
      setTitle(res.data.title)
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
      alert('Something Error. Check your console')
      console.log(err)
    })
  },[])

  const handleEditBook = (e) => {
    e.preventDefault()
    const data = {
      title, author, publishYear,
    }
    setLoading(true)
      axios.post(`http://localhost:3000/books/updateBooks/${id}`, data).then(() => {
        enqueueSnackbar('Book Edited Successfully!', {variant: 'success'})
        navigate('/')
        setLoading(false)
      }).catch((err) => {
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <div className="p-4">
      <BackBtn/>
      <h1 className="text-3xl my-4 font-extrabold text-amber-950">Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
      <form onSubmit={handleEditBook}>
        <label className="text-xl mr-4 text-gray-500">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" required/>
        <label className="text-xl mr-4 text-gray-500">Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" required/>
        <label className="text-xl mr-4 text-gray-500">Publish Year</label>
        <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" required/>
        <button type="submit" className="p-2 bg-sky-300 mt-4 w-full rounded-2xl">Save</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default EditBooks

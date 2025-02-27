import { useState } from "react"
import BackBtn from '../components/BackBtn'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"


const CreateBooks = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const BACKEND_URL = "https://book-store-8til.onrender.com"

  const handleSaveBook = (e) => {
    e.preventDefault();
    const data = {
      title, author, publishYear,
    }
    setLoading(true)
      axios.post(`${BACKEND_URL}/books/createBooks`, data).then(() => {
        enqueueSnackbar('Book Created Successfully!', { variant: 'success'})
        navigate('/')
        setLoading(false)
      }).catch((err) => {
        enqueueSnackbar('Error', {variant: "error"})
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <div className="p-4">
    <BackBtn />
    <h1 className="text-3xl my-4 font-extrabold text-amber-950">Create Book</h1>
    {loading ? <Spinner /> : ""}
    <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] w-full p-4 sm:p-6 mx-auto">
      <div className="my-4">
        <form onSubmit={handleSaveBook}>
          <label className="text-lg sm:text-xl text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
            required
          />
          <label className="text-lg sm:text-xl text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
            required
          />
          <label className="text-lg sm:text-xl text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
            required
          />
          <button
            type="submit"
            className="p-2 bg-sky-300 hover:bg-sky-400 transition mt-4 w-full rounded-2xl"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default CreateBooks

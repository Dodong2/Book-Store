import { useState } from "react";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()
  const BACKEND_URL = "https://book-store-8til.onrender.com"


  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .post(`${BACKEND_URL}/books/deleteBooks/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully!', { variant: 'success' })
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error', {variant: 'error'})
        setLoading(false);
      });
  };

  return (
    <div className="p-4 flex flex-col items-center">
    <BackBtn />
    <h1 className="text-3xl my-4 font-extrabold text-amber-950 text-center">
      Delete Book
    </h1>
    {loading && <Spinner />}
    <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full max-w-md p-6">
      <h1 className="text-2xl text-center">Are you sure?</h1>
      <button
        className="p-2 bg-red-600 text-white mt-4 w-full rounded-2xl"
        onClick={handleDeleteBook}
      >
        Yes
      </button>
    </div>
  </div>
  
  );
};

export default DeleteBook;

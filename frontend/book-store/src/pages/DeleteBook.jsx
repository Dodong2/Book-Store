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


  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .post(`http://localhost:3000/books/deleteBooks/${id}`)
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
    <div className="p-4 ">
      <BackBtn />
      <h1 className="text-3xl my-4 font-extrabold text-amber-950">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h1 className="text-2xl">Are you sure?</h1>

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

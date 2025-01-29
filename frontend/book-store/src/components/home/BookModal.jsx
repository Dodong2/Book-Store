import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
  className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
  onClick={onClose}
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="w-full max-w-[90%] sm:max-w-[600px] max-h-[80vh] bg-white rounded-2xl p-4 sm:p-6 flex flex-col relative overflow-y-auto"
  >
    <AiOutlineClose
      className="absolute right-4 top-4 text-3xl text-red-600 cursor-pointer"
      onClick={onClose}
    />
    <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">{book.publishYear}</h2>
    <h4 className="my-2 text-gray-500 break-words">{book._id}</h4>
    <div className="flex items-center gap-x-3">
      <PiBookOpenTextLight className="text-red-300 text-2xl" />
      <h2 className="my-1">{book.title}</h2>
    </div>
    <div className="flex items-center gap-x-3">
      <BiUserCircle className="text-red-300 text-2xl" />
      <h1 className="my-1">{book.author}</h1>
    </div>
    <p className="my-2 text-sm sm:text-base">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
      of type and scrambled it to make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially unchanged. It was
      popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
    </p>
  </div>
</div>
  );
};

BookModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    publishYear: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookModal;

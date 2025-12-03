import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import useMessages from "../../Hooks/useMessages";

const ContactMessages = () => {
  const { messages, isLoading, refetch } = useMessages();

  const handleDeleteMsg = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://restaurant-project-server-tau.vercel.app/contact/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Message has been deleted.", "success");
              refetch(); // ✅ reload updated data
            }
          })
          .catch((err) => {
            console.error("Delete error:", err);
          });
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md ">
        <h1 className="text-4xl font-semibold mb-5 text-center">
          Total Message: {messages.length}
        </h1>
        {messages.map((msg) => (
          <li
            key={msg._id}
            className="flex items-start gap-4 p-4 mb-4 bg-base-200 rounded-box shadow"
          >
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
              alt="User"
            />

            <div className="flex-1">
              <div className="text-xs font-semibold">
                {msg.name} <span className="text-gray-500">({msg.email})</span>
              </div>
              <p className="text-xs mt-1">{msg.phone}</p>
              <p className="text-xs mt-1">{msg.message}</p>
            </div>

            <button
              onClick={() => handleDeleteMsg(msg._id)}
              className="btn btn-square btn-ghost text-2xl text-red-700"
            >
              <AiFillDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactMessages;

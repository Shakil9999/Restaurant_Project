// src/pages/Dashboard/Cart/Cart.jsx
import { useState, useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from "sweetalert2";

import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();            // full cart list
  const axiosSecure = useAxiosSecure();

  /* -------- pagination -------- */
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  // keep page in range if cart shrinks after delete
  useEffect(() => {
    if (page > totalPages - 1) setPage(totalPages - 1 || 0);
  }, [cart.length, page, totalPages]);

  const currentItems = cart.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  /* -------- totals -------- */
  const totalPrice = cart.reduce((t, item) => t + item.price, 0);

  /* -------- actions -------- */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Item has been removed.", "success");
          }
        });
      }
    });
  };

  /* -------- render -------- */
  return (
    <div>
      <SectionTitle heading="My Cart" subHeading="Enjoy your Food" />

     

      <div className="flex justify-evenly border-b-2 pb-3">
        <h2 className="text-4xl">Items: {cart.length}</h2>
        <h2 className="text-4xl">Total Price: {totalPrice.toFixed(2)}</h2>
        
       {cart.length ? <Link to="/dashboard/payment">
        <button className="btn">Pay</button>
        </Link>
      :
        <button disabled className="btn">Pay</button>
      }

      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1 + page * itemsPerPage}.</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                    title="Remove"
                  >
                    <RiDeleteBinFill className="text-red-600 text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* paginator */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              className="btn btn-sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((p) => (
              <button
                key={p}
                className={`btn btn-sm ${
                  p === page ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setPage(p)}
              >
                {p + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

// src/pages/Dashboard/ManageItems/ManageItems.jsx
import { useState, useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();           // [all items]
  const axiosSecure = useAxiosSecure();

  /* --------─ category filter ─-------- */
  const categories = ["All", ...new Set(menu.map((i) => i.category))];
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = selectedCat === "All"
    ? menu
    : menu.filter((i) => i.category === selectedCat);

  /* --------─ pagination ─-------- */
  const itemsPerPage = 8;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // reset page ↦ 0 when category changes or list shrinks
  useEffect(() => {
    setPage(0);
  }, [selectedCat]);

  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [filtered.length, page, totalPages]);

  const currentItems = filtered.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  /* --------─ delete handler ─-------- */
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch();                       // refresh list
          Swal.fire("Deleted!", "Item removed.", "success");
        }
      }
    });
  };

  /* --------─ render ─-------- */
  return (
    <div>
      <SectionTitle heading="Manage all items" subHeading="Hurry Up" />

      {/* category selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${
              cat === selectedCat ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setSelectedCat(cat)}
          >
            {cat} ({cat === "All" ? menu.length : menu.filter(i=>i.category===cat).length})
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <h3 className="font-semibold my-4">
          Showing {filtered.length} item{filtered.length!==1 && "s"} in “{selectedCat}” — Page {page + 1}/{totalPages || 1}
        </h3>

        <table className="table">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1 + page * itemsPerPage}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={item.image} alt="menu" />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="btn btn-ghost btn-xs text-2xl">
                      <FaEdit className="text-yellow-500" />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost btn-lg"
                  >
                    <RiDeleteBinFill className="text-red-600 text-2xl" />
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

export default ManageItems;

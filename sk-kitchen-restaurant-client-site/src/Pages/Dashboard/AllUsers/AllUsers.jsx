// src/pages/Dashboard/AllUsers/AllUsers.jsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from "sweetalert2";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  /* ---------- fetch users ---------- */
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  /* ---------- pagination ---------- */
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Keep current page valid if list shrinks after refetch
  useEffect(() => {
    if (page > totalPages - 1) setPage(totalPages - 1 || 0);
  }, [users.length, page, totalPages]);

  const currentUsers = users.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  /* ---------- actions ---------- */
  const handleMakeAdminUser = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  /* ---------- render ---------- */
  return (
    <div>
      <SectionTitle heading="MANAGE USERS" subHeading="How many?" />

      <div className="flex justify-evenly border-b-2 pb-3">
        <h1 className="text-3xl">All Users</h1>
        <h1 className="text-3xl">Total Users: {users.length}</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={user._id} className="bg-base-200">
                <td>{idx + 1 + page * itemsPerPage}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdminUser(user)}
                      className="btn btn-ghost btn-lg"
                      title="Make Admin"
                    >
                      <FaUsers className="text-yellow-700 text-2xl" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                    title="Delete User"
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

export default AllUsers;

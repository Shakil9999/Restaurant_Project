import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";


const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Admin Stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });



  return (
    <div>
      <h2 className="text-3xl m-3 font-semibold text-center">
        Welcome back{user?.displayName ? `, ${user.displayName}` : ""}!
      </h2>

      {/* Stats Section */}
    <section className="flex justify-center">
          <div className="stats shadow ">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats?.revenue ?? 0}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">All Users</div>
          <div className="stat-value">{stats?.users ?? 0}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <AiFillProduct className="text-3xl" />
          </div>
          <div className="stat-title">Products</div>
          <div className="stat-value">{stats?.menuItems ?? 0}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <GoListOrdered className="text-3xl" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats?.orders ?? 0}</div>
        </div>
      </div>
    </section>


    </div>
  );
};

export default AdminHome;

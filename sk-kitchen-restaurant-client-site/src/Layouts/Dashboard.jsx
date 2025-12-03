import { BsLifePreserver } from "react-icons/bs";
import { FaAd, FaHome, FaShopify, FaShoppingCart, FaSitemap, FaUsers } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdOutlinePayment, MdOutlineRestaurantMenu, MdReviews } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
import useMessages from "../Hooks/useMessages";

const Dashboard = () => {
  const [cart] = useCart()
  const {messages} = useMessages()
  //ToDo get admin from database
  const [isAdmin] = useAdmin()



  // Custom styling for NavLinks
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-black bg-white bg-opacity-20 rounded-md p-2 flex items-center gap-2'
      : 'flex items-center gap-2 p-2';

  return (
    <div className="flex ">
      <div className="w-64 min-h-screen bg-yellow-700 text-white font-semibold">
        <ul className="menu px-4 py-6">

          {
            isAdmin? <>
             <li className="my-2">
            <NavLink to="/dashboard/adminHome" className={linkClass}>
              <FaHome />
              Admin Home
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/dashboard/addItems" className={linkClass}>
                <FaAd />
              Add Items
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/dashboard/manageItems" className={linkClass}>
              <FaSitemap />
              Manage Items
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/dashboard/messages" className={linkClass}>
              <LuMessageCircleMore />
              Messages ({messages.length})
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/dashboard/allUsers" className={linkClass}>
              <FaUsers />
              All User
            </NavLink>
          </li>
          {/* <li className="my-2">
            <NavLink to="/dashboard/booking" className={linkClass}>
              <TbBrandBooking />
              My Booking
            </NavLink>
          </li> */}


            </>
            :
            <>


             <li className="my-2">
            <NavLink to="/dashboard/userHome" className={linkClass}>
              <FaHome />
              User Home
            </NavLink>
          </li>
          {/* <li className="my-2">
            <NavLink to="/dashboard/reservation" className={linkClass}>
              <BsLifePreserver />
              Reservation
            </NavLink>
          </li> */}
          <li className="my-2">
            <NavLink to="/dashboard/paymentHistory" className={linkClass}>
              <MdOutlinePayment />
              Payment History
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/dashboard/cart" className={linkClass}>
              <FaShoppingCart />
              My Cart({cart.length})
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/dashboard/review" className={linkClass}>
              <MdReviews />
              Add Review
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/dashboard/booking" className={linkClass}>
              <TbBrandBooking />
              My Booking
            </NavLink>
          </li>

            </>
          }

         {/* shared  nav links */}
          <div className="divider border-white my-4" />

          <li className="my-2">
            <NavLink to="/" className={linkClass}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/menu" className={linkClass}>
              <MdOutlineRestaurantMenu />
              Menu
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/order" className={linkClass}>
              <FaShopify />
              Order Now
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink to="/contact" className={linkClass}>
              <IoMdContact />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

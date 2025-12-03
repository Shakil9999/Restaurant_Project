import React, { useContext } from "react";
import navLogo from "../../../assets/icon/main_logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin()

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="contact">Contact us</Link></li>
      <li><Link to="menu">Our Menu</Link></li>
      <li><Link to="order">Order Now</Link></li>

      {
        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
      }
      {
        user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
      }

      <li>
        <Link to="/dashboard/cart">
          <button className="flex gap-1 justify-center items-center">
            <FaCartPlus className="text-2xl"></FaCartPlus>
            <div className="badge badge-sm badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? 
        <>
          {/* <span>{user?.displayName}</span> */}

          <button onClick={handleLogOut} className="btn btn-ghost">
            Log Out
          </button>
        </>
       : 
        <>
          <li>
            <Link to="login">Login Now</Link>
          </li>
        </>
      }
    </>
  );

  return (
    <div>
      <div className="navbar fixed z-10 text-white bg-black/30 max-w-6xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black/30 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
           <Link to="/" className="bg-amber-50 text-xl p-1 rounded-full">
      <img className="w-10 rounded-full" src={navLogo} alt="Logo" />
    </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">{user?.displayName}</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

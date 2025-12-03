import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";

const FoodCart = ({ foodItem }) => {
  const { name, recipe, image, price, _id } = foodItem;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure()
  const [, refetch] = useCart()

  const handleAddToCart = () => {
    // console.log(food, user.email);

    if (user && user.email) {
      //send cart item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        recipe,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: `${name} added to the cart`,
            icon: "success",
            draggable: true,
          });
          refetch()
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 w-80 shadow-sm mx-auto">
      <figure>
        <img
        className="h-56 w-full"
        src={image} alt={name} />
      </figure>
      <p className="absolute bg-black right-0 text-white m-4 p-2 rounded-2xl">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions w-full">
          <button
            onClick={ handleAddToCart }
            className="btn btn-warning w-full text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;

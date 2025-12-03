// SSLPayment.jsx
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useCart from "../../../Hooks/useCart";

const SSLPayment = () => {
  const [cart] = useCart();
  const { user } = useAuth();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please login first");
    if (cart.length === 0) return alert("Your cart is empty");

    const payment = {
      email: user.email,
      name: user.displayName || "Customer",
      price: totalPrice,
      cartIds: cart.map((item) => item._id),
      menuIds: cart.map((item) => item.menuId),
    };

   
  
      const res = await axios.post("http://localhost:5000/create-ssl-payment", payment, {
        
      });

      if (res.data.gatewayURL) {
        window.location.replace(res.data.gatewayURL); // Redirect to SSLCommerz
      } else {
        alert("Failed to initiate payment.");
      }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">SSLCommerz Payment</h2>

      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary w-full">
          Pay $ {totalPrice.toFixed(2)} with SSLCommerz
        </button>
      </form>
    </div>
  );
};

export default SSLPayment;


import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import Cover from "../Shared/Cover/Cover";
import contactBanner from "../../assets/contact/banner.jpg";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {

    if(!user){
      alert("Please login to send a message.");
      navigate('/login');
      return;
    }
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value; 
    const message = form.message.value;
    const contactForm = { name, email, phone, message };

    axiosPublic.post('/contact', contactForm)
      .then(response => {
        console.log("Contact form submitted successfully:", response.data);
        form.reset();
        alert("Message sent successfully!");
      });
    }
      
  return (
    <div>
      <Cover
        coverImg={contactBanner}
        title="CONTACT US"
        description="Would you like to try a dish?"
      />

      <SectionTitle subHeading={"Visit Us"} heading={"OUR LOCATION"} />

      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-6 px-4 py-8">
        {/* Phone Card */}
        <div className="w-full md:w-56 border border-gray-200 shadow-sm text-center mx-auto md:mx-0">
          <div className="bg-yellow-600 text-white py-4 flex justify-center">
            <FaPhoneAlt className="text-xl" />
          </div>
          <div className="bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-800 mb-2">PHONE</h3>
            <p className="text-sm text-gray-600">+38 (012) 34 56 789</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="w-full md:w-56 border border-gray-200 shadow-sm text-center mx-auto md:mx-0">
          <div className="bg-yellow-600 text-white py-4 flex justify-center">
            <FaMapMarkerAlt className="text-xl" />
          </div>
          <div className="bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-800 mb-2">ADDRESS</h3>
            <p className="text-sm text-gray-600">+38 (012) 84 56 789</p>
          </div>
        </div>

        {/* Working Hours Card */}
        <div className="w-full md:w-56 border border-gray-200 shadow-sm text-center mx-auto md:mx-0">
          <div className="bg-yellow-600 text-white py-4 flex justify-center">
            <FaClock className="text-xl" />
          </div>
          <div className="bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-800 mb-2">WORKING HOURS</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mon - Fri: 08:00 - 22:00<br />
              Sat - Sun: 10:00 - 23:00
            </p>
          </div>
        </div>
      </div>

      <SectionTitle subHeading={"Send Us a Message"} heading={"Contact us"} />

      {/* Contact Form */}
      <div className="bg-gray-100 px-4 py-10 md:px-16">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">Name<span className="text-red-500">*</span></label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  defaultValue={user?.displayName || ''}
                  className="w-full p-3 border border-gray-300 bg-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email<span className="text-red-500">*</span></label>
                <input
                name="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={user?.email}
                  className="w-full p-3 border border-gray-300 bg-white  rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Phone<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 bg-white  rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Message<span className="text-red-500">*</span></label>
              <textarea
              name="message"
              maxLength={100}
                rows="3"
                placeholder="Write your message here"
                className="w-full p-3 border border-gray-300 bg-white  rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
            </div>

            

            <button
              type="submit"
              className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded hover:bg-yellow-700 transition"
            >
              Send Message <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Contact;

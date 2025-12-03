import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    //image uploaded to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (res.data.success) {
      //send menu item to the server
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        //show success
        reset()
        Swal.fire({
          position: "top-centre",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };

  return (
    <div>
      <SectionTitle
        heading="Add an item"
        subHeading="what's new??"
      ></SectionTitle>
      <div className="bg-gray-200 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className="fieldset w-full ">
            <legend className="fieldset-legend ">Recipe Name*</legend>
            <input
              type="text"
              {...register("name", { required: true })}
              required
              className="input w-full"
              placeholder="Recipe Name"
            />
          </fieldset>

          <div className="flex gap-6">
            {/* select menu */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Select Category*</legend>
              <select
                {...register("category", { required: true })}
                defaultValue="Select a Menu category"
                className="select w-full"
              >
                <option disabled={true}>Select a Menu category</option>
                <option value="offered">Offer</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Price*</legend>
              <input
                {...register("price", { required: true })}
                type="number"
                className="input w-full"
                placeholder="Price"
              />
            </fieldset>
          </div>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Recipe</legend>
            <textarea
              {...register("recipe")}
              className="textarea h-24 w-full"
              placeholder="Recipe"
            ></textarea>
          </fieldset>

          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-ghost"
            />
          </div>
          <button className="btn  text-white bg-yellow-700">
            Add item
            <FaUtensils className="ml-2"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;


import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateItem = () => {

    const {name, price, recipe, category, _id} =  useLoaderData()
    // const { name, price, recipe, category, _id } = useLoaderData()




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
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        //show success
        reset()
        Swal.fire({
          position: "top-centre",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };

    return (
        <div>
            <SectionTitle heading="Update item" subHeading="Refresh Items"></SectionTitle>

                  <div className='bg-gray-300 p-8'>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <fieldset className="fieldset w-full ">
                        <legend className="fieldset-legend ">Recipe Name*</legend>
                        <input
                        defaultValue={name}
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
                          <legend className="fieldset-legend">Select Category</legend>
                          <select
                            {...register("category", { required: true })}
                            defaultValue={category}
                            className="select w-full"
                          >
                            <option disabled={true}>Select a Menu category</option>
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
                          defaultValue={price}
                            {...register("price", { required: true })}
                            type="number"
                            step="any"  
                            className="input w-full"
                            placeholder="Price"
                          />
                        </fieldset>
                      </div>
            
                      <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Recipe</legend>
                        <textarea
                        defaultValue={recipe}
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
                      <div className='flex justify-center'>
                        <button className="btn  text-white bg-yellow-700">
                        Update an item
                      </button>
                      </div>
                    </form>
                  </div>
        </div>
    );
};

export default UpdateItem;
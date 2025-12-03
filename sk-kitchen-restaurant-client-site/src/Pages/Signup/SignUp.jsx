import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        return updateUserProfile(data.name, data.photoURL);
      })
      .then(() => {
        //create & save user info in the data database
        const userinfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userinfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              title: "Register Successfully",
              icon: "success",
              draggable: true,
            });
            navigate("/");
          }
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Kitchen's | Signup</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  name="name"
                />
                {errors.name && (
                  <span className="text-red-600">Name field is required</span>
                )}

                <label className="label">Photo URL</label>
                <input
                  type="url"
                  className="input"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                />
                {errors.photoURL && (
                  <span className="text-red-600">
                    Photo URL field is required
                  </span>
                )}

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  name="email"
                />
                {errors.email && (
                  <span className="text-red-600">Email field is required</span>
                )}

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    // pattern:/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/
                  })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600">
                    Password field is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be at least 8 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    Password must be at most 20 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must be include one character, one number, one
                    spacial character
                  </span>
                )}

                {/* <button className="btn btn-neutral mt-4">Register</button> */}
                <input
                  type="submit"
                  className="btn btn-neutral mt-4"
                  value="Register"
                />
              </fieldset>

              
            </form>
                <div className="divider mt-0">OR</div>

                <SocialLogin></SocialLogin>
            <p className=" text-center mb-4">
              <small>
                Already have a account?{" "}
                <Link to="/login" className="text-amber-500 font-bold">
                  Login Now
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

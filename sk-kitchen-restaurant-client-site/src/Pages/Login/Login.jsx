import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";
  console.log('order item', location.state)

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Log in successful",
        icon: "success",
        draggable: true,
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const captchaValue = e.target.value;
    console.log(captchaValue);
    if (validateCaptcha(captchaValue)) {
      // alert("Captcha Matched");
      setDisable(false);
    } else {
      // alert("Captcha Does Not Match");
      setDisable(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kitchen's | Login</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  required
                />
                <div>
                  <label className="label">Captcha</label>
                  <LoadCanvasTemplate />
                </div>

                <input
                 onBlur={handleValidateCaptcha}
                  type="text"
                  className="input mt-2"
                  placeholder="Type Captcha you see above"
                  name="captcha"
                  required
                />
                <div className="mt-2">
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <input
                  disabled={disable}
                  type="submit"
                  className="btn mt-4 btn-success"
                  value="Login"
                />
              </fieldset>
            </form>

            <div className="divider mt-0">OR</div>

            <SocialLogin></SocialLogin>
            <p className=" text-center mb-2">
              <small>
                New here?
                <Link to="/signup" className="text-amber-500 font-bold">
                  Create a New Account
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

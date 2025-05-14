import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { useForm } from "react-hook-form";

function Login() {
  let { signIn } = useContext(AuthContext);
  let location = useLocation().state?.from?.pathname;
  let navigate = useNavigate();
  let [email, setEmail] = useState();
  let [pass, setPass] = useState();

  console.log(location);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (user) => {
    signIn(user.email, user.pass)
      .then((data) => {
        if (location) {
          navigate(location);
        } else {
          navigate("/my-account");
        }
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          setError("email", {
            type: "manual",
            message: "Invalid email or password!",
          });
          setError("pass", {
            type: "manual",
            message: "Invalid email or password!",
          });
        }
      });
  };

  function hanldeFill() {
    reset({
      email: "sirazu52@gmail.com",
      pass: "Razu@stylique123",
    });
  }

  return (
    <div>
      <title>Sign In</title>
      <div className="hero ">
        <div className=" flex-col py-10 lg:flex-row-reverse">
          <div className="card  bg-opacity-5 w-full  shrink-0 shadow-2xl">
            <h2 className="text-center text-black text-2xl font-bold pt-5">
              Sign In
            </h2>
            <div className="mx-6 mt-2">
              <button
                onClick={() => hanldeFill()}
                className="w-full inline-block px-4 py-2 text-sm  border border-black/20 rounded-[20px]"
              >
                Demo User Credentials
              </button>
            </div>

            <div className="card  w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered rounded-[20px]"
                    autoComplete="username"
                    {...register("email", { required: true })}
                  />
                  {errors?.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered rounded-[20px]"
                    autoComplete="new-password"
                    {...register("pass")}
                  />
                  {errors?.pass && (
                    <p className="text-red-600">{errors.email?.message}</p>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full bg-black border-none rounded-full">
                    Sign In
                  </button>
                </div>
              </form>
              <p className="p-5 text-center">
                New here?
                <Link to="/signup" className="text-blue-600 pl-1">
                  Signup here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

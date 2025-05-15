import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth/AuthProvider";
import { useForm } from "react-hook-form";

function Signup() {
  let {
    createAccount: userSignUp,
    editProfile,
    loginWithGoogle,
  } = useContext(AuthContext);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (user) => {
    console.log(user);
    userSignUp(user.email, user.pass)
      .then((data) => {
        console.log(data);
        toast.success("User signed up successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("There's been an error, please check console for details");
      });
  };

  return (
    <div>
      <title>Sign up</title>
      <div className="hero ">
        <div className=" flex-col py-10 lg:flex-row-reverse">
          <div className="card bg-white bg-opacity-5 w-full shrink-0 shadow-2xl">
            <h2 className="text-center  text-2xl font-bold pt-5">Sign Up</h2>
            <div className="card bg-white w-full max-w-sm shrink-0 ">
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
                  {errors.email && (
                    <p className="text-red-600">Email field is required</p>
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
                    {...register("pass", {
                      required: true,
                      pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{7,}$/,
                    })}
                  />
                  {errors.pass?.type === "pattern" && (
                    <p className="text-red-600 ">
                      Password must have 6 or more characters, one special
                      character and one capital letter
                    </p>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full text-white border-none bg-black rounded-full">
                    Sign up
                  </button>
                </div>
              </form>
              <p className="p-5 text-center">
                Already have an account ,
                <Link to="/login" className="text-blue-600 pl-0.5">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../cart/CartProvider";
import { toast } from "react-toastify";

function CheckoutForm() {
  let { cartItems, clearCart, idempotencyKey, resetidempotencyKey } =
    useContext(CartContext);
  let [states, setStates] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  let countrySelected = watch("country");
  //console.log(countrySelected);

  const onSubmit = (data) => {
    console.log(data);
    storeOrderData(data.email);
    storeUserData(data);
  };

  useEffect(() => {
    fetch("/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(countrySelected);

  //store order data
  function storeOrderData(email) {
    let date = new Date().toISOString();
    let newData = {
      idempotencyKey,
      email: email,
      date: date,
      cartItems,
    };

    axios
      .post("https://stylique-backend.vercel.app/checkout", newData)
      .then((res) => {
        console.log(res.data);
        toast.success("Order completed");
        clearCart();
      })
      .catch((err) => {
        console.log(err);
        toast.error(`There's been an error. ${err.message}`);
      });
  }

  //store user data
  function storeUserData(data) {
    axios
      .put("https://stylique-backend.vercel.app/customers", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function demoOrderFill() {
    reset({
      firstName: "Md shohidul",
      lastName: "islam",
      email: "sirazu52@gmail.com",
      phone: "+8801317622631",
      country: "Bangladesh",
      address: "Bashurhat,companiganj",
      apartment: "",
      state: "Chittagong",
      city: "Noakhahli",
      zipcode: "3850",
    });
  }

  return (
    <div>
      <button onClick={demoOrderFill} className="text-blue-600">
        Fill demo customer data
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mt-5">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 gap-2">
          <div className="w-full">
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last Name"
              className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}

        <input
          {...register("phone", { required: "Phone number is required" })}
          type="phone"
          placeholder="Phone"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}

        <select
          {...register("country", { required: "Country is required" })}
          className="text-black/50 border border-black/10 w-full py-2 rounded-[20px] pl-5"
        >
          <option value="" disabled selected className="text-black">
            Select country
          </option>
          <option value="Thailand" className="text-black">
            Thailand
          </option>
          <option value="Bangladesh" className="text-black">
            Bangladesh
          </option>
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}

        <input
          {...register("address", { required: "Email is required" })}
          placeholder="Address"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}

        <input
          {...register("apartment")}
          placeholder="Apartment/suite/street(optional)"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />

        <div className="flex flex-col lg:flex-row space-y-5 md:space-y-0 justify-between gap-2">
          <div>
            <input
              {...register("city", { required: "City is required" })}
              placeholder="City"
              className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <select
              disabled={!countrySelected}
              {...register("state", { required: "State is required" })}
              className="text-black/50  border border-black/10 w-full py-2 rounded-[20px] pl-5"
            >
              <option value="" disabled selected>
                {countrySelected
                  ? "Select state"
                  : "Please select country first"}
              </option>
              {countrySelected
                ? states[countrySelected].map((state, idx) => (
                    <option
                      value={state}
                      className="text-black"
                      key={`${state}-${idx}`}
                    >
                      {state}
                    </option>
                  ))
                : ""}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("zipcode", { required: "Zipcode is required" })}
              placeholder="Zip code"
              className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zipcode.message}
              </p>
            )}
          </div>
        </div>

        <input
          type="submit"
          value="Order Now"
          className="w-full bg-black text-white rounded-[20px] py-2"
        />
      </form>
    </div>
  );
}

export default CheckoutForm;

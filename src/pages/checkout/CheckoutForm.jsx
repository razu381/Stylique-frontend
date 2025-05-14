import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function CheckoutForm() {
  let [states, setStates] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let countrySelected = watch("country");
  //console.log(countrySelected);

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    fetch("/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(countrySelected);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 mt-5">
        <div className="flex gap-2">
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
          />
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
          />
        </div>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />

        <input
          {...register("phone")}
          type="phone"
          placeholder="Phone"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />

        <select
          {...register("country")}
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

        <input
          {...register("address")}
          placeholder="Address"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />

        <input
          {...register("apartment")}
          placeholder="Apartment/suite/street(optional)"
          className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
        />

        <div className="flex justify-between">
          <input
            {...register("city")}
            placeholder="City"
            className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
          />

          <select
            disabled={!countrySelected}
            {...register("state")}
            className="text-black/50  border border-black/10 w-full py-2 rounded-[20px] pl-5"
          >
            <option value="" disabled selected>
              {countrySelected ? "Select state" : "Please select country first"}
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

          <input
            {...register("zipcode")}
            placeholder="Zip code"
            className="border border-black/10 w-full py-2 rounded-[20px] pl-5"
          />
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

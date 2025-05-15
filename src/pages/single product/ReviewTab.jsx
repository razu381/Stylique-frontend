import { useQuery } from "@tanstack/react-query";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import axios from "axios";
import AllReviews from "./AllReviews";

function ReviewTab({ _id }) {
  // console.log(_id);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      productId: _id,
      review: "",
      rating: 0,
    },
  });

  async function onSubmit(data) {
    let res = await axios.post(
      `https://stylique-backend.vercel.app/reviews`,
      data
    );
    if (res.data.insertedId) {
      toast.success("Review added successfully");
    } else {
      toast.error("There has been an error");
    }
    console.log(res.data);
    reset({
      productId: _id,
      review: "",
      rating: 0,
    });
  }
  return (
    <section className="">
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>All Reviews</Tab>
          <Tab>Give Review</Tab>
        </TabList>

        <TabPanel className="mt-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            fermentum, nibh a ullamcorper luctus, velit lorem euismod tellus,
            non volutpat orci ligula ac nunc. Etiam nec imperdiet orci. Sed a
            elit ut mi imperdiet laoreet. Nunc augue diam, facilisis ac quam
            vel, vehicula pellentesque nisl. Nullam viverra tempus justo et
            aliquam. Duis egestas ac urna sed varius. Nam laoreet dui blandit,
            convallis nulla at, egestas mi. Cras et diam ac urna efficitur
            scelerisque et vel tortor. Praesent non feugiat dolor. Suspendisse
            sagittis, velit sodales tincidunt ultricies, eros purus pharetra
            tellus, a semper arcu lectus ac risus. Integer dapibus pretium
            massa. Aenean mollis nulla lacus, vitae volutpat nunc vestibulum eu.
            Donec a pretium sapien. Nunc elit ex, fringilla non turpis in,
            condimentum aliquam dui. Mauris rhoncus luctus lectus, nec rutrum
            ligula rhoncus eget. Praesent vestibulum condimentum tortor et
            malesuada. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Etiam et nulla est. Nunc sit
            amet libero in neque commodo ornare. In semper orci velit, ut
            molestie metus vehicula nec. Sed in auctor lectus. Nunc et augue id
            nulla pulvinar ultrices. Nullam id feugiat metus. In in tempus
            ligula, vel mattis tortor. Sed imperdiet est urna, id gravida ipsum
            porta at. Praesent pulvinar purus in sagittis rhoncus. Pellentesque
            dictum magna a pharetra pretium. Sed varius vitae justo vitae
            porttitor. Duis quis congue est. Aliquam non lobortis justo.
            Maecenas rhoncus nisi id tincidunt venenatis. Morbi et volutpat
            elit, vitae pulvinar justo. Aliquam scelerisque vehicula rhoncus.
            Nunc id mauris nisi. Curabitur pulvinar tincidunt molestie. Aenean
            eu lorem eleifend, aliquam quam et, mattis eros. Morbi ut lacus
            vestibulum, semper ipsum sit amet, ultricies tellus. Ut nisi nisl,
            pharetra et aliquam nec, lobortis vel dui. Nunc malesuada lobortis
            maximus. Mauris facilisis facilisis erat, ac pretium purus eleifend
            a. Duis eleifend imperdiet nisl vitae suscipit. Nam iaculis eros
            quis nisl rhoncus, at dapibus neque molestie. Phasellus non ante sed
            mi malesuada posuere. Donec efficitur ultricies eros. Curabitur
            dapibus mi sed consequat aliquam. Nam convallis nibh ipsum, et
            facilisis augue rutrum ut. Maecenas condimentum hendrerit bibendum.
            Vivamus non congue ante. Quisque interdum scelerisque nibh, vitae
            faucibus lectus efficitur sit amet. Quisque lacus ipsum, efficitur
            vel nibh ut, lacinia finibus ex. Nullam interdum ex a nisi congue,
            blandit suscipit quam rutrum. Integer at velit neque. In id tortor
            at enim tempor faucibus luctus eu nibh. Suspendisse malesuada ornare
            hendrerit. In sed pretium enim, at molestie felis. Nulla justo dui,
            vestibulum et fringilla sit amet, volutpat et ipsum. Pellentesque
            sed accumsan dui, sit amet tincidunt lectus. Vestibulum a varius
            quam, ut consequat sapien. Morbi accumsan felis at dolor ullamcorper
            ultrices.
          </p>
        </TabPanel>
        <TabPanel>
          <AllReviews _id={_id} />
        </TabPanel>
        <TabPanel>
          <div className="max-w-[90%] lg:max-w-[60%] mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl text-center mt-20 mb-10 uppercase">
              Leave your review here
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mx-[20%]">
                <Controller
                  control={control}
                  name="rating"
                  rules={{
                    validate: (rating) => rating > 0,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Rating
                      value={value}
                      isRequired
                      onChange={onChange}
                      visibleLabelId="rating_label"
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.rating && <div>Rating is required.</div>}
              </div>

              <textarea
                type="text"
                id="review"
                className="w-full border border-black/50 h-48 rounded-[20px] p-5"
                {...register("review", { required: true })}
              />
              {/* </label> */}
              {errors.review && <div>review is required.</div>}
              <button
                type="submit"
                className="w-full font-bold bg-black text-white py-3 rounded-full hover:bg-transparent hover:border hover:border-black hover:text-black"
              >
                Submit review
              </button>
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
}

export default ReviewTab;

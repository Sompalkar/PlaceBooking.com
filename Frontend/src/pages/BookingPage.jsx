import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  const handleOpenRazorpay = (data) => {
    // console.log(data.order);
    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "PlaceBooking.com",
      Description:
        "Stay like a local, anywhere you go – PlaceBooking, where every stay is a new adventure.",
      handler: function (response) {
        // console.log(response, "32");

        axios.post("/verify", { response: response }).then((res) => {
          if (res.data) {
            navigate("/account/bookings");
          }
        });
      },

      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (amount) => {
    const _data = { amount: amount };
    const response = axios
      .post("/placesBooking", _data)
      .then((res) => {
        // console.log(res.data.key);

        handleOpenRazorpay(res.data);
      })
      .catch((err) => {
        throw new Error(err);
        // console.log(err);
      });
  };

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex flex-col  w-full md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-1 w-full  ">
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        {/* <div className="bg-primary p-4 w-40 text-white rounded-2xl">
          <div>Total price</div> 
          
          <div className="text-3xl"> ${booking.price}</div>
        </div> */}
        <div
          onClick={() => handlePayment(booking.price)}
            className="bg-primary p-4 w-full  sm:w-40 text-center text-white rounded-2xl cursor-pointer"
        >
          <div> Pay Now </div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}

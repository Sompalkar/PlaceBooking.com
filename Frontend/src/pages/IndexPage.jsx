import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";
import Skeleton from "react-loading-skeleton"; // Import the Shimmer component
import "react-loading-skeleton/dist/skeleton.css";
import FeaturesSection from "./FeaturesSection.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/places");
        setPlaces(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // In case of error, also set loading to false
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {loading ? ( // If loading, show skeleton UI
          <div className="flex  gap-4 flex-col w-full   ">
            {Array.from({ length: 3 }).map(
              (
                _,
                index // Render 6 skeleton items
              ) => (
                <div key={index} className="flex flex-col md:flex-row  gap-4 ">
                  <Skeleton
                    height={200}
                    width={300}
                    count={1}
                    borderRadius={15}
                    className="hidden  md:block"
                  />

                  <Skeleton
                    height={200}
                    width={300}
                    count={1}
                    borderRadius={15}
                  />
                  <Skeleton
                    height={200}
                    width={300}
                    count={1}
                    borderRadius={15}
                    className=" hidden md:block"
                  />
                </div>
              )
            )}
          </div>
        ) : (
          places.map((place) => (
            <Link
              key={place._id}
              to={"/place/" + place._id}
              className=" mb-4 shadow-md rounded-xl p-4"
            >
              <div className="bg-gray-500 mb-2  shadow-lg   rounded-2xl flex ">
                {place.photos?.[0] && (
                  <Image
                    className="rounded-2xl object-cover aspect-square"
                    src={place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">₹ {place.price}</span> per night
              </div>
            </Link>
          ))
        )}
      </div>
      <div>
        <FeaturesSection />
      </div>
    </div>
  );
}

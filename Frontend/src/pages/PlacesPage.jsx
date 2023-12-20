import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [checkdelete, setCheckdelete] = useState(false);
  const handleClick = (placeid, owner) => {
    // console.log(placeid, owner);

    axios.post(`/user-places/${placeid}`, { placeid, owner }).then((data) => {
      // console.log(data.status);
      if (data) {
        setCheckdelete(true);
      }
    });
  };
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, [checkdelete]);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-16 md:flex-col  h-72">
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id}
              className="flex cursor-pointer gap-8 mb-12 md:flex-row sm:flex-col bg-gray-100 p-4 justify-between rounded-2xl"
            >
              <div className=" flex flex-row gap-8">
                <div className="flex w-52 h-44 object-contain  max-w-[220px]  bg-gray-300 grow shrink-0 md:align-middle">
                  <PlaceImg place={place} />
                </div>

                <div className="grow-0 shrink  ">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </div>
              <div className=" flex flex-col justify-between ">
                <Link to={"/account/places/" + place._id}>
                  <FiEdit3 size={"30px"} />
                </Link>
                <MdDelete
                  size={"30px"}
                  onClick={(ev) => handleClick(place._id, place.owner)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

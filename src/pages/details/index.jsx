import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import axios from "axios";

export default function Details() {
  const { id } = useParams();
  const {
    movieDetailsData,
    setMovieDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);
  const apiKey = "4bae634eeaf48a761f9029a53f4e2ff9";

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovieDetailsData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getMovieDetails();
  }, []);

  console.log(movieDetailsData, "movieDetailsData");

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movieDetailsData?.poster_path}`}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {movieDetailsData?.release_date}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {movieDetailsData?.title}
        </h3>

        <div>
          <span className="text-2xl font-semibold text-black">Overview:</span>
          <p>{movieDetailsData?.overview}</p>
          <p>{movieDetailsData?.tagline}</p>
          <span>Total revenue:</span>
          <p> {movieDetailsData?.revenue}$</p>

          {movieDetailsData?.recipe?.ingredients.map((ingredient) => (
            <li>
              <span className="text-2xl font-semibold text-black">
                {ingredient.quantity} {ingredient.unit}
              </span>
              <span className="text-2xl font-semibold text-black">
                {ingredient.description}
              </span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

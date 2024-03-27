import { useContext } from "react";
import { GlobalContext } from "../../context";

import MovieItem from "../../components/movie-item";

export default function Home() {
  const { searchResults } = useContext(GlobalContext);

  

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {searchResults && searchResults.length > 0 ? (
        searchResults.map((item) => <MovieItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show. Please search something
          </p>
        </div>
      )}
    </div>
  );
}

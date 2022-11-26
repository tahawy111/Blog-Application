import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="w-100 search position-relative">
      <input
        type="text"
        className="form-control me-2 w-100 my-2"
        value={search}
        placeholder="Enter Your Search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;

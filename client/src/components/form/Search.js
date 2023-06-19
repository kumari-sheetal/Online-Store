import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8081/api/v1/product/search/${values.Keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex " role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-1"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.Keyword}
          onChange={(e) => setValues({ ...values, Keyword: e.target.value })}
        />
        <button className=" reset btn me-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;

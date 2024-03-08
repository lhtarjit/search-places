import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { apiHeaders, apiUrl } from "../../common/constants/index";
import SearchBox from "../searchBox/SearchBox";
import Table from "../table/table";
import Pagination from "../pagination/pagination";
import LimitInput from "../limitInput/limitInput";
import { useDebouncedCallback } from "use-debounce";

const SearchPlaces = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [debounceValue, setDebounceValue] = useState("");
  const [debounceLimit, setDebounceLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    document.addEventListener("keydown", handleFocusShortcut);
    return () => {
      document.removeEventListener("keydown", handleFocusShortcut);
    };
  }, []);

  const getTableData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl.GET_CITIES, {
        params: {
          namePrefix: query,
          limit: limit,
          offset: (currentPage - 1) * limit,
        },
        headers: {
          [apiHeaders.RAPIDAPI_KEY]: process.env.REACT_APP_RAPIDAPI_KEY,
          [apiHeaders.RAPIDAPI_HOST]: process.env.REACT_APP_RAPIDAPI_HOST,
        },
      });
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    setCurrentPage(1);
    setDebounceValue(value);
  }, 500);

  const debouncedLimit = useDebouncedCallback((value) => {
    setCurrentPage(1);
    setDebounceLimit(value);
  }, 500);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value) => {
    debouncedLimit(value);
    setLimit(value);
  };

  const handleFocusShortcut = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      event.preventDefault();
      document.getElementById("search-input").focus();
    }
  };

  useEffect(() => {
    getTableData();
    // eslint-disable-next-line
  }, [currentPage, debounceLimit, debounceValue]);

  return (
    <div>
      <SearchBox onSearch={handleSearch} query={query} setQuery={setQuery} />
      <Table data={data} loading={loading} />
      <div className="pagination-component">
        {!loading && data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <LimitInput limit={limit} onChange={handleLimitChange} />
      </div>
    </div>
  );
};

export default SearchPlaces;

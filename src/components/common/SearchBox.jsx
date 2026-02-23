import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Styles from "../common/SearchBox.module.css";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBox({ onSearch, value }) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue.trim());
    }, 800);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <div className={Styles.searchBox_wrappper}>
      <input
        type="text"
        className={Styles.search}
        placeholder="Search Here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && <ClearIcon onClick={() => setInputValue("")} />}
      <SearchIcon />
    </div>
  );
}

export default SearchBox;

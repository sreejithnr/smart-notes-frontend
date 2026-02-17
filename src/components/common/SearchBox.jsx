import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Styles from "../common/SearchBox.module.css";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBox({ onSearch, value }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 800);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className={Styles.searchBox_wrappper}>
      <input
        type="text"
        className={Styles.search}
        placeholder="Search Here..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
      {value && <ClearIcon onClick={() => onSearch("")} />}
      <SearchIcon />
    </div>
  );
}

export default SearchBox;

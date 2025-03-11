import "./search-box.styles.css";
import {ChangeEvent} from "react";
type SearchBoxProps = {
  className: string;
  placeholder?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ( {className, placeholder, onChangeHandler}: SearchBoxProps ) => {
  return (
    <input
      type="search"
      className={className}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default SearchBox;

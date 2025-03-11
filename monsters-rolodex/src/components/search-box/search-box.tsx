import "./search-box.styles.css";
interface ISearchBoxProps{
  className: string;
  placeholder?: string;
}
interface ISearchBoxProps {
  onChangeHandler: (a:string) => void}

const SearchBox = ( {className, placeholder, onChangeHandler}: ISearchBoxProps ) => {
  return (
    <input
      type="search"
      className={className}
      placeholder={placeholder}
      onChange={(e)=>onChangeHandler(e)}
    />
  );
};

export default SearchBox;

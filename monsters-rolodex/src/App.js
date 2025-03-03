import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.jsx";
import SearchBox from "./components/search-box/search-box.jsx";
const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const[stringField, setStringField] = useState('');
  const [filterMonsters, setFilterMonsters] = useState(monsters);
  console.log(searchField);
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  const onStringChange = (event) => {
    setStringField(event.target.value);
  }
  useEffect(()=>{
    const newFilterMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(stringField);
    } );
    setFilterMonsters(newFilterMonsters);
    console.log("effect is firing")
  }, [monsters, searchField])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);
  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="search-box"
      />
      <SearchBox
        onChangeHandler={onStringChange}
        placeholder="set string"
      />
      <CardList monsters={filterMonsters} />
    </div>
  );
};

export default App;

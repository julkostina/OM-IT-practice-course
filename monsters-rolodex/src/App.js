import { useState } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.jsx";
import SearchBox from "./components/search-box/search-box.jsx";
const App = () => {
  const [searchField, setSearchField] = useState("");
  console.log(searchField);
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="search-box"
      />
      {/* <CardList monsters={filterMonsters} /> */}
    </div>
  );
};
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {
//             console.log(this.state.monsters);
//           }
//         )
//       );
//   }
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState(()=>{return {searchField}});

//   };
//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange} = this;
//     const filterMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className='search-box' />
//         <CardList monsters={filterMonsters} />
//       </div>
//     );
//   }
// }

export default App;

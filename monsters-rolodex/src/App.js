import { Component } from "react";
import "./App.css";
import CardList from './components/card-list/card-list.jsx'
class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state.monsters);
          }
        )
      );
  }
  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(()=>{return {searchField}});

  };
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange} = this;
    const filterMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <input
          type="search"
          className="search-box"
          placeholder="search monsters"
          onChange={onSearchChange}
        />
        {/* {filterMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })} */}
        <CardList monsters={filterMonsters}/>
      </div>
    );
  }
}

export default App;

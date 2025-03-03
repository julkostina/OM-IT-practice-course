import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [
        {
          name: "Linda",
          id:"ef041",
        },
        {
          name: "Frank",
          id: "284h4",
        },
        {
          name: "Jacky",
          id: "ef043",
        },
        {
          name: "Andrei",
          id: "ef044",
        },
      ],
    };
  }
  render() {
    return (
      <div className="App">
        {this.state.monsters.map((monster) => {
          return  <div key={monster.id}><h1>{monster.name}</h1></div>
        })}
      </div>
    );
  }
}

export default App;

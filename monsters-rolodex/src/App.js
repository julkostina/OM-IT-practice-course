import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
    monsters:[ {
      name:'Linda',
     },
      {
        name:'Frank',
      },
      {
        name:'Jacky',
      },
    {
      name:'Andrei',
    }
    ]
    };
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        {
          this.state.monsters.map(monster => <h1>{monster.name}</h1>) 
        }
      </header>
    </div>
  );
}
}

export default App;

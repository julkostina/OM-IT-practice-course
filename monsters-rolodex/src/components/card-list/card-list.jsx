import { Component } from "react";

class CardList extends Component {
  render() {
    const { monsters } = this.props;
    return (
      <div className="card-list">
        {monsters.map((monster) => {
          const { id, name, email } = monster;
          return (
            <div className="card-container" key={id}>
              <img alt={`monster ${name}`} src={`https://robohash.org/${id}`}/>
              <h2 key={id}>{name}</h2>
              <p>{email}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CardList;

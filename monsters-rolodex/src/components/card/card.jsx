import { Component } from "react";
import './card.styles.css'
class Card extends Component {
  render() {
    const { id, name, email } = this.props.monster;
    return (
      <div>
        <div className="card-container" key={id}>
              <img alt={`monster ${name}`} src={`https://robohash.org/${id}?size=180x180`}/>
              <h2 key={id}>{name}</h2>
              <p>{email}</p>
            </div>
      </div>
    );
  }
}
export default Card;
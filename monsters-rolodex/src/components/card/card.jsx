import "./card.styles.css";
const Card = ({monster}) => {
  const { id, name, email } = monster;
  return (
    <div>
      <div className="card-container" key={id}>
        <img
          alt={`monster ${name}`}
          src={`https://robohash.org/${id}?size=180x180`}
        />
        <h2 key={id}>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;

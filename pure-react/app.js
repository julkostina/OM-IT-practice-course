const Person = (props) => {
    return React.createElement("div", {}, [
      React.createElement("h1", {}, props.name),
      React.createElement("p", {}, props.occupation),
    ]);
  };
  const App = () => {
    return React.createElement("div", {}, [
      React.createElement("h1", { class: "title" }, "React is rendered"),
      React.createElement(
        Person,
        { name: "John Doe", occupation: "Software Engineer" },
        null
      ),
      React.createElement(
        Person,
        { name: "John Doe", occupation: "Architect" },
        null
      ),
      React.createElement(
        Person,
        { name: "Jane Doe", occupation: "Doctor" },
        null
      ),
    ]);
  };

  ReactDOM.render(
    React.createElement(App),
    document.getElementById("root")
  );
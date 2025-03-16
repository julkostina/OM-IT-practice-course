const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getPeoplePromise = (fetch) => {
  return fetch("http://swapi.py4e.com/api/people")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return {
        count: data.count,
        results: data.results,
      };
    });
};

const getPeople = async (fetch) => {
  const getRequest = await fetch("http://swapi.py4e.com/api/people");
  const data = await getRequest.json();
  console.log(data);
  return {
    count: data.count,
    results: data.results,
  };
};

module.exports = { getPeoplePromise, getPeople };
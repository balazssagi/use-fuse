import ReactDOM from "react-dom";
import React from "react";
import useFuse from "use-fuse";

const options = {
  keys: ["name"],
  threshold: 0.6
};

function App() {
  const [list] = React.useState([
    { name: "Hesse" },
    { name: "Pelevin" },
    { name: "Steinbeck" },
    { name: "Moore" },
    { name: "Atwood" }
  ]);
  const [search, setSearch] = React.useState("");
  const filteredList = useFuse(list, search, options);

  return (
    <React.Fragment>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
        }}
      />
      <ul>
        {(search ? filteredList : list).map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

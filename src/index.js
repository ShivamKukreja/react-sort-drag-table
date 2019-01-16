import React from "react";
import ReactDOM from "react-dom";
import Table from './Table'
import "./styles.css";

function App() {
  return (
    <div>
      <Table />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

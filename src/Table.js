import React from "react";
import axios from 'axios';
import TableDragnDrop from "./TableDragnDrop";


class Table extends TableDragnDrop(React.Component) {
  constructor() {
    super();
    this.state.arrowup = true
    this.state.headers = ["investment", "commitmentDate", "marketValue"];
    this.state.rows = []
    /* this.state.rows = [
      {
        investment: 10000,
        commitmentDate: "15 June 2019",
        marketValue: "High"
      },
      {
        investment: 13456,
        commitmentDate: "14 June 2019",
        marketValue: "Low"
      },
      {
        investment: 90990,
        commitmentDate: "10 June 2019",
        marketValue: "Good"
      },
      {
        investment: 67788,
        commitmentDate: "11 June 2019",
        marketValue: "Medium"
      },
      {
        investment: 23234,
        commitmentDate: "11 June 2019",
        marketValue: "Medium"
      }
    ]; */
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/data`)
      .then(res => {
        const rows = res.data;
        this.setState({ rows });
      }).catch(function (error) {
          console.log("There is an Error in API call", error);
      });
  }
  compareByAcen(key) {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
  compareByDcen(key) {
    return function(a, b) {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    };
  }

  sortBy(key) {
    let arrayCopy = [...this.state.rows];
    if(this.state.arrowup) {
      arrayCopy.sort(this.compareByAcen(key));
    } else {
      arrayCopy.sort(this.compareByDcen(key));
    }
    this.setState({arrowup : !this.state.arrowup})
    this.setState({ rows: arrayCopy });
  }
  renderHeaders() {
    return this.state.headers.map((header, i) => {
      let dragHandle =
        this.dragHandle(
          <button className="pull-right btn btn-default">
            <span  className={
        this.state.arrowup ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down'
      } />
          </button>
        );
      let tableCellClass = "";
      if (i === this.state.currentlySelected) {
        tableCellClass += " drag-selection";
      }
      if (i === this.state.currentlyOver) {
        tableCellClass += " drag-target";
      }

      return (
        <th className={tableCellClass} onClick={() => this.sortBy(header)}>
          {header}
          {dragHandle}
        </th>
      );
    });
  }

  renderCells(row) {
    return this.state.headers.map((header, i) => {
      let cell = row[header];
      let tableCellClass = "";
      if (i === this.state.currentlySelected) {
        tableCellClass += " drag-selection";
      }
      if (i === this.state.currentlyOver) {
        tableCellClass += " drag-target";
      }
      return <td className={tableCellClass}>{cell}</td>;
    });
  }

  renderRows() {
    return this.state.rows.map((row, i) => {
      let cells = this.renderCells(row);
      return <tr>{cells}</tr>;
    });
  }

  render() {
    const headers = this.renderHeaders();
    const rows = this.renderRows();
    return this.dragContainer(
      <table className="table table-bordered">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Table;

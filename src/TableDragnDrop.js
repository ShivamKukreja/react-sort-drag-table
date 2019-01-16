import React from "react";
const TableDragnDrop = superclass =>
  class extends superclass {
    constructor() {
      super();
      this.state = this.state || {};
      this.state.columnX = 0;
      this.state.columnY = 0;
      this.state.dragging = false;
    }

    dragHandle(children) {
      return <span onMouseDown={this._onStartDrag.bind(this)}>{children}</span>;
    }

    dragContainer(children) {
      const dragColumn = this.state.dragging ? this._renderDragColumn() : null;
      const styles = {
        position: "relative"
      };
      return (
        <div
          onMouseUp={this._endDrag.bind(this)}
          onMouseMove={this._updateStyles.bind(this)}
          onMouseOver={this._isOver.bind(this)}
          onMouseLeave={this._exitWithoutChange.bind(this)}
          style={styles}
          ref={container => (this.container = container)}
        >
          {children}
          {dragColumn}
        </div>
      );
    }

    _exitWithoutChange() {
      let newState = {};
      newState.dragging = false;
      newState.currentlySelected = undefined;
      newState.currentlyOver = undefined;
      this.setState(newState);
    }

    _renderDragColumn(target) {
      let styles = {
        position: "absolute",
        left:
          this.state.columnX + 10 - this.container.getBoundingClientRect().left,
        top: 0,
        width: this.state.columnWidth,
        border: "1px solid #c00"
      };

      return <div style={styles}>{"Drag"}</div>;
    }

    _createColumnTemplate(target) {
      const header = this._closestTag(target, "th");
      const table = this._closestTag(target, "table");
      const tbody = table.getElementsByTagName("tbody");
      const rows = tbody[0].getElementsByTagName("tr");
      const cellIndex = header.cellIndex;
      const cells = [];
      if (rows.length) {
        // populate cells
        for (var i = 0; i < rows.length; i++) {
          let node = rows[i].childNodes[cellIndex];
          node ? cells.push(node) : null;
        }
      }
      const headerMarkup = header.outerHTML;
      const tableClass = table.className;
      const tableRows = cells.map(cell => {
        return <tr dangerouslySetInnerHTML={{ __html: cell.outerHTML }} />;
      });

      return (
        <table className={tableClass}>
          <thead>
            <tr dangerouslySetInnerHTML={{ __html: headerMarkup }} />
          </thead>
          <tbody>{"tableRows"}</tbody>
        </table>
      );
    }

    _onStartDrag(event) {
      let header = this._closestTag(event.target, ["th", "td"]);
      let newState = {};
     // newState.dragColumn = this._createColumnTemplate(event.target);
      newState.dragging = true;
      newState.currentlySelected = header.cellIndex;
      newState.columnWidth = header.getBoundingClientRect().width;
      newState.columnX = event.clientX;
      newState.columnY = event.clientY;
      this.setState(newState);
    }

    _endDrag() {
      this._reorder();
      this._clearDragState();
    }

    _clearDragState() {
      let newState = {};
      newState.dragging = false;
      newState.currentlySelected = undefined;
      newState.currentlyOver = undefined;
      this.setState(newState);
    }

    _isOver() {
      if (!this.state.dragging) {
        return;
      }
      let newState = {};
      newState.currentlyOver = this._closestTag(event.target, [
        "th",
        "td"
      ]).cellIndex;
      this.setState(newState);
    }

    // Transverse up to find a table cell.
    _closestTag(element, target) {
      if (
        !element ||
        !element.tagName ||
        element.tagName.toLowerCase() === "body"
      ) {
        return "Error: no parent #{target} found";
      }
      if (
        element.tagName.toLowerCase() == target ||
        target.indexOf(element.tagName.toLowerCase()) != -1
      ) {
        return element;
      } else {
        return this._closestTag(element.parentNode, target);
      }
    }

    _reorder() {
      let oldHeaders = [];
      this.state.headers.forEach(header => {
        oldHeaders.push(header);
      }); // copy current headers
      const selectedIndex = this.state.currentlySelected;
      const overIndex = this.state.currentlyOver;
      let newState = {};
      const selectedHeader = oldHeaders.splice(selectedIndex, 1)[0];
      overIndex == 0
        ? oldHeaders.unshift(selectedHeader)
        : oldHeaders.splice(overIndex, 0, selectedHeader);
      newState.headers = oldHeaders;
      this.setState(newState);
    }

    _updateStyles(event) {
      if (!this.state.dragging) {
        return;
      }
      let newState = {};
      newState.columnX = event.clientX;
      newState.columnY = event.clientY;
      this.setState(newState);
    }
  };

export default TableDragnDrop;

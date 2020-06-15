import React, { Component } from 'react';

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      /* If given path is same as current column's, toggle its sort order. */
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      /* Otherwise, sort the newly selected column in ascending order. */
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    /* If given column is not the sortColumn, don't render any sort icon */
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;

    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className={column.path && 'clickable'}
              key={column.path || column.key}
              onClick={column.path && (() => this.raiseSort(column.path))}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

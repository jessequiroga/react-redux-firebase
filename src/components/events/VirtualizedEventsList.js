import React, { Component } from "react";
import { connect } from "react-redux";
import { moduleName, fetchAll, eventsListSelector } from "../../ducks/events";
import { Table, Column } from "react-virtualized";
import 'react-virtualized/styles.css'

class EventsList extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const { events, loading } = this.props;
    const TableWidth = 768
    const columnWidth = TableWidth / 4

    if (loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <Table
        rowCount={events.length}
        rowGetter={this.rowGetter}
        rowHeight = {40}
        width={TableWidth}
        height={300}
        overscanColumnCount = {5} 
      >
        <Column dataKey="title" label="Name" width={columnWidth} />
        <Column dataKey="where" label="Wher" width={columnWidth} />
        <Column dataKey="when" label="When" width={columnWidth} />
        <Column dataKey="month" label="Month" width={columnWidth} />
      </Table>
    );
  }

  rowGetter = ({ index }) => {
    return this.props.events[index];
  };

  getRows() {
    return this.props.events.map(this.getRow);
  }

  getRow = eventEl => {
    return (
      <tr key={eventEl.uid}>
        <td>{eventEl.title}</td>
        <td>{eventEl.where}</td>
        <td>{eventEl.month}</td>
      </tr>
    );
  };
}

export default connect(
  state => ({
    events: eventsListSelector(state),
    loading: state[moduleName].loading
  }),
  { fetchAll }
)(EventsList);

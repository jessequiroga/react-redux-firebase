import React, { Component } from "react";
import { connect } from "react-redux";
import { moduleName, fetchLazy, eventsListSelector } from "../../ducks/events";
import { Table, Column, InfiniteLoader } from "react-virtualized";
import "react-virtualized/styles.css";

class EventsList extends Component {
  componentDidMount() {
    this.props.fetchLazy();
  }

  render() {
    const { events, loading, loaded } = this.props;
    const TableWidth = 768;
    const columnWidth = TableWidth / 4;

    // if (loading) {
    //   return <h2>Loading...</h2>;
    // }

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        rowCount={loaded ? loaded : this.props.events.length + 1}
        loadMoreRows={this.loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            rowCount={events.length}
            rowGetter={this.rowGetter}
            rowHeight={40}
            width={TableWidth}
            height={300}
            overscanColumnCount={5}
            onRowsRendered={onRowsRendered}
          >
            <Column dataKey="title" label="Name" width={columnWidth} />
            <Column dataKey="where" label="Wher" width={columnWidth} />
            <Column dataKey="when" label="When" width={columnWidth} />
            <Column dataKey="month" label="Month" width={columnWidth} />
          </Table>
        )}
      </InfiniteLoader>
    );
  }

  isRowLoaded = ({ index }) => index < this.props.events.length;

  loadMoreRows = () => {
    console.log("loadMoreRows");
    this.props.fetchLazy();
  };

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
  { fetchLazy }
)(EventsList);

import React, { Component } from "react";
import { connect } from "react-redux";
import { moduleName, fetchAll, eventsListSelector } from "../../ducks/events";

class EventsList extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    if (this.props.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <table>
          <tbody>{this.getRows()}</tbody>
        </table>
      </div>
    );
  }

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
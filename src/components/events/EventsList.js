import React, { Component } from "react";
import { connect } from "react-redux";
import { moduleName, fetchAll} from "../../ducks/events";

class EventsList extends Component {
  componentDidMount () {
    this.props.fetchAll();
  }

  render() {
    return <div />;
  }
}

export default connect(state => {
  events: state[moduleName];
}, {fetchAll})(EventsList);

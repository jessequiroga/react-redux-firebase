import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Column } from "react-virtualized";
import {
  moduleName,
  eventsListSelector,
  loadAllPerson
} from "../../ducks/people";

class PeopleList extends Component {
  componentDidMount() {
    this.props.loadAllPerson();
  }

  render() {
    const { people } = this.props;
    const TableWidth = 768;
    const columnWidth = TableWidth / 3;

    return (
      <Table
        rowCount = {people.length}
        rowGetter={this.rowGetter}
        rowHeight={40}
        width={TableWidth}
        height={300}
      >
        <Column dataKey="firstName" label="Name" width={columnWidth} />
        <Column dataKey="lastName" label="Last Name" width={columnWidth} />
        <Column dataKey="email" label="E-mail" width={columnWidth} />
      </Table>
    );
  }

  rowGetter = ({index}) => {
    return this.props.people[index];
  }
}

export default connect(
  state => ({
    people: eventsListSelector(state),
    loading: state[moduleName].loading
  }),
  { loadAllPerson }
)(PeopleList);

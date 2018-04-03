import React, { Component } from "react";
import NewPersonForm from "../people/NewPersonForm";
import PeopleTable from '../people/PeopleTable'
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { addPerson, moduleName } from "../../ducks/people";

class AddPersonPage extends Component {
  handleAddPerson = person => {
    this.props.addPerson(person)
  };

  render() {
    return (
      <div>
        <NewPersonForm onSubmit={this.handleAddPerson}/>
        <PeopleTable />
      </div>
    );
  }
}

export default connect(null, { addPerson })(AddPersonPage);

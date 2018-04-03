import React, { Component } from 'react';

class PeopleCard extends Component {
  render() {
    const {person, style} = this.props;
    console.log('====', person)
    return (
      <div {...style}>
        <h4>
          {person.firstName}
        </h4>
        <p>
          {person.email}
        </p>
      </div>
    )
  }
};

export default PeopleCard;

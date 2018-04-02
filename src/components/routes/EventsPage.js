import React, { Component } from 'react';
import VirtualizedEventsList from '../events/VirtualizedEventsList'

class EventsPage extends Component {
  render() {
    return (
      <div>
        <h1>
          Events Page
        </h1>
        <VirtualizedEventsList />
      </div>
    );
  }
}

export default EventsPage;
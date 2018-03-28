import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class UnAuthrized extends Component {
  state = {  }
  render() {
    return (
      <div>
        <h1>
          Not Auth
          <Link to="/auth/signup">SignUP</Link>
        </h1>
      </div>
    );
  }
}

export default UnAuthrized;
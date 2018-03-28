import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {moduleName} from '../../ducks/auth'
import UnAuthrized from './UnAuthrized'

class ProtectedRoute extends Component {
  render() {
    const {component, ...rest} = this.props;

    return (
      <Route {...rest} render= {this.renderProtected} />
    );
  }

  renderProtected = routeProps => {
    const {authorized} = this.props;
    console.log(authorized)
    return authorized ? <ProtectedRoute {...routeProps}/> : <UnAuthrized />
  }
}

export default connect(state => ({
  authorized: state[moduleName].user
}))(ProtectedRoute);
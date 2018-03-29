import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import ErrorField from "./ErrorField";

class SignInForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Sign IN</h2>
        <form onSubmit={handleSubmit}>
          <Field name="email" component={ErrorField} />
          <Field name="password" component={ErrorField} type="password" />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "auth"
})(SignInForm);

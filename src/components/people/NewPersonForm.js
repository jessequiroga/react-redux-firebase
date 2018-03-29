import React, { Component } from "react";
import { reduxForm, Field} from "redux-form";
import validator from "email-validator";
import ErrorField from "../auth/ErrorField";

class NewPersonForm extends Component {
  render() {
    const { handleSubmit, reset} = this.props;
    return (
      <div>
        <h2>Person Form</h2>
        <form
          onSubmit={handleSubmit}
        >
          <Field name="firstName" component={ErrorField} />
          <Field name="lastName" component={ErrorField} />
          <Field name="email" component={ErrorField} />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = ({ firstName, email }) => {
  const errors = {};
  if (!firstName) errors.firstName = "first name is required";
  if (!email) errors.email = "email is required";
  else if (!validator.validate(email)) errors.email = "invalid email";

  return errors;
};

const onSubmitSuccess = res => {
  return res
}

export default reduxForm({
  form: "person",
  validate
})(NewPersonForm);

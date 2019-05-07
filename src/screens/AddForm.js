import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";

const validate = values => {
	const errors = {};
	if (!values.filename) {
		errors.filename = "Required";
	}
	return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<div>
		<label>{label}</label>
		<div>
			<input {...input} placeholder={label} type={type} />
			{touched && error && <span>{error}</span>}
		</div>
	</div>
);

class AddForm extends Component {
	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;

		const goHome = () => {
			this.props.history.push("/");
		};

		const submit = values => {
			this.props.addKey(values);
		};

		return (
			<form onSubmit={handleSubmit(submit)}>
				<Field
					name="filename"
					type="text"
					component={renderField}
					label="Filename"
				/>
				<Field
					name="passphrase"
					type="text"
					component={renderField}
					label="Passphrase"
				/>
				<div>
					<button type="submit" disabled={submitting}>
						Submit
					</button>
					<button
						type="button"
						disabled={pristine || submitting}
						onClick={reset}
					>
						Clear Values
					</button>
					<button type="button" onClick={goHome}>
						Cancel
					</button>
				</div>
			</form>
		);
	}
}

AddForm = connect(
	undefined,
	actions
)(AddForm);
AddForm = withRouter(AddForm);
export default reduxForm({
	form: "AddForm", // a unique identifier for this form
	validate, // <--- validation function given to redux-form
	initialValues: {
		passphrase: ""
	}
})(AddForm);

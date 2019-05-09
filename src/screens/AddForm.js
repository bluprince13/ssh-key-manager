import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

import * as actions from "../actions";
import Tooltip from "../components/Tooltip";
import { StyledButton, StyledIcon } from "../components/styled";

const StyledForm = styled.form`
	margin: 2rem;
`;

const StyledFieldGroup = styled.div`
	display: block;
`;

const StyledField = styled.div`
	margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
	font-size: ${props => props.theme.small};
`;

const StyledInput = styled.input`
	display: block;
	width: 100%;

	padding: 0.375rem 0.75rem;
	font-size: ${props => props.theme.medium};
	line-height: 1.5;
	color: #495057;
	background-color: ${props => props.theme.lightest}
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

	&::placeholder {
		font-size: ${props => props.theme.small};
	}

	&:focus {
		color: #495057;
		background-color: #fff;
		border-color: #80bdff;
		outline: 0;
		box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
	}
`;

const StyledError = styled.span`
	color: ${props => props.theme.highlight};
	font-size: ${props => props.theme.small};
`;

const StyledButtonGroup = styled.div`
	margin: 2rem;
`;

const shadowpulse = keyframes`
	0% {
		box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
	}
	100% {
		box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
	}
`;

const LoadingButton = styled(StyledButton)`
	animation: ${props =>
		props.submitted
			? css`
					${shadowpulse} 1s infinite
			  `
			: ""};
`;

const validate = (values, props) => {
	const errors = {};
	if (!values.filename) {
		errors.filename = "Required";
	}

	const { keys } = props;
	const isFilenameUsed = keys.filter(
		key => key.privateKeyFilename === values.filename
	);
	if (isFilenameUsed) {
		errors.filename = "This filename is already taken";
	}

	return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<StyledField>
		<StyledLabel>{label}</StyledLabel>
		<StyledInput {...input} placeholder={label} type={type} />
		{touched && error && <StyledError>{error}</StyledError>}
	</StyledField>
);

class AddForm extends Component {
	state = {
		submitted: false
	};

	componentDidMount() {
		const { dispatch, change } = this.props;
		const { keys } = this.props;
		const isDefaultUsed = keys.filter(
			key => key.privateKeyFilename === "id_rsa"
		);
		if (isDefaultUsed.length == 0) {
			dispatch(change("filename", "id_rsa"));
		}
	}

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;

		const goHome = () => {
			this.props.history.push("/");
		};

		const submit = values => {
			this.submitted = true;
			this.props.addKey(values);
		};

		return (
			<StyledForm onSubmit={handleSubmit(submit)}>
				<StyledFieldGroup className="clearfix">
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
						label="Passphrase - recommended"
					/>
					<Field
						name="comment"
						type="text"
						component={renderField}
						label="Comment - optional"
					/>
				</StyledFieldGroup>

				<StyledButtonGroup>
					<StyledButton
						type="button"
						style={{ float: "left" }}
						onClick={goHome}
						data-tip="Cancel"
						data-for="cancel"
					>
						<StyledIcon className="fas fa-window-close fa-md" />
						<Tooltip id="clear" />
					</StyledButton>
					<StyledButton
						style={{ float: "right" }}
						type="button"
						disabled={pristine || submitting}
						onClick={reset}
						data-tip="Reset"
						data-for="reset"
					>
						<StyledIcon className="fas fa-eraser fa-md" />
						<Tooltip id="reset" />
					</StyledButton>
					<LoadingButton
						submitted={this.submitted}
						type="submit"
						style={{ margin: "0 auto" }}
						disabled={submitting}
						data-tip="Submit"
						data-for="submit"
					>
						<StyledIcon className="fas fa-play fa-md" />
						<Tooltip id="submit" />
					</LoadingButton>
				</StyledButtonGroup>
			</StyledForm>
		);
	}
}

function mapStateToProps(state) {
	return { keys: state.keys };
}

AddForm = reduxForm({
	form: "AddForm", // a unique identifier for this form
	validate, // <--- validation function given to redux-form
	initialValues: {
		passphrase: ""
	}
})(AddForm);
AddForm = connect(
	mapStateToProps,
	actions
)(AddForm);
AddForm = withRouter(AddForm);

export default AddForm;

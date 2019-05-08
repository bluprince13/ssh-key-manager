import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import * as actions from "../actions";
import Tooltip from "../components/Tooltip";

const StyledForm = styled.form`
	margin: 2rem;
`;

const StyledFieldGroup = styled.div`
	display: block;
`;

const StyledField = styled.div`
	margin-bottom: 1rem;
`;

const StyledInputError = styled.div``;

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

const StyledIcon = styled.i``;

const StyledButton = styled.button`
	background-color: #b2ebf2;
	display: block;

	height: 3rem;
	width: 3rem;
	border-radius: 50%;

	&: hover:enabled {
		background-color: #4dd0e1;

		${StyledIcon} {
			color: red;
		}
	}

	&:  active:enabled {
		background-color: #0097a7;
	}

	&: focus {
		outline: none;
		border: none;
	}
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
	&: focus {
		animation: ${shadowpulse} 1s infinite;
	}
`;

const validate = values => {
	const errors = {};
	if (!values.filename) {
		errors.filename = "Required";
	}
	return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<StyledField>
		<StyledInputError>
			<StyledInput {...input} placeholder={label} type={type} />
			{touched && error && <StyledError>{error}</StyledError>}
		</StyledInputError>
	</StyledField>
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

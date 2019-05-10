import React, { Component } from "react";
import styled from "styled-components";

import ReactTooltip from "react-tooltip";
import Tooltip from "./Tooltip";

const StyledRow = styled.li`
	background: ${props => props.theme.lightest};
	font-size: ${props => props.theme.medium};

	position: relative;
	display: block;
	padding: 0.75rem 1.25rem;
	margin-bottom: -1px;
	border: 1px solid rgba(0, 0, 0, 0.125);

	&:hover {
		background: ${props => props.theme.light};
	}

	&:first-child {
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	}

	&:last-child {
		margin-bottom: 0;
		border-bottom-right-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
	}
`;

const StyledIcon = styled.i`
	&: hover {
		color: ${props => props.theme.highlight};
	}
`;

const StyledListGroup = styled.ul`
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	padding-left: 0;
	margin-bottom: 0;
`;

class KeyList extends Component {
	handleCopy(key) {
		this.props.copyKey(key);

		setTimeout(() => {
			ReactTooltip.hide();
		}, 1500);
	}

	renderKeys() {
		const keys = this.props.keys;

		return keys.map(key => {
			const { privateKeyFilename, publicKeyPath } = key;
			return (
				<StyledRow key={privateKeyFilename}>
					<div style={{ float: "left" }}>
						{privateKeyFilename}
						<span data-tip="Copy" data-for="copy">
							<span
								onClick={() => {
									this.handleCopy(key);
								}}
								data-tip="Copied"
								data-event="click"
								data-for="copied"
							>
								<StyledIcon className="fas fa-copy fa-fw" />
							</span>
						</span>
						<Tooltip id="copy" />
						<Tooltip id="copied" />
					</div>
					<div style={{ float: "right" }}>
						<span
							data-tip="Delete"
							data-for="delete"
							onClick={() => {
								this.props.removeKey(key);
							}}
						>
							<StyledIcon className="fas fa-trash-alt" />
						</span>
						<Tooltip id="delete" />
					</div>
				</StyledRow>
			);
		});
	}

	render() {
		return <StyledListGroup>{this.renderKeys()}</StyledListGroup>;
	}
}

export default KeyList;

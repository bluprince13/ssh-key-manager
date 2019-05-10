import styled from "styled-components";

export const StyledIcon = styled.i``;

export const StyledButton = styled.button`
	background-color: ${props => props.theme.light};
	display: block;

	height: 3rem;
	width: 3rem;
	border-radius: 50%;

	&: hover {
		background-color: ${props => props.theme.dark};

		${StyledIcon} {
			color: ${props => props.theme.highlight};
		}
	}

	&: focus {
		outline: none;
		border: none;
	}

	&: active {
		background-color: ${props => props.theme.darkest};
	}
`;


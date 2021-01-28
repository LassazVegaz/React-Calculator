import React from "react";

export const NumericalButton = (props) => {
	return (
		<button className="button" onClick={() => props.onClick(props.number)}>
			{props.number}
		</button>
	);
};

export const OperationButton = (props) => {
	return (
		<button
			className="button operator"
			onClick={() => props.onClick(props.operator)}
		>
			{props.operator}
		</button>
	);
};

export const ClearButton = (props) => {
	return (
		<button className="button clear" onClick={props.onClick}>
			Clear
		</button>
	);
};

export const Display = (props) => {
	return <div className="display">{props.text}</div>;
};

import React from "react";
import {
	ClearButton,
	NumericalButton,
	Display,
	OperationButton,
} from "./Components";

class CalApp extends React.Component {
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			output: "0",
		};

		// Add key down event for whole document
		document.addEventListener("keydown", this.handleKeyDown);
	}

	/**
	 * Handle numerical or operational inputs
	 * @param {string} txt Numerical or operational input
	 */
	appendToOutput = (txt) => {
		// Get current output from state
		let output = this.state.output;

		// If input only contain a 0 (init state) or Error,
		// clear it so 'txt' will be there
		if (output === "0" || output === "Error") output = "";

		// Add new part to output and change state
		this.setState({
			output: output + txt,
		});
	};

	/**
	 * Clear output
	 */
	handleClear = () => {
		this.setState({
			output: "0",
		});
	};

	/**
	 * Handle evaluation
	 */
	handleEvaluate = () => {
		let result = "";
		try {
			// eslint-disable-next-line no-eval
			result = eval(this.state.output.replace("x", "*")).toString();
			if (result.includes("Error")) result = "Error";
		} catch (error) {
			console.log(error);
			result = "Error";
		}

		this.setState({
			output: result,
		});
	};

	/**
	 * Handle key press event
	 * @param {KeyboardEvent} ev Key press event
	 */
	handleKeyDown = (ev) => {
		const key = ev.key.toLowerCase();
		const operations = ["+", "-", "*", "/", "x"];

		// calculate on = or enter key pressed
		if (key === "=" || ev.code === "NumpadEnter" || ev.code === "Enter") {
			this.handleEvaluate();

			// Append to output if key is numeric or operational or x
		} else if (!isNaN(parseInt(key)) || operations.includes(key)) {
			this.appendToOutput(key);

			// pop from output if backspace is pressed
		} else if (ev.code === "Backspace" && this.state.output != null) {
			const length = this.state.output.length;
			const newOutput = this.state.output.substr(0, length - 1);
			this.setState({
				output: newOutput,
			});
		}
	};

	render() {
		const { output } = this.state;

		return (
			<div className="cal-app">
				<Display text={output} />
				<NumericalButton number="1" onClick={this.appendToOutput} />
				<NumericalButton number="2" onClick={this.appendToOutput} />
				<NumericalButton number="3" onClick={this.appendToOutput} />
				<OperationButton operator="+" onClick={this.appendToOutput} />
				<NumericalButton number="4" onClick={this.appendToOutput} />
				<NumericalButton number="5" onClick={this.appendToOutput} />
				<NumericalButton number="6" onClick={this.appendToOutput} />
				<OperationButton operator="-" onClick={this.appendToOutput} />
				<NumericalButton number="7" onClick={this.appendToOutput} />
				<NumericalButton number="8" onClick={this.appendToOutput} />
				<NumericalButton number="9" onClick={this.appendToOutput} />
				<OperationButton operator="x" onClick={this.appendToOutput} />
				<ClearButton onClick={this.handleClear} />
				<NumericalButton number="0" onClick={this.appendToOutput} />
				<OperationButton operator="=" onClick={this.handleEvaluate} />
				<OperationButton operator="/" onClick={this.appendToOutput} />
			</div>
		);
	}
}

export default CalApp;

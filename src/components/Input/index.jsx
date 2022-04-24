import React from "react";

import "./Input.css";

function Input(props) {
	return (
		<div className="input-container">
			<label htmlFor={props.id}>{props.label || "Label"}</label>
			<input {...props} />
		</div>
	);
}

export default Input;

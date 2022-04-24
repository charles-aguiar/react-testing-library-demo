import "./App.css";

import Form from "./components/Form";

function App() {
	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className="container">
			<Form onSubmit={onSubmit} />
		</div>
	);
}

export default App;

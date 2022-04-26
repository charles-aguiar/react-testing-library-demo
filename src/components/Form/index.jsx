import { useCallback, useState } from "react";

import Dropdown from "../Dropdown";
import Input from "../Input";
import SyncLoader from "react-spinners/SyncLoader";

import "./Form.css";

const options = [
	"ReactJS",
	"NodeJS",
	"Typescript",
	"Angular",
	".NET Core",
	"SpringBoot",
];

/*
	1) Chamar função onSubmit quando o botão de submit for clicado, passando evento e os dados do cadastro
	2) Desabilitar botão de submit caso algum campo esteja vazio
*/

function Form({ onSubmit, loading }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState(null);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			onSubmit({ title, description, category });
		},
		[onSubmit, title, description, category]
	);

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Input
				id="title-input"
				aria-label="title-input"
				name="title"
				type="text"
				placeholder="Type Todos title"
				label="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Input
				id="description-input"
				aria-label="description-input"
				name="description"
				type="text"
				placeholder="Type Todos description"
				label="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<Dropdown
				label="Categoria"
				placeholder="Select a category"
				options={options}
				selected={category}
				onSelection={setCategory}
			/>
			<button
				type="submit"
				data-testid="form-submit-button"
				disabled={!title || !description || !category}
			>
				{loading ? <SyncLoader size={10} color="white" /> : "Create Todo"}
			</button>
		</form>
	);
}

export default Form;

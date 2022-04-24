import { useCallback, useState } from "react";

import Dropdown from "../Dropdown";
import Input from "../Input";

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

function Form({ onSubmit }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [selectedTechonology, setSelectedTechonology] = useState(null);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			onSubmit({ username, password, selectedTechonology });
		},
		[onSubmit, username, password, selectedTechonology]
	);

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Input
				id="name-input"
				aria-label="name-input"
				name="name"
				type="text"
				placeholder="Digite seu nome"
				label="Nome"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Input
				id="password-input"
				aria-label="password-input"
				name="password"
				type="password"
				placeholder="Digite sua senha"
				label="Senha"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Dropdown
				label="Tecnologia"
				placeholder="Selecione uma opção..."
				options={options}
				selected={selectedTechonology}
				onSelection={setSelectedTechonology}
			/>
			<button
				type="submit"
				data-testid="form-submit-button"
				disabled={!username || !password || !selectedTechonology}
			>
				Cadastrar
			</button>
		</form>
	);
}

export default Form;

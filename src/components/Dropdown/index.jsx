import { useCallback, useState } from "react";

import "./Dropdown.css";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

/*
	1) Dropdown inicialmente fechado;
	2) Mostrar opções ao clicar no botão
	3) Selecionar opção ao clicar no item
*/

function Dropdown({
	label,
	placeholder = "Click to see options",
	selected,
	options,
	onSelection,
}) {
	const [open, setOpen] = useState(false);

	const toggleDropdown = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const handleSelection = useCallback(
		(option) => {
			onSelection(option);
			toggleDropdown();
		},
		[onSelection, toggleDropdown]
	);

	return (
		<div className="dropdown-container">
			<label>{label}</label>
			<button
				type="button"
				onClick={toggleDropdown}
				aria-label="dropdown-anchor-button"
			>
				{selected || placeholder}
				{open ? <FaChevronUp color="gray" /> : <FaChevronDown color="gray" />}
			</button>
			{open && (
				<div className="dropdown-menu">
					<ul role="menu">
						{options.map((option) => (
							<li
								role="menuitem"
								key={option}
								onClick={() => handleSelection(option)}
								className={option === selected ? "selected" : ""}
							>
								{option}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Dropdown;

import React from "react";
import { useSoundStore } from "../../stores/useSoundStore";
import PlayButtonIcon from "./PlayButtonIcon";

export const NavButtonComponent = ({ onClick, direction = "next" }) => {
	const { playSound } = useSoundStore();
	const handleClick = () => {
		playSound("close");
		onClick();
	};

	const handlePointerOver = (e) => {
		playSound("hover");
	};

	const rotation = direction === "prev" ? "rotate(180deg)" : "rotate(0deg)";

	return (
		<button
			onClick={handleClick}
			onPointerEnter={handlePointerOver}
			style={{
				background: "none",
				border: "none",
				padding: "0",
				cursor: "pointer",
				transform: rotation, // Applique la rotation ici
			}}
		>
			<PlayButtonIcon />
		</button>
	);
};

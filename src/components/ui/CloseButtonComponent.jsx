import React from "react";
import { useSoundStore } from "../../stores/useSoundStore";
import CloseButtonIcon from "./CloseButtonIcon";

export const CloseButtonComponent = ({ onClick }) => {
	const { playSound } = useSoundStore();
	const handleClick = () => {
		playSound("close");
		onClick();
	};

	const handlePointerOver = (e) => {
		playSound("hover");
	};

	return (
		<button
			onClick={handleClick}
			onPointerEnter={handlePointerOver}
			className="dialogue-close-btn"
		>
			<CloseButtonIcon />
		</button>
	);
};

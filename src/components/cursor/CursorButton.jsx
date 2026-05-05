import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useSoundStore } from "../../stores/useSoundStore";

export function CursorButton({
	children,
	onClick,
	specialSound = false,
	...props
}) {
	const setIsHovering = useCursorStore((state) => state.setIsHovering);
	const playSuccess = useSoundStore((state) => state.playSuccess);

	// Unmount
	useEffect(() => {
		return () => {
			setIsHovering(false);
		};
	}, [setIsHovering]);

	const handlePointerDown = (e) => {
		e.stopPropagation();
		// Si c'est un bouton important, on joue le son magique
		if (specialSound) {
			playSuccess();
		}

		if (props.onPointerDown) props.onPointerDown(e);
	};

	return (
		<button
			{...props}
			onPointerEnter={() => setIsHovering(true)}
			onPointerLeave={() => setIsHovering(false)}
			onPointerDown={handlePointerDown}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

import { useExperienceStore } from "../../stores/useExperienceStore";
import { CursorButton } from "../cursor/CursorButton";

export function EndScreen() {
	const setMenu = useExperienceStore((state) => state.setMenu);

	const handleClick = () => {
		setMenu();
	};

	return (
		<div className="end__screen">
			<span className="utils__screenInfo">END SCREEN</span>
			<CursorButton onClick={handleClick}>RETOUR AU MENU</CursorButton>
		</div>
	);
}

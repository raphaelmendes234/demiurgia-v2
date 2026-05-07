import { useExperienceStore } from "../../stores/useExperienceStore";
import { MainButtonComponent } from "../ui/MainButtonComponent";

export function EndScreen() {
	const setMenu = useExperienceStore((state) => state.setMenu);

	const handleClick = () => {
		setMenu();
	};

	return (
		<div className="end__screen">
			<span className="utils__screenInfo">END SCREEN</span>
			<MainButtonComponent onClick={handleClick}>
				RETOUR AU MENU
			</MainButtonComponent>
		</div>
	);
}

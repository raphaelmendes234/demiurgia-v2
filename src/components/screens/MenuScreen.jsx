import { useEffect } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useExperienceStore } from "../../stores/useExperienceStore";
import { useSoundStore } from "../../stores/useSoundStore";
import { MainButtonComponent } from "../ui/MainButtonComponent";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";

export function MenuScreen() {
	const setContext = useExperienceStore((state) => state.setContext);
	const startAmbience = useSoundStore((state) => state.startAmbience);
	const playSound = useSoundStore((state) => state.playSound);

	const handleStart = () => {
		setContext();
	};

	return (
		<div className="menu__screen">
			<div className="menuScreen_button">
				<MainButtonComponent
					onClick={handleStart}
					onPointerDown={() => playSound("magic")}
				>
					COMMENCER
				</MainButtonComponent>
			</div>
			<span className="utils__screenInfo">MENU SCREEN</span>
		</div>
	);
}

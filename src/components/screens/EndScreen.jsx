import { useEffect, useState } from "react";
import { useExperienceStore, PHASES } from "../../stores/useExperienceStore";
import { CursorButton } from "../cursor/CursorButton";
import { FrameMask } from "../canvas/FrameMask";
import { Canvas } from "@react-three/fiber";

export function EndScreen() {
	const phase = useExperienceStore((state) => state.phase);
	const setMenu = useExperienceStore((state) => state.setMenu);

	const [isBlack, setIsBlack] = useState(false);
	const [showCredits, setShowCredits] = useState(false);

	useEffect(() => {
		if (phase === PHASES.END) {
			// 1. Déclenchement de la séquence de fin
			const blackTimer = setTimeout(() => setIsBlack(true), 2500);
			const creditsTimer = setTimeout(() => setShowCredits(true), 6500);

			return () => {
				clearTimeout(blackTimer);
				clearTimeout(creditsTimer);
			};
		} else {
			// 2. Si on quitte la phase END, on reset les états.
			// Le fondu sortant sera géré par la transition CSS sur 'isBlack'[cite: 6].
			setIsBlack(false);
			setShowCredits(false);
		}
	}, [phase]);

	return (
		<div className={`end__screen ${isBlack ? "end__screen--black" : ""}`}>
			{showCredits && (
				<div className="end__credits">
					<h1>FIN</h1>
					<p>Merci d'avoir joué</p>
					<div style={{ marginTop: "40px" }}>
						<CursorButton onClick={setMenu}>RETOUR AU MENU</CursorButton>
					</div>
				</div>
			)}
		</div>
	);
}

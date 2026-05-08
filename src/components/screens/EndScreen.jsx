import { useEffect, useRef, useState } from "react";
import { useExperienceStore, PHASES } from "../../stores/useExperienceStore";
import { MainButtonComponent } from "../ui/MainButtonComponent";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { useSoundStore } from "../../stores/useSoundStore";

export function EndScreen() {
	const phase = useExperienceStore((state) => state.phase);
	const setMenu = useExperienceStore((state) => state.setMenu);
	const stopAmbianceEnd = useSoundStore((state) => state.stopAmbianceEnd);

	const overlayRef = useRef(null);
		stopAmbianceEnd();
	const titleRef = useRef(null);
	const creditsRef = useRef(null);

	useEffect(() => {
		if (phase === PHASES.END) {
			const tl = gsap.timeline({
				delay: 3,
				onComplete: () => {
					setTimeout(() => setMenu(), 1000);
				},
			});

			// Config initiale au moment du déclenchement
			gsap.set([titleRef.current, creditsRef.current], { opacity: 0, y: 20 });

			// Apparition de l'overlay (autoAlpha passe visibility à visible)
			tl.to(overlayRef.current, {
				autoAlpha: 1, // Gère opacity: 1 ET visibility: visible
				backgroundColor: "rgba(0, 0, 0, 1)",
				duration: 4,
				ease: "power2.inOut",
				pointerEvents: "all", // Permet de cliquer si tu ajoutes des boutons
			});

			// Animation Titre
			tl.to(titleRef.current, {
				opacity: 1,
				y: 0,
				duration: 1.5,
				ease: "power2.out",
			});
			tl.to(titleRef.current, {
				opacity: 0,
				y: -20,
				duration: 1.5,
				ease: "power2.in",
				delay: 2,
			});

			// Animation Crédits
			tl.to(creditsRef.current, {
				opacity: 1,
				y: 0,
				duration: 1.5,
				ease: "power2.out",
			});
			tl.to(creditsRef.current, {
				opacity: 0,
				duration: 1.5,
				ease: "power2.in",
				delay: 2,
			});

			return () => tl.kill();
		} else {
			// SI ON N'EST PAS EN PHASE END : On cache tout immédiatement ou via une transition
			gsap.to(overlayRef.current, {
				autoAlpha: 0, // Repasse en visibility: hidden
				backgroundColor: "rgba(0, 0, 0, 0)",
				delay: 1,
				duration: 4,
				pointerEvents: "none", // Désactive les clics
			});
		}
	}, [phase]);

	return (
		<div className="end__screen" ref={overlayRef}>
			{/* Section Titre*/}
			<div className="end__content" ref={titleRef} style={{ opacity: 0 }}>
				<h1>Chapitre I — Le campement</h1>
				<p className="suspense">
					<i>
						Nanouk s’est aventuré dans la forêt à la recherche d’une offrande.
					</i>
				</p>
				<p className="suspense">
					<i>Mais Démiurgia peut surgir à tout moment...</i>
				</p>
			</div>

			{/* Section Crédits */}
			<div className="end__credits" ref={creditsRef} style={{ opacity: 0 }}>
				<h4>Réalisé par :</h4>
				<ul>
					<li>Eva Bougnon</li>
					<li>Joome Lee</li>
					<li>Alan King</li>
					<li>Raphaël Mendes</li>
				</ul>
			</div>
		</div>
	);
}

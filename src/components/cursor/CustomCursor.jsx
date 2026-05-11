import React, { useEffect, useRef } from "react";
import { useCursorStore } from "../../stores/useCursorStore";
import { useSoundStore } from "../../stores/useSoundStore";
import { gsap } from "gsap";

export const CustomCursor = () => {
	const cursorRef = useRef(null);
	const setCursorType = useCursorStore((state) => state.setCursorType);
	const playClick = useSoundStore((state) => state.playClick);

	const mousePos = useRef({ x: 0, y: 0 });
	const lastMousePos = useRef({ x: 0, y: 0 });
	const currentSize = useRef(75);
	const velocity = useRef(0);

	const hasMoved = useRef(false);
	const cursorStateRef = useRef("default");

	useEffect(() => {
		if (cursorRef.current) {
			gsap.set(cursorRef.current, { opacity: 0, scale: 0 });
		}

		let rafId = null;
		const requestUpdate = () => {
			if (rafId === null) rafId = requestAnimationFrame(update);
		};

		// Souscription au store pour mettre à jour la ref sans re-render le composant
		const unsub = useCursorStore.subscribe((state) => {
			cursorStateRef.current = state.cursorType;
			requestUpdate();
		});

		const moveCursor = (e) => {
			mousePos.current = { x: e.clientX, y: e.clientY };

			if (!hasMoved.current) {
				hasMoved.current = true;
				gsap.to(cursorRef.current, {
					opacity: 1,
					scale: 1,
					duration: 0.5,
					ease: "back.out(1.7)", // Petit effet de rebond sympa
				});
			}
			requestUpdate();
		};

		const update = () => {
			// 1. Calcul de la vélocité
			const dx = mousePos.current.x - lastMousePos.current.x;
			const dy = mousePos.current.y - lastMousePos.current.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			velocity.current += (distance - velocity.current) * 0.1;

			// 2. Taille de base selon l'état actuel (90 si hover/click, sinon 75)
			const isInteractive =
				cursorStateRef.current === "hover" ||
				cursorStateRef.current === "click";
			const baseSize = isInteractive ? 90 : 75;

			// 3. Calcul de la réduction (vitesse)
			let targetSize = baseSize - velocity.current * 1.5;
			if (targetSize < 50) targetSize = 50;

			// 4. Lissage (Lerp) - C'est ici que le retour à 75px se fait en douceur
			currentSize.current += (targetSize - currentSize.current) * 0.15;

			// 5. Application des styles
			if (cursorRef.current) {
				cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
				cursorRef.current.style.width = `${currentSize.current}px`;
				cursorRef.current.style.height = `${currentSize.current}px`;
			}

			lastMousePos.current = { ...mousePos.current };

			// Stop quand tout est stabilisé pour libérer le CPU à l'idle
			if (
				velocity.current < 0.01 &&
				Math.abs(currentSize.current - baseSize) < 0.1
			) {
				rafId = null;
				return;
			}
			rafId = requestAnimationFrame(update);
		};

		rafId = requestAnimationFrame(update);

		const handleGlobalDown = () => {
			setCursorType("click");
			playClick(true);
		};

		const handleGlobalUp = () => {
			// On vérifie l'état isHovering du store pour savoir où revenir
			const isHovering = useCursorStore.getState().isHovering;
			setCursorType(isHovering ? "hover" : "default");
		};

		window.addEventListener("mousemove", moveCursor);
		window.addEventListener("pointerdown", handleGlobalDown);
		window.addEventListener("pointerup", handleGlobalUp);

		return () => {
			unsub(); // On coupe la souscription
			if (rafId !== null) cancelAnimationFrame(rafId);
			window.removeEventListener("mousemove", moveCursor);
			window.removeEventListener("pointerdown", handleGlobalDown);
			window.removeEventListener("pointerup", handleGlobalUp);
		};
	}, [setCursorType, playClick]); // Le useEffect ne redémarre plus si cursorType change

	// On ne passe plus cursorType ici pour éviter les re-renders inutiles
	// On récupère le type actuel pour l'image via le store (réactif)
	const cursorType = useCursorStore((state) => state.cursorType);

	return (
		<div ref={cursorRef} className="cursor">
			<img src={`/assets/images/cursor/${cursorType}.png`} alt="" />
		</div>
	);
};

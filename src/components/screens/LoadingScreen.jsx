import { useProgress } from "@react-three/drei";
import { useState } from "react";
import { MainButtonComponent } from "../ui/MainButtonComponent";

export function LoadingScreen() {
    const { progress, active } = useProgress();
    const [isHidden, setIsHidden] = useState(false);
    const [hasStarted, setHasStarted] = useState(false); // Nouvel état pour le clic

    const isLoaded = !active && progress === 100;

    if (isHidden) return null;

    const handleStart = () => {
        setHasStarted(true);
    };

    return (
        <div
            className={`loading__screen ${hasStarted ? "finished" : ""}`}
            onTransitionEnd={() => {
                if (hasStarted) {
                    setIsHidden(true);
                }
            }}
        >
            <div className="loading__container">
                {isLoaded ? (
                    <MainButtonComponent 
                        onClick={handleStart}
                    >
                        ENTRER DANS L'EXPÉRIENCE
                    </MainButtonComponent>
                ) : (
                    <>
                        <img 
                            src="/assets/images/loading/Loading.png" 
                            alt="Loading..." 
                            className="loading__spinner" 
                        />
                        <div className="loading__percentage">
                            {Math.round(progress)}%
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
import { useProgress } from "@react-three/drei";
import { useState } from "react";

export function LoadingScreen() {
    const { progress, active } = useProgress();
    const [isHidden, setIsHidden] = useState(false);

    const isLoaded = !active && progress === 100;

    if (isHidden) return null;

    return (
        <div
            className={`loading__screen ${isLoaded ? "finished" : ""}`}
            onTransitionEnd={() => {
                if (isLoaded) {
                    setIsHidden(true);
                }
            }}
        >
            <div className="loading__container">
                <img 
                    src="/assets/images/loading/Loading.png" 
                    alt="Loading..." 
                    className="loading__spinner" 
                />
                <div className="loading__percentage">
                    {Math.round(progress)}%
                </div>
            </div>
        </div>
    );
}
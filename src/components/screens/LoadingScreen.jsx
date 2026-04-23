import { useProgress } from "@react-three/drei";

export function LoadingScreen() {
    const { progress, active } = useProgress();

    const isLoaded = !active && progress === 100;

    return (
        <div className={`loading__screen ${isLoaded ? "finished" : ""}`}>
            <strong>LOADING</strong>
        </div>
    );
}
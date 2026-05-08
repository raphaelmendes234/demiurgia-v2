import {
  useExperienceStore,
  GAME_SCENES,
} from "../../stores/useExperienceStore";
import { useSoundStore } from "../../stores/useSoundStore";
import { MainButtonComponent } from "../ui/MainButtonComponent";

export function GameScreen() {
  const nextScene = useExperienceStore((state) => state.nextScene);
  const prevScene = useExperienceStore((state) => state.prevScene);
  const gameIndex = useExperienceStore((state) => state.gameIndex);
  const isTransitioning = useExperienceStore((state) => state.isTransitioning);
  const { playSound, stopAmbience } = useSoundStore();

  const totalScenes = GAME_SCENES.length;
  const isLastScene = gameIndex === totalScenes - 1;

  const handleNextClick = () => {
    nextScene();
    playSound("swoosh");
    if (isLastScene) {
      stopAmbience();
      playSound("ambiantEnd");
    }
  };

  const handlePrevClick = () => {
    prevScene();
    playSound("swoosh");
  };

  const handlePointerOver = (e) => {
    playSound("hover");
  };

  return (
    <div className="game__screen">
      <span className="utils__screenInfo">
        GAME SCREEN | Scene {gameIndex + 1} / {totalScenes}
      </span>

      <div className="game__nav">
        {gameIndex !== 0 && (
          <MainButtonComponent
            onClick={handlePrevClick}
            onPointerEnter={handlePointerOver}
            disabled={isTransitioning}
            style={{ opacity: isTransitioning ? 0.5 : 1 }}
          >
            Précédent
          </MainButtonComponent>
        )}

        <MainButtonComponent
          onClick={handleNextClick}
          onPointerEnter={handlePointerOver}
          disabled={isTransitioning}
          style={{ opacity: isTransitioning ? 0.5 : 1 }}
        >
          {isLastScene ? "Terminer l'aventure" : "Suivant"}
        </MainButtonComponent>
      </div>
    </div>
  );
}

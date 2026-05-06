import {
  useExperienceStore,
  GAME_SCENES,
} from "../../stores/useExperienceStore";
import { useSoundStore } from "../../stores/useSoundStore";
import { CursorButton } from "../cursor/CursorButton";

export function GameScreen() {
  const nextScene = useExperienceStore((state) => state.nextScene);
  const prevScene = useExperienceStore((state) => state.prevScene);
  const gameIndex = useExperienceStore((state) => state.gameIndex);
  const isTransitioning = useExperienceStore((state) => state.isTransitioning);
  const { playSound } = useSoundStore();

  const totalScenes = GAME_SCENES.length;

  const handleNextClick = () => {
    nextScene();
    playSound("swoosh");
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
          <CursorButton
            onClick={handlePrevClick}
            onPointerEnter2={handlePointerOver}
            disabled={isTransitioning}
            style={{ opacity: isTransitioning ? 0.5 : 1 }}
          >
            Précédent
          </CursorButton>
        )}

        <CursorButton
          onClick={handleNextClick}
          onPointerEnter2={handlePointerOver}
          disabled={isTransitioning}
          style={{ opacity: isTransitioning ? 0.5 : 1 }}
        >
          {gameIndex === totalScenes - 1 ? "Terminer l'aventure" : "Suivant"}
        </CursorButton>
      </div>
    </div>
  );
}

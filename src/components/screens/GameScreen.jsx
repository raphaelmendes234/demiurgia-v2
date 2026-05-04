import { useExperienceStore, GAME_SCENES } from "../../stores/useExperienceStore"

export function GameScreen() {
    const nextScene = useExperienceStore((state) => state.nextScene)
    const prevScene = useExperienceStore((state) => state.prevScene)
    const gameIndex = useExperienceStore((state) => state.gameIndex)
    const isTransitioning = useExperienceStore((state) => state.isTransitioning)
    
    const totalScenes = GAME_SCENES.length

    const handleNextClick = () => {
        nextScene()
    }

    const handlePrevClick = () => {
        prevScene()
    }

    return (
        <div className="game__screen">
            <span className="utils__screenInfo">GAME SCREEN | Scene {gameIndex + 1} / {totalScenes}</span>

            <div className="game__nav">
                {gameIndex !== 0 && (
                    <button 
                        onClick={handlePrevClick}
                        disabled={isTransitioning}
                        style={{ opacity: isTransitioning ? 0.5 : 1 }}
                    >
                        Précédent
                    </button>
                )}

                <button 
                    onClick={handleNextClick}
                    disabled={isTransitioning}
                    style={{ opacity: isTransitioning ? 0.5 : 1 }}
                >
                    {gameIndex === totalScenes - 1 ? "Terminer l'aventure" : "Suivant"}
                </button>
            </div>
        </div>
    )
}
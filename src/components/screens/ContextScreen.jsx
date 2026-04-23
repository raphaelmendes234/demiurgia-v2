import { useState } from "react"
import { useExperienceStore } from "../../stores/useExperienceStore"
import { CONTEXT_STEPS } from "../../data/contextData"

export function ContextScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const setGame = useExperienceStore((state) => state.setGame)
    const currentStep = CONTEXT_STEPS[currentIndex]

    const handleNextClick = () => {
        if (currentIndex < CONTEXT_STEPS.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setGame()
        }
    }

    const handlePrevClick = () => {
        setCurrentIndex(currentIndex - 1)
    }

    return (
        <div className="context__screen">
            <div className="utils__screenInfo">CONTEXT SCREEN</div>

            <div key={currentIndex} className="context__content">
                <img src={currentStep.image}/>
                <p>{currentStep.text}</p>
            </div>
            
            <div className="context__nav">
                {currentIndex !== 0 && (
                    <button onClick={handlePrevClick}>
                        Précédent
                    </button>
                )}
                
                <button onClick={handleNextClick}>
                    {currentIndex === CONTEXT_STEPS.length - 1 ? "Lancer" : "Suivant"}
                </button>
            </div>
        </div>
    )
}
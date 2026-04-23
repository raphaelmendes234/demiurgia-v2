import { useExperienceStore } from "../../stores/useExperienceStore"

export function EndScreen() {

    const setMenu = useExperienceStore((state) => state.setMenu)
    
    const handleClick = () => { 
        setMenu()
    }

    return (
        <div className="end__screen">
            <span className="utils__screenInfo">END SCREEN</span>
            <button onClick={handleClick}>RETOUR AU MENU</button>
        </div>
    )
}
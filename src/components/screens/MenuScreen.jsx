import { useExperienceStore } from "../../stores/useExperienceStore"

export function MenuScreen() {
    const setContext = useExperienceStore((state) => state.setContext)

    const handleClick = () => { 
        setContext()
    }

    return (
        <div className="menu__screen">
            <span className="utils__screenInfo">MENU SCREEN</span>
            <button onClick={handleClick}>COMMENCER</button>
        </div>
    )
}
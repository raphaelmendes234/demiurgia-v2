import { useExperienceStore } from "../../stores/useExperienceStore";
import { useSoundStore } from "../../stores/useSoundStore";

export function MenuScreen() {
  const setContext = useExperienceStore((state) => state.setContext);
    const startAmbience = useSoundStore((state) => state.startAmbience)
  

  const handleClick = () => {
    setContext();
  };

  return (
    <div className="menu__screen">
      <span className="utils__screenInfo">MENU SCREEN</span>
      <button
        onClick={handleClick}
        onPointerDown={(e) => {
          e.stopPropagation();
          startAmbience();
        }}
      >
        COMMENCER
      </button>
    </div>
  );
}

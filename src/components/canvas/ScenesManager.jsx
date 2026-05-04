import { useExperienceStore } from "../../stores/useExperienceStore"
import { Scene } from "./Scene"

export function ScenesManager() {

    const currentScene = useExperienceStore((state) => state.currentScene)

    return (
        <>
            {/* Menu */}
            <Scene 
                name="sceneMenu" 
                glb="/models/sceneMenu.glb" 
                active={ currentScene === "sceneMenu" }
                before={"bottom"}
                after={"top"}
            />
            {/* Game */}
            <Scene 
                name="scene1" 
            glb="/models/scene1.glb" 
                active={ currentScene === "scene1" }
                before={"bottom"}
                after={"left"}
            />
            <Scene 
                name="scene2" 
                glb="/models/scene2.glb" 
                active={ currentScene === "scene2" }
                before={"right"}
                after={"left"}
            />
            <Scene 
                name="scene3" 
                glb="/models/scene3.glb" 
                active={ currentScene === "scene3" }
                before={"right"}
                after={"left"}
            />
            <Scene 
                name="scene4" 
                glb="/models/scene4.glb" 
                active={ currentScene === "scene4" }
                before={"right"}
                after={"left"}
            />
            <Scene 
                name="scene5" 
                glb="/models/scene5.glb" 
                active={ currentScene === "scene5" }
                before={"right"}
                after={"left"}
            />

            {/* End */}
            <Scene 
                name="sceneEnd" 
                glb="/models/sceneEnd.glb" 
                active={ currentScene === "sceneEnd" }
                before={"right"}
                after={"left"}
            />
        </>
    )
}